/* MOBI parser - handles PalmDOC-compressed MOBI/AZW
 *
 * Format reference: https://wiki.mobileread.com/wiki/MOBI
 *                   https://wiki.mobileread.com/wiki/PDB
 */

function readU16(view, off) { return view.getUint16(off); }
function readU32(view, off) { return view.getUint32(off); }
function readStr(bytes, off, len) {
  let s = '';
  for (let i = 0; i < len; i++) {
    const b = bytes[off + i];
    if (b === 0) break;
    s += String.fromCharCode(b);
  }
  return s;
}

function palmdocDecompress(input) {
  const out = [];
  let i = 0;
  while (i < input.length) {
    const b = input[i++];
    if (b === 0) {
      out.push(0);
    } else if (b >= 1 && b <= 8) {
      for (let j = 0; j < b && i < input.length; j++) out.push(input[i++]);
    } else if (b <= 0x7f) {
      out.push(b);
    } else if (b >= 0x80 && b <= 0xbf) {
      if (i >= input.length) break;
      const b2 = input[i++];
      const word = (b << 8) | b2;
      const distance = (word >> 3) & 0x07ff;
      const length = (word & 0x0007) + 3;
      const start = out.length - distance;
      if (start < 0) break;
      for (let j = 0; j < length; j++) out.push(out[start + j]);
    } else {
      out.push(0x20);
      out.push(b ^ 0x80);
    }
  }
  return new Uint8Array(out);
}

async function parseMobi(file) {
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  const view = new DataView(buf);

  if (bytes.length < 78) throw new Error('File too small to be a MOBI');

  const pdbType = readStr(bytes, 60, 4);
  const pdbCreator = readStr(bytes, 64, 4);
  if (pdbType !== 'BOOK' || pdbCreator !== 'MOBI') {
    throw new Error('Not a MOBI file (type=' + pdbType + ' creator=' + pdbCreator + ')');
  }
  const numRecords = readU16(view, 76);
  if (numRecords < 1) throw new Error('No records in PDB');

  const recordOffsets = [];
  for (let i = 0; i < numRecords; i++) {
    recordOffsets.push(readU32(view, 78 + i * 8));
  }
  recordOffsets.push(bytes.length);

  const r0Start = recordOffsets[0];
  const compression = readU16(view, r0Start + 0);
  const recordCount = readU16(view, r0Start + 8);
  const encryption = readU16(view, r0Start + 12);

  if (encryption !== 0) throw new Error('MOBI is DRM-protected (encryption=' + encryption + ')');
  if (compression !== 1 && compression !== 2) {
    throw new Error(compression === 17480
      ? 'MOBI uses HUFF/CDIC compression (not yet supported). Convert with Calibre.'
      : 'Unknown MOBI compression: ' + compression);
  }

  const mh = r0Start + 16;
  const mobiMagic = readStr(bytes, mh + 0, 4);
  if (mobiMagic !== 'MOBI') throw new Error('Missing MOBI header');
  const mobiHeaderLen = readU32(view, mh + 4);
  const textEncoding = readU32(view, mh + 28);
  const firstNonBookIndex = readU32(view, mh + 80);
  const fullNameOffset = readU32(view, mh + 84);
  const fullNameLength = readU32(view, mh + 88);
  const exthFlags = readU32(view, mh + 128);

  const title = readStr(bytes, r0Start + fullNameOffset, fullNameLength) || file.name.replace(/\.(mobi|azw3?)$/i, '');

  let author = 'Unknown';
  if (exthFlags & 0x40) {
    const exthStart = mh + mobiHeaderLen;
    const exthMagic = readStr(bytes, exthStart, 4);
    if (exthMagic === 'EXTH') {
      const recCount = readU32(view, exthStart + 8);
      let p = exthStart + 12;
      for (let i = 0; i < recCount; i++) {
        const type = readU32(view, p);
        const len = readU32(view, p + 4);
        if (type === 100 && len > 8) {
          author = new TextDecoder(textEncoding === 65001 ? 'utf-8' : 'windows-1252').decode(bytes.subarray(p + 8, p + 8 + len - 8));
        }
        p += len;
      }
    }
  }

  const decoder = textEncoding === 65001 ? new TextDecoder('utf-8') : new TextDecoder('windows-1252');
  let html = '';
  for (let i = 1; i <= recordCount && i < recordOffsets.length - 1; i++) {
    const start = recordOffsets[i];
    const end = recordOffsets[i + 1];
    let recBytes = bytes.subarray(start, end);
    if (mobiHeaderLen >= 244) {
      const extraFlags = readU16(view, mh + 242);
      recBytes = stripTrailingEntries(recBytes, extraFlags);
    }
    const decompressed = compression === 2 ? palmdocDecompress(recBytes) : recBytes;
    html += decoder.decode(decompressed);
  }

  const fullText = mobiHtmlToText(html);
  if (!fullText || fullText.length < 50) {
    throw new Error('Decompressed but no readable text extracted.');
  }

  const chapters = splitMobiIntoChapters(html, fullText);

  let cover = null;
  try {
    cover = extractMobiCover(bytes, view, mh, mobiHeaderLen, recordOffsets, firstNonBookIndex);
  } catch (e) { /* best-effort */ }

  if (cover) cover = await window.FRStore.resizeCover(cover);

  const totalWords = chapters.reduce((s, c) => s + c.wordCount, 0);

  return {
    id: 'b_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    format: 'MOBI',
    title, author, chapters, totalWords, cover,
    addedAt: Date.now(),
    progress: { wordIndex: 0 },
  };
}

function stripTrailingEntries(rec, extraFlags) {
  let bytes = rec;
  for (let bit = 15; bit > 0; bit--) {
    if (extraFlags & (1 << bit)) {
      const size = readVwi(bytes);
      if (size > 0 && size <= bytes.length) bytes = bytes.subarray(0, bytes.length - size);
    }
  }
  if (extraFlags & 1) {
    if (bytes.length > 0) {
      const n = (bytes[bytes.length - 1] & 0x3) + 1;
      bytes = bytes.subarray(0, bytes.length - n);
    }
  }
  return bytes;
}

function readVwi(bytes) {
  let val = 0, size = 0;
  for (let i = bytes.length - 1; i >= 0; i--) {
    const b = bytes[i];
    val = (val << 7) | (b & 0x7f);
    size++;
    if (b & 0x80) break;
    if (size > 4) break;
  }
  return val;
}

function mobiHtmlToText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script, style, head').forEach(n => n.remove());
  doc.querySelectorAll('p, div, br, h1, h2, h3, h4, h5, h6, li, blockquote').forEach(n => {
    n.appendChild(doc.createTextNode('\n\n'));
  });
  let text = doc.body?.textContent || '';
  text = text.replace(/[ \t]+/g, ' ').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

function splitMobiIntoChapters(html, fullText) {
  const pageBreakSplit = html.split(/<mbp:pagebreak\s*\/?>/i);
  if (pageBreakSplit.length > 3) {
    const chapters = [];
    pageBreakSplit.forEach((chunk, i) => {
      const text = mobiHtmlToText(chunk);
      const wc = text.split(/\s+/).filter(Boolean).length;
      if (wc < 30) return;
      const m = chunk.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i);
      const title = m ? mobiHtmlToText(m[1]).slice(0, 80) : ('Chapter ' + (chapters.length + 1));
      chapters.push({ id: 'ch' + i, title, text, wordCount: wc });
    });
    if (chapters.length >= 2) return chapters;
  }
  return [{
    id: 'ch0', title: 'Full Text', text: fullText,
    wordCount: fullText.split(/\s+/).filter(Boolean).length,
  }];
}

function extractMobiCover(bytes, view, mh, mobiHeaderLen, recordOffsets, firstNonBookIndex) {
  const exthStart = mh + mobiHeaderLen;
  if (readStr(bytes, exthStart, 4) !== 'EXTH') return null;
  const recCount = readU32(view, exthStart + 8);
  let p = exthStart + 12;
  let coverImageIdx = -1;
  for (let i = 0; i < recCount; i++) {
    const type = readU32(view, p);
    const len = readU32(view, p + 4);
    if (type === 201 && len === 12) coverImageIdx = readU32(view, p + 8);
    p += len;
  }
  if (coverImageIdx < 0) return null;
  const recordIdx = firstNonBookIndex + coverImageIdx;
  if (recordIdx >= recordOffsets.length - 1) return null;
  const start = recordOffsets[recordIdx];
  const end = recordOffsets[recordIdx + 1];
  const imgBytes = bytes.subarray(start, end);
  let type = 'image/jpeg';
  if (imgBytes[0] === 0x89 && imgBytes[1] === 0x50) type = 'image/png';
  else if (imgBytes[0] === 0x47 && imgBytes[1] === 0x49) type = 'image/gif';
  return new Blob([imgBytes], { type });
}

window.parseMobi = parseMobi;
