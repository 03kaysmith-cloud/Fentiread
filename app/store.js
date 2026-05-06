/* global JSZip */
// FentiRead data layer: IndexedDB, EPUB parsing, folder ingestion, cover resizing

// -- IndexedDB --
const DB_NAME = 'fentiread-v1';
const DB_VERSION = 3;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('books')) {
        const s = db.createObjectStore('books', { keyPath: 'id' });
        s.createIndex('addedAt', 'addedAt');
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('pasteSessions')) {
        const ps = db.createObjectStore('pasteSessions', { keyPath: 'id' });
        ps.createIndex('updatedAt', 'updatedAt');
      }
      if (!db.objectStoreNames.contains('pastes')) {
        const p = db.createObjectStore('pastes', { keyPath: 'id' });
        p.createIndex('sessionId', 'sessionId');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbAll(store) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbGet(store, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbPut(store, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).put(value);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbDelete(store, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// -- Cover thumbnail resizer --
async function resizeCover(blob, maxWidth = 400) {
  if (!blob) return null;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob((b) => {
        URL.revokeObjectURL(img.src);
        resolve(b || blob);
      }, 'image/jpeg', 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(img.src); resolve(blob); };
    img.src = URL.createObjectURL(blob);
  });
}

// -- EPUB Parsing --

function parseXml(text) {
  return new DOMParser().parseFromString(text, 'application/xml');
}

function htmlToText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script, style').forEach(n => n.remove());
  doc.querySelectorAll('p, div, br, h1, h2, h3, h4, h5, h6, li, blockquote').forEach(n => {
    n.appendChild(doc.createTextNode('\n\n'));
  });
  let text = doc.body?.textContent || doc.documentElement?.textContent || '';
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n[ \t]+/g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = normalizeSpacedApostropheContinuations(text);
  return text.trim();
}

const FR_STORE_NUMBER_WORDS = new Set([
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
  'twenty', 'thirty', 'forty', 'fifty',
]);

function normalizeStoreSplitNumberLines(text) {
  return (text || '').replace(/(^|\n)([A-Z])\s+([a-z][A-Za-z-]*)(?=\n|$)/g, (match, prefix, first, rest) => {
    const joined = first + rest;
    return FR_STORE_NUMBER_WORDS.has(joined.toLowerCase()) ? prefix + joined : match;
  });
}

function normalizeSpacedApostropheContinuations(text) {
  return (text || '').replace(/\b([\p{L}\p{N}]+)\s+(['\u2019])\s*(s|t|m|d|ll|re|ve|em|cause)\b/giu, '$1$2$3');
}

// Extract text AND image positions from HTML
// Returns { text, images: [{afterParagraph, src}] }
function htmlToContent(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script, style').forEach(n => n.remove());

  // Walk the DOM to track paragraph index and find images
  const images = [];
  let paragraphIdx = -1;

  // Mark all block-level elements to count paragraphs
  const blocks = doc.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, li, blockquote');
  blocks.forEach(n => {
    n.appendChild(doc.createTextNode('\n\n'));
  });

  // Find images and figure out which paragraph they follow
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (!src) return;
    // Count preceding block elements to determine paragraph position
    let pIdx = 0;
    let node = img;
    while (node) {
      // Walk backwards through previous siblings and parents
      let prev = node.previousElementSibling;
      while (prev) {
        const tag = prev.tagName?.toLowerCase();
        if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'].includes(tag)) {
          const txt = prev.textContent.trim();
          if (txt) pIdx++;
        }
        prev = prev.previousElementSibling;
      }
      node = node.parentElement;
    }
    images.push({ afterParagraph: Math.max(0, pIdx - 1), src });
  });

  let text = doc.body?.textContent || doc.documentElement?.textContent || '';
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n[ \t]+/g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = normalizeStoreSplitNumberLines(text);
  text = normalizeSpacedApostropheContinuations(text);
  return { text: text.trim(), images };
}

async function parseEpub(file) {
  const zip = await JSZip.loadAsync(file);

  const containerFile = zip.file('META-INF/container.xml');
  if (!containerFile) throw new Error('Not a valid EPUB (no container.xml)');
  const containerXml = await containerFile.async('text');
  const opfPath = parseXml(containerXml).querySelector('rootfile').getAttribute('full-path');

  const opfFile = zip.file(opfPath);
  if (!opfFile) throw new Error('OPF file missing');
  const opfXml = await opfFile.async('text');
  const opf = parseXml(opfXml);
  const opfDir = opfPath.includes('/') ? opfPath.replace(/\/[^\/]+$/, '/') : '';

  const md = opf.querySelector('metadata');
  const titleEl = md && md.getElementsByTagNameNS('*', 'title')[0];
  const authorEl = md && md.getElementsByTagNameNS('*', 'creator')[0];
  const title = (titleEl && titleEl.textContent.trim()) || file.name.replace(/\.epub$/i, '');
  const author = (authorEl && authorEl.textContent.trim()) || 'Unknown';

  const manifest = {};
  opf.querySelectorAll('manifest > item').forEach(item => {
    manifest[item.getAttribute('id')] = {
      href: item.getAttribute('href'),
      mediaType: item.getAttribute('media-type'),
      properties: item.getAttribute('properties') || '',
    };
  });

  const spineIds = [];
  opf.querySelectorAll('spine > itemref').forEach(ref => {
    spineIds.push(ref.getAttribute('idref'));
  });

  // -- TOC parsing (recursive, handles nested parts/chapters) --
  const navItem = Object.values(manifest).find(m => m.properties.includes('nav'));
  const ncxId = opf.querySelector('spine')?.getAttribute('toc');
  const ncxItem = ncxId ? manifest[ncxId] : null;
  let tocEntries = []; // [{label, href, depth, hasChildren}]
  try {
    if (navItem) {
      const navText = await zip.file(opfDir + navItem.href)?.async('text');
      if (navText) {
        const nav = parseXml(navText);
        const navEl = nav.querySelector('nav[*|type="toc"], nav');
        if (navEl) {
          // Walk the nested ol/li structure to get depth
          const walkNavOl = (ol, depth) => {
            if (!ol) return;
            ol.querySelectorAll(':scope > li').forEach(li => {
              const a = li.querySelector(':scope > a, :scope > span > a');
              const childOl = li.querySelector(':scope > ol');
              if (a) {
                tocEntries.push({
                  label: a.textContent.trim(),
                  href: a.getAttribute('href'),
                  depth,
                  hasChildren: !!childOl,
                });
              }
              if (childOl) walkNavOl(childOl, depth + 1);
            });
          };
          walkNavOl(navEl.querySelector('ol'), 0);
        }
      }
    } else if (ncxItem) {
      const ncxText = await zip.file(opfDir + ncxItem.href)?.async('text');
      if (ncxText) {
        const ncx = parseXml(ncxText);
        // Recursively collect ALL navPoints at every depth
        const walkNavPoint = (parent, depth) => {
          parent.querySelectorAll(':scope > navPoint').forEach(np => {
            const label = np.querySelector(':scope > navLabel > text')?.textContent.trim();
            const src = np.querySelector(':scope > content')?.getAttribute('src');
            const children = np.querySelectorAll(':scope > navPoint');
            if (label && src) {
              tocEntries.push({ label, href: src, depth, hasChildren: children.length > 0 });
            }
            if (children.length > 0) walkNavPoint(np, depth + 1);
          });
        };
        const navMap = ncx.querySelector('navMap');
        if (navMap) walkNavPoint(navMap, 0);
      }
    }
  } catch (e) { /* best-effort */ }

  // Normalize TOC hrefs for matching (strip fragment, resolve relative paths)
  const normHref = (href, base) => {
    if (!href) return '';
    const clean = href.split('#')[0];
    if (clean.startsWith('/')) return clean;
    return base + clean;
  };

  // Build a map: normalized file path -> best TOC label
  // Prefer deeper entries (actual chapters) over shallow ones (parts)
  const tocByFile = {};
  for (const entry of tocEntries) {
    const key = normHref(entry.href, opfDir);
    const existing = tocByFile[key];
    if (!existing || entry.depth > existing.depth ||
        (entry.depth === existing.depth && !entry.hasChildren && existing.hasChildren)) {
      tocByFile[key] = entry;
    }
  }

  // Extract heading from XHTML content as fallback
  function extractHeading(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    for (const tag of ['h1', 'h2', 'h3']) {
      const el = doc.querySelector(tag);
      if (el) {
        const text = el.textContent.trim();
        if (text && text.length < 120) return text;
      }
    }
    return null;
  }

  // Detect "structural" labels (parts/books/sections that just group chapters)
  function isStructuralLabel(label) {
    return /^(part|book|section|volume|division)\s+/i.test(label.trim());
  }

  // Helper: resolve image src paths to data URLs from the ZIP
  async function resolveImages(imageRefs, htmlFileDir) {
    const resolved = [];
    for (const img of imageRefs) {
      try {
        // Resolve relative path
        let imgPath = img.src;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('EPUB/')) {
          imgPath = htmlFileDir + imgPath;
        }
        const imgFile = zip.file(imgPath) || zip.file(opfDir + img.src);
        if (!imgFile) continue;
        const blob = await imgFile.async('blob');
        const dataUrl = await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(blob);
        });
        if (dataUrl) {
          resolved.push({ afterParagraph: img.afterParagraph, dataUrl });
        }
      } catch (e) { /* skip failed images */ }
    }
    return resolved;
  }

  // -- Check for FentiRead chapter map (written by fix_book.py) --
  let chapterMap = null;
  let startChapter = 0;
  try {
    const cmFile = zip.file(opfDir + 'fentiread-chapters.json');
    if (cmFile) {
      const cmJson = await cmFile.async('text');
      const parsed = JSON.parse(cmJson);
      // Support both array format and object format { chapters, startChapter }
      if (Array.isArray(parsed)) {
        chapterMap = parsed;
      } else if (parsed && Array.isArray(parsed.chapters)) {
        chapterMap = parsed.chapters;
        startChapter = parsed.startChapter || 0;
      }
    }
  } catch (e) { /* best-effort */ }

  // -- Build chapters --
  const chapters = [];

  if (chapterMap && chapterMap.length > 0) {
    // Use the chapter map to split large HTML files at charOffset boundaries
    // Filter out structural entries (PART I, notes sections, etc.)
    const filtered = chapterMap.filter(entry => {
      const t = entry.title.toUpperCase();
      if (/^PART\s+[IVXLC]+$/i.test(t)) return false;
      if (t === 'ACKNOWLEDGMENTS' || t === 'NOTES') return false;
      return true;
    });

    // Group entries by file
    const byFile = {};
    for (const entry of filtered) {
      if (!byFile[entry.file]) byFile[entry.file] = [];
      byFile[entry.file].push(entry);
    }

    // Load HTML for each file and split at charOffsets
    for (const [relFile, entries] of Object.entries(byFile)) {
      const zf = zip.file(opfDir + relFile);
      if (!zf) continue;
      const html = await zf.async('text');
      const fileDir = relFile.includes('/') ? relFile.replace(/\/[^/]+$/, '/') : '';

      entries.sort((a, b) => a.charOffset - b.charOffset);

      for (let j = 0; j < entries.length; j++) {
        const entry = entries[j];
        const startOffset = entry.charOffset;
        const endOffset = j + 1 < entries.length ? entries[j + 1].charOffset : html.length;
        const chunkHtml = html.slice(startOffset, endOffset);
        const { text, images: imageRefs } = htmlToContent(chunkHtml);
        if (!text || text.length < 20) continue;

        const chTitle = entry.number
          ? entry.number + ': ' + entry.title
          : entry.title;

        const images = imageRefs.length > 0
          ? await resolveImages(imageRefs, opfDir + fileDir)
          : [];

        chapters.push({
          id: 'ch_' + chapters.length,
          title: chTitle,
          text,
          images,
          wordCount: text.split(/\s+/).filter(Boolean).length,
        });
      }
    }
  }

  // Fallback: use spine + TOC matching (standard EPUB path)
  if (chapters.length === 0) {
    for (let i = 0; i < spineIds.length; i++) {
      const id = spineIds[i];
      const item = manifest[id];
      if (!item) continue;
      const path = opfDir + item.href;
      const zf = zip.file(path);
      if (!zf) continue;
      const html = await zf.async('text');
      const { text, images: imageRefs } = htmlToContent(html);
      if (!text || text.length < 20) continue;

      const fileDir = item.href.includes('/') ? item.href.replace(/\/[^/]+$/, '/') : '';
      const images = imageRefs.length > 0
        ? await resolveImages(imageRefs, opfDir + fileDir)
        : [];

      const tocMatch = tocByFile[path];
      const tocLabel = tocMatch?.label || null;
      const heading = extractHeading(html);

      let title;
      if (tocLabel && !isStructuralLabel(tocLabel)) {
        title = tocLabel;
      } else if (heading) {
        title = heading;
      } else if (tocLabel) {
        title = tocLabel;
      } else {
        title = 'Chapter ' + (chapters.length + 1);
      }

      chapters.push({
        id,
        title,
        text,
        images,
        wordCount: text.split(/\s+/).filter(Boolean).length,
      });
    }
  }

  // Cover
  let cover = null;
  try {
    const coverMeta = opf.querySelector('metadata meta[name="cover"]');
    let coverItem = null;
    if (coverMeta) {
      const coverId = coverMeta.getAttribute('content');
      const candidate = manifest[coverId];
      if (candidate && candidate.mediaType?.startsWith('image/')) {
        coverItem = candidate;
      }
    }
    if (!coverItem) {
      coverItem = Object.values(manifest).find(m =>
        m.properties.includes('cover-image') ||
        (m.mediaType?.startsWith('image/') && /cover/i.test(m.href))
      );
    }
    if (coverItem) {
      const blob = await zip.file(opfDir + coverItem.href)?.async('blob');
      if (blob) cover = await resizeCover(blob);
    }
  } catch (e) { /* best-effort */ }

  const totalWords = chapters.reduce((s, c) => s + c.wordCount, 0);

  return {
    id: 'b_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    format: 'EPUB',
    title, author, chapters, totalWords, cover,
    fileName: file.name,
    startChapter: startChapter || 0,
    addedAt: Date.now(),
    progress: { wordIndex: 0 },
  };
}

// -- Folder / file ingestion --

async function pickFolder(onProgress) {
  if (!window.showDirectoryPicker) throw new Error('showDirectoryPicker unavailable');
  const handle = await window.showDirectoryPicker();
  const files = [];
  await collectFromHandle(handle, '', files);
  return ingestFiles(files, onProgress);
}

async function autoScanLibrary(onProgress) {
  if (!window.electronBooks) return null;
  const epubs = window.electronBooks.listEpubs();
  if (!epubs.length) return null;
  const entries = [];
  for (const ep of epubs) {
    const buffer = window.electronBooks.readFile(ep.path);
    if (!buffer) continue;
    const file = new File([buffer], ep.name, { type: 'application/epub+zip' });
    entries.push({ name: ep.name, file });
  }
  if (!entries.length) return null;
  return ingestFiles(entries, onProgress);
}

async function collectFromHandle(dirHandle, path, files) {
  for await (const [name, h] of dirHandle.entries()) {
    if (h.kind === 'file') {
      if (/\.(epub|mobi|azw3?)$/i.test(name)) {
        const file = await h.getFile();
        files.push({ name, path: path + name, file });
      }
    } else if (h.kind === 'directory') {
      await collectFromHandle(h, path + name + '/', files);
    }
  }
}

async function ingestFiles(fileEntries, onProgress) {
  const out = { added: 0, skipped: 0, errors: [], unsupported: 0 };
  // Build set of existing books for dedup (title+author, lowercased)
  const existing = await dbAll('books');
  const seen = new Set(existing.map(b => (b.title || '').toLowerCase() + '||' + (b.author || '').toLowerCase()));
  for (let i = 0; i < fileEntries.length; i++) {
    const { name, file } = fileEntries[i];
    onProgress && onProgress({ i, total: fileEntries.length, name });
    try {
      if (/\.epub$/i.test(name)) {
        const book = await parseEpub(file);
        const key = (book.title || '').toLowerCase() + '||' + (book.author || '').toLowerCase();
        if (seen.has(key)) { out.skipped++; continue; }
        seen.add(key);
        await dbPut('books', book);
        out.added++;
      } else if (/\.(mobi|azw3?)$/i.test(name)) {
        try {
          const book = await window.parseMobi(file);
          const key = (book.title || '').toLowerCase() + '||' + (book.author || '').toLowerCase();
          if (seen.has(key)) { out.skipped++; continue; }
          seen.add(key);
          await dbPut('books', book);
          out.added++;
        } catch (mobiErr) {
          const stub = {
            id: 'b_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
            format: 'MOBI',
            title: name.replace(/\.(mobi|azw3?)$/i, ''),
            author: 'Unknown',
            chapters: [], totalWords: 0, cover: null,
            unsupported: true,
            unsupportedReason: mobiErr.message,
            addedAt: Date.now(),
            progress: { wordIndex: 0 },
          };
          await dbPut('books', stub);
          out.unsupported++;
        }
      }
    } catch (e) {
      console.warn('Failed to parse', name, e);
      out.errors.push({ name, message: e.message });
    }
  }
  return out;
}

// -- Paste Sessions & Pastes CRUD --

function generateId(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

async function createPasteSession(title) {
  const now = Date.now();
  const session = {
    id: generateId('ps'),
    title: title || 'New paste',
    createdAt: now,
    updatedAt: now,
    pasteIds: [],
  };
  await dbPut('pasteSessions', session);
  return session;
}

async function listPasteSessions() {
  const all = await dbAll('pasteSessions');
  return all.sort((a, b) => b.updatedAt - a.updatedAt);
}

async function getPasteSession(id) {
  return dbGet('pasteSessions', id);
}

async function updatePasteSession(id, updates) {
  const session = await dbGet('pasteSessions', id);
  if (!session) return null;
  Object.assign(session, updates, { updatedAt: Date.now() });
  await dbPut('pasteSessions', session);
  return session;
}

async function deletePasteSession(id) {
  const session = await dbGet('pasteSessions', id);
  if (session) {
    for (const pid of session.pasteIds) {
      await dbDelete('pastes', pid);
    }
  }
  await dbDelete('pasteSessions', id);
}

function tokenizeText(text) {
  return normalizeSpacedApostropheContinuations(text).trim().split(/\s+/).filter(Boolean);
}

function looksLikeMarkdown(text) {
  return /(^|\n)\s{0,3}#{1,6}\s+\S/.test(text)
    || /(^|\n)\s{0,3}[-*+]\s+\S/.test(text)
    || /(^|\n)\s{0,3}\d+[.)]\s+\S/.test(text)
    || /!\[[^\]]*\]\([^)]+\)/.test(text)
    || /\[[^\]]+\]\([^)]+\)/.test(text)
    || /(^|\n)\s{0,3}---+\s*(\n|$)/.test(text)
    || /[*_]{2}[^*_]+[*_]{2}/.test(text);
}

function markdownToPlainText(markdown) {
  const lines = (markdown || '').replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let inFence = false;

  for (let line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^\s*!\[[^\]]*\]\([^)]+\)\s*$/.test(line)) continue;
    if (/^\s{0,3}---+\s*$/.test(line)) {
      out.push('');
      continue;
    }

    line = line
      .replace(/^\s{0,3}#{1,6}\s+/, '')
      .replace(/^\s{0,3}[-*+]\s+/, '')
      .replace(/^\s{0,3}(\d+[.)])\s+/, '$1 ')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .trim();

    out.push(line);
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function markdownToReaderContent(markdown) {
  const lines = (markdown || '').replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  const images = [];
  let inFence = false;

  for (let line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const imageOnly = line.match(/^\s*!\[[^\]]*\]\(([^)]+)\)\s*$/);
    if (imageOnly) {
      images.push({ afterParagraph: Math.max(0, out.filter(Boolean).length - 1), dataUrl: imageOnly[1] });
      continue;
    }

    if (/^\s{0,3}---+\s*$/.test(line)) {
      out.push('');
      continue;
    }

    line = line
      .replace(/^\s{0,3}#{1,6}\s+/, '')
      .replace(/^\s{0,3}[-*+]\s+/, '* ')
      .replace(/^\s{0,3}(\d+[.)])\s+/, '$1 ')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
        images.push({ afterParagraph: Math.max(0, out.filter(Boolean).length), dataUrl: url });
        return alt || '';
      })
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .trim();

    out.push(line);
  }

  return {
    readerText: out.join('\n').replace(/\n{3,}/g, '\n\n').trim(),
    images,
  };
}

function preparePasteContent(rawText) {
  const trimmed = rawText.trim();
  const isMarkdown = looksLikeMarkdown(trimmed);
  const plainText = isMarkdown ? markdownToPlainText(trimmed) : trimmed;
  const reader = isMarkdown ? markdownToReaderContent(trimmed) : { readerText: trimmed, images: [] };
  return {
    rawText: trimmed,
    plainText: plainText || trimmed,
    readerText: reader.readerText || plainText || trimmed,
    images: reader.images || [],
    contentType: isMarkdown ? 'markdown' : 'text',
  };
}

async function addPaste(sessionId, rawText) {
  const content = preparePasteContent(rawText);
  if (!content.rawText) return null;
  const words = tokenizeText(content.readerText);
  const paste = {
    id: generateId('p'),
    sessionId,
    createdAt: Date.now(),
    words,
    rawText: content.rawText,
    plainText: content.plainText,
    readerText: content.readerText,
    images: content.images,
    contentType: content.contentType,
    source: 'paste',
    readIdx: 0,
    readAt: null,
  };
  await dbPut('pastes', paste);
  const session = await dbGet('pasteSessions', sessionId);
  if (session) {
    session.pasteIds.push(paste.id);
    session.updatedAt = Date.now();
    await dbPut('pasteSessions', session);
  }
  return paste;
}

async function getPaste(id) {
  return dbGet('pastes', id);
}

async function getPastesBySession(sessionId) {
  const session = await dbGet('pasteSessions', sessionId);
  if (!session) return [];
  const pastes = [];
  for (const pid of session.pasteIds) {
    const p = await dbGet('pastes', pid);
    if (p) pastes.push(p);
  }
  return pastes;
}

async function updatePaste(id, updates) {
  const paste = await dbGet('pastes', id);
  if (!paste) return null;
  Object.assign(paste, updates);
  await dbPut('pastes', paste);
  return paste;
}

async function deletePaste(id) {
  const paste = await dbGet('pastes', id);
  if (!paste) return;
  const session = await dbGet('pasteSessions', paste.sessionId);
  if (session) {
    session.pasteIds = session.pasteIds.filter(pid => pid !== id);
    session.updatedAt = Date.now();
    await dbPut('pasteSessions', session);
  }
  await dbDelete('pastes', id);
}

window.FRStore = {
  openDB, dbAll, dbGet, dbPut, dbDelete,
  parseEpub, pickFolder, autoScanLibrary, ingestFiles,
  resizeCover,
  // Paste CRUD
  createPasteSession, listPasteSessions, getPasteSession,
  updatePasteSession, deletePasteSession,
  addPaste, getPaste, getPastesBySession, updatePaste, deletePaste,
  tokenizeText, looksLikeMarkdown, markdownToPlainText, markdownToReaderContent, preparePasteContent,
};
