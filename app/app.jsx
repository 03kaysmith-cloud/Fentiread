/* global React, ReactDOM, FRStore */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// -- Constants --
const FONTS = [
  { id: 'serif', label: 'Serif', family: '"Source Serif 4", Georgia, serif' },
  { id: 'georgia', label: 'Georgia', family: 'Georgia, "Times New Roman", serif' },
  { id: 'sans', label: 'Sans', family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  { id: 'mono', label: 'Mono', family: '"JetBrains Mono", monospace' },
];

const DEFAULT_SETTINGS = {
  wpm: 300,
  fontSize: 110,
  bionicBold: true,
  bionicRatio: 0.4,
  focusMarks: true,
  multiWord: false,
  font: 'serif',
  commaMult: 1.5,
  fullstopMult: 2.0,
  paragraphPauseMult: 2.0,
  semicolonMult: 1.3,
  ellipsisMult: 2.5,
  longWordMs: 10,
  longWordThreshold: 9,
  statMode: 0,
};

const APP_SETTINGS_KEY = 'fentiread-app-settings-v1';

function normalizeSettings(value) {
  return { ...DEFAULT_SETTINGS, ...(value || {}) };
}

function readCachedAppSettings() {
  try {
    const raw = localStorage.getItem(APP_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function cacheAppSettings(value) {
  try {
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(value));
  } catch (_) {
    // IndexedDB remains the canonical store when localStorage is unavailable.
  }
}

// -- Theme --
function useTheme(dark) {
  return useMemo(() => dark ? {
    bg: '#0a0a0a', ink: '#fff', dim: 'rgba(255,255,255,0.55)',
    faint: 'rgba(255,255,255,0.18)', hairline: 'rgba(255,255,255,0.15)',
    rowDiv: 'rgba(255,255,255,0.08)', highlight: '#222',
    invertedBg: '#fff', invertedInk: '#000',
  } : {
    bg: '#fff', ink: '#000', dim: 'rgba(0,0,0,0.55)',
    faint: 'rgba(0,0,0,0.18)', hairline: 'rgba(0,0,0,0.12)',
    rowDiv: 'rgba(0,0,0,0.08)', highlight: '#e9e9e9',
    invertedBg: '#000', invertedInk: '#fff',
  }, [dark]);
}

function getFontFamily(fontId) {
  return (FONTS.find(f => f.id === fontId) || FONTS[0]).family;
}

// -- Bionic --
function bionicSplit(word, ratio = 0.4) {
  if (!word) return ['', ''];
  const stripped = word.replace(/[^\p{L}\p{N}']/gu, '');
  const len = stripped.length || 1;
  const n = Math.max(1, Math.min(len - 1, Math.ceil(len * ratio)));
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (/[\p{L}\p{N}']/u.test(word[i])) {
      count++;
      if (count === n) return [word.slice(0, i + 1), word.slice(i + 1)];
    }
  }
  return [word, ''];
}

function FocusWord({ word, size, color, ratio = 0.4, bionic = true, fontFamily }) {
  if (!bionic) {
    return (
      <span style={{ fontFamily, fontSize: size, lineHeight: 1, letterSpacing: -1, color, fontWeight: 400 }}>
        {word}
      </span>
    );
  }
  const [head, tail] = bionicSplit(word || '', ratio);
  return (
    <span style={{ fontFamily, fontSize: size, lineHeight: 1, letterSpacing: -1, color }}>
      <span style={{ fontWeight: 700 }}>{head}</span>
      <span style={{ fontWeight: 300 }}>{tail}</span>
    </span>
  );
}

// -- Relative time --
function relativeTime(epoch) {
  if (!epoch) return '';
  const diff = Date.now() - epoch;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return min + 'm ago';
  const hr = Math.floor(min / 60);
  if (hr < 24) return hr + 'h ago';
  const days = Math.floor(hr / 24);
  if (days < 7) return days + 'd ago';
  return new Date(epoch).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// -- Icons --
const I = {
  plus:    (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  folder:  (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  back:    (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible', display: 'block' }}><path d="M15 18l-6-6 6-6"/></svg>,
  page:    (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible', display: 'block' }}><rect x="5" y="4" width="14" height="16"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>,
  gear:    (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible', display: 'block' }}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  sun:     (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
  moon:    (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>,
  trash:   (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/></svg>,
  text:    (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>,
  image:   (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  send:    (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>,
  clipboard:(s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>,
  help:    (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  play:    (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>,
  check:   (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
};

// -- Shared components --
const Mono = ({ children, size = 10, opacity = 1, style }) => (
  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: size, letterSpacing: 1.3, textTransform: 'uppercase', opacity, ...style }}>{children}</span>
);

const Pill = ({ children, theme, style }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: 20, padding: '0 9px', borderRadius: 10,
    border: `0.75px solid ${theme.ink}`, background: theme.bg, color: theme.ink,
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 0.8, fontWeight: 500,
    ...style,
  }}>{children}</span>
);

function CoverImg({ book, theme, height }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (book.cover) {
      const u = URL.createObjectURL(book.cover);
      setUrl(u);
      return () => URL.revokeObjectURL(u);
    }
  }, [book.cover]);
  if (url) {
    return <img src={url} alt={book.title} style={{ width: '100%', aspectRatio: '2 / 3', objectFit: 'cover', display: 'block', border: `0.75px solid ${theme.ink}` }} />;
  }
  return (
    <div style={{
      width: '100%', aspectRatio: '2 / 3',
      border: `0.75px solid ${theme.ink}`, background: theme.bg,
      padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: theme.ink,
    }}>
      <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 18, lineHeight: 1.05, fontWeight: 600, textWrap: 'pretty' }}>{book.title}</div>
      <Mono size={9} opacity={0.55} style={{ marginTop: 10 }}>{book.author}</Mono>
    </div>
  );
}

function Slider({ value, min, max, step = 1, onChange, theme }) {
  const pct = (value - min) / (max - min);
  const ref = useRef(null);
  const setFromEvent = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    onChange(Math.round((min + x * (max - min)) / step) * step);
  };
  return (
    <div ref={ref}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setFromEvent(e); }}
      onPointerMove={(e) => { if (e.buttons) setFromEvent(e); }}
      style={{ position: 'relative', height: 22, cursor: 'pointer', userSelect: 'none' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: theme.ink, opacity: 0.18 }} />
      <div style={{ position: 'absolute', left: 0, top: '50%', height: 1, background: theme.ink, width: `${pct * 100}%` }} />
      <div style={{ position: 'absolute', left: `${pct * 100}%`, top: '50%', transform: 'translate(-50%, -50%)', width: 16, height: 16, borderRadius: '50%', background: theme.ink, border: `2px solid ${theme.bg}`, boxShadow: `0 0 0 1px ${theme.ink}` }} />
    </div>
  );
}

function Toggle({ on, onChange, theme }) {
  return (
    <button
      className={`fr-toggle${on ? ' on' : ''}`}
      style={{ color: theme.ink, '--fr-bg': theme.bg }}
      onClick={() => onChange(!on)}
    />
  );
}

function ToggleGroup({ options, value, onChange, theme }) {
  return (
    <div className="fr-toggle-group" style={{ color: theme.ink }}>
      {options.map(opt => (
        <button
          key={opt.value}
          className={value === opt.value ? 'active' : ''}
          style={value === opt.value ? { background: theme.ink, color: theme.bg } : {}}
          onClick={() => onChange(opt.value)}
        >{opt.label}</button>
      ))}
    </div>
  );
}

const primaryBtn = (theme) => ({
  display: 'inline-flex', alignItems: 'center',
  padding: '14px 22px', background: theme.invertedBg, color: theme.invertedInk,
  border: 'none', borderRadius: 26, cursor: 'pointer',
  fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
});
const secondaryBtn = (theme) => ({
  display: 'inline-flex', alignItems: 'center', cursor: 'pointer',
  padding: '13px 21px', background: 'transparent', color: theme.ink,
  border: `0.75px solid ${theme.ink}`, borderRadius: 26,
  fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
});
const iconBtn = (theme) => ({
  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'transparent', border: 'none', cursor: 'pointer', color: theme.ink, padding: 0,
  flexShrink: 0,
});

// -- Tokenizer --
// Converts chapter text into structured tokens for the RSVP engine.
// Token types: word, paragraph_break, chapter_heading

// Split words joined by hyphens, en-dashes, or em-dashes into separate tokens.
// Dashes stay attached to the preceding part (twenty- six- year- old, sky— a).
function splitDashes(word) {
  // Split on em-dash or en-dash, keeping the dash on the preceding part
  const emParts = word.split(/([\u2014\u2013]+)/).filter(Boolean);
  if (emParts.length > 1) {
    const result = [];
    for (let i = 0; i < emParts.length; i++) {
      if (/^[\u2014\u2013]+$/.test(emParts[i])) {
        // Attach dash to the previous part
        if (result.length > 0) result[result.length - 1] += emParts[i];
        else result.push(emParts[i]);
      } else {
        // Split this segment on hyphens too
        result.push(...splitHyphens(emParts[i]));
      }
    }
    return result.filter(Boolean);
  }
  return splitHyphens(word);
}

function splitHyphens(word) {
  // Only split if there are internal hyphens (not leading/trailing)
  if (!/.\-./.test(word)) return [word];
  const parts = word.split('-');
  const result = [];
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i]) continue;
    // Keep hyphen on all parts except the last
    result.push(i < parts.length - 1 ? parts[i] + '-' : parts[i]);
  }
  return result.length ? result : [word];
}

function classifyPunctuation(word) {
  const clean = (word || '').trim().replace(/\s*[*"'’”)\]}]+$/g, '');
  if (/\.{2,}$/.test(clean) || /\u2026$/.test(clean)) return 'ellipsis';
  if (/[.!?]$/.test(clean)) return 'fullstop';
  if (/,$/.test(clean)) return 'comma';
  if (/[;:]$/.test(clean)) return 'semicolon';
  return null;
}

const LEADING_STANDALONE_PUNCT = /^[*•‣◦▪▫·\-–—]+$/;
const CLOSING_STANDALONE_PUNCT = /^[,.;:!?*"'’”)\]}]+$/;
const OPENING_STANDALONE_PUNCT = /^[*"'‘“([{]+$/;
const ENUMERATOR_STANDALONE = /^([A-Za-z]\)|\d+[.)])$/;
const APOSTROPHE_CONTINUATION = /^['\u2019](?:s|t|m|d|ll|re|ve|em|cause)$/i;

function normalizeSpacedApostropheContinuations(text) {
  return (text || '').replace(/\b([\p{L}\p{N}]+)\s+(['\u2019])\s*(s|t|m|d|ll|re|ve|em|cause)\b/giu, '$1$2$3');
}

function normalizeReadableWord(word) {
  return (word || '')
    .replace(/\s+(['\u2019](?:s|t|m|d|ll|re|ve|em|cause)\b)/gi, '$1')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([([{‘“])\s+/g, '$1');
}

function splitReadableWords(text) {
  const raw = normalizeSpacedApostropheContinuations(text).split(/\s+/).filter(Boolean);
  const merged = [];

  for (let i = 0; i < raw.length; i++) {
    const w = raw[i];
    const prev = merged.length ? merged[merged.length - 1] : null;
    const next = raw.slice(i + 1).find(Boolean);

    if (ENUMERATOR_STANDALONE.test(w)) {
      if (next) raw[i + 1] = w + ' ' + raw[i + 1];
      continue;
    }

    if (LEADING_STANDALONE_PUNCT.test(w)) {
      if (prev && (!next || paragraphEndsSentence(prev))) {
        merged[merged.length - 1] = prev + ' ' + w;
      } else if (next) {
        raw[i + 1] = w + ' ' + raw[i + 1];
      }
      continue;
    }

    if (APOSTROPHE_CONTINUATION.test(w) && prev) {
      merged[merged.length - 1] = normalizeReadableWord(prev + ' ' + w);
      continue;
    }

    if (CLOSING_STANDALONE_PUNCT.test(w) && prev) {
      merged[merged.length - 1] = normalizeReadableWord(prev + ' ' + w);
      continue;
    }

    if (OPENING_STANDALONE_PUNCT.test(w) && next) {
      raw[i + 1] = w + ' ' + raw[i + 1];
      continue;
    }

    const parts = splitDashes(w);
    for (const part of parts) {
      if (LEADING_STANDALONE_PUNCT.test(part) || CLOSING_STANDALONE_PUNCT.test(part) || OPENING_STANDALONE_PUNCT.test(part)) {
        if (merged.length) merged[merged.length - 1] = normalizeReadableWord(merged[merged.length - 1] + ' ' + part);
      } else {
        merged.push(normalizeReadableWord(part));
      }
    }
  }

  return merged.map(normalizeReadableWord);
}

function applyInlineMarkdownWordStyles(words) {
  const styled = [];
  let strong = false;

  for (let word of words) {
    let nextStrong = strong;
    let tokenStrong = strong;
    if (/(\*\*|__)/.test(word)) {
      const markers = word.match(/(\*\*|__)/g) || [];
      if (markers.length >= 2) tokenStrong = true;
      if (markers.length % 2 === 1) nextStrong = !strong;
      word = word.replace(/(\*\*|__)/g, '');
    }
    if (word) styled.push({ text: word, strong: tokenStrong || nextStrong });
    strong = nextStrong;
  }

  return styled;
}

function isTrailingPunctuationToken(token) {
  return token?.type === 'word' && (/^[,.;:!?]+$/.test(token.text || '') || APOSTROPHE_CONTINUATION.test(token.text || ''));
}

function withAttachedTrailingPunctuation(token, nextToken) {
  if (!token || token.type !== 'word' || !isTrailingPunctuationToken(nextToken)) return token;
  return {
    ...token,
    text: normalizeReadableWord(token.text + nextToken.text),
    punctuation: classifyPunctuation(token.text + nextToken.text),
  };
}

function paragraphEndsSentence(text) {
  return /[.!?]["')\]]*$/.test((text || '').trim());
}

function paragraphStartsContinuation(text) {
  const first = ((text || '').trim().match(/[\p{L}\p{N}]/u) || [])[0];
  return !!first && first === first.toLowerCase() && first !== first.toUpperCase();
}

function normalizeImageBreaks(paragraphs, imagesByParagraph) {
  const normalized = {};
  for (const key in imagesByParagraph) {
    let pi = Number(key);
    const current = paragraphs[pi] || '';
    const next = paragraphs[pi + 1] || '';
    if (next && !paragraphEndsSentence(current) && paragraphStartsContinuation(next)) {
      pi += 1;
    }
    if (!normalized[pi]) normalized[pi] = [];
    normalized[pi].push(...imagesByParagraph[key]);
  }
  return normalized;
}

const FR_APP_NUMBER_WORDS = new Set([
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
  'twenty', 'thirty', 'forty', 'fifty',
]);

function normalizeAppSplitNumberLines(text) {
  return (text || '').replace(/(^|\n)([A-Z])\s+([a-z][A-Za-z-]*)(?=\n|$)/g, (match, prefix, first, rest) => {
    const joined = first + rest;
    return FR_APP_NUMBER_WORDS.has(joined.toLowerCase()) ? prefix + joined : match;
  });
}

function tokenizeChapters(chapters) {
  const tokens = [];
  const chapterStarts = [];
  if (!chapters) return { tokens, chapterStarts };
  for (let ci = 0; ci < chapters.length; ci++) {
    chapterStarts.push(tokens.length);
    const ch = chapters[ci];
    // Chapter heading token
    if (ch.title) {
      tokens.push({ type: 'chapter_heading', text: ch.title, chapter: ci });
    }
    // Build a set of paragraph indices that have images after them
    const imagesByParagraph = {};
    if (ch.images) {
      for (const img of ch.images) {
        const pi = img.afterParagraph || 0;
        if (!imagesByParagraph[pi]) imagesByParagraph[pi] = [];
        imagesByParagraph[pi].push(img.dataUrl);
      }
    }
    // Split into paragraphs, then words
    const paragraphs = normalizeAppSplitNumberLines(ch.text).split(/\n\s*\n/);
    const normalizedImages = normalizeImageBreaks(paragraphs, imagesByParagraph);
    for (let pi = 0; pi < paragraphs.length; pi++) {
      if (pi > 0) tokens.push({ type: 'paragraph_break' });
      const words = applyInlineMarkdownWordStyles(splitReadableWords(paragraphs[pi]));
      for (const word of words) {
        tokens.push({ type: 'word', text: word.text, strong: word.strong, punctuation: classifyPunctuation(word.text) });
      }
      // Insert image tokens after this paragraph
      if (normalizedImages[pi]) {
        for (const dataUrl of normalizedImages[pi]) {
          tokens.push({ type: 'image', dataUrl });
        }
      }
    }
  }
  return { tokens, chapterStarts };
}

// Get only the word tokens (for word-based indexing in PageView)
function flatWords(chapters) {
  const words = [];
  const chapterStarts = [];
  if (!chapters) return { words, chapterStarts };
  for (const ch of chapters) {
    chapterStarts.push(words.length);
    const paragraphs = normalizeAppSplitNumberLines(ch.text).split(/\n\s*\n/);
    for (const paragraph of paragraphs) {
      for (const word of applyInlineMarkdownWordStyles(splitReadableWords(paragraph))) {
        words.push(word.text);
      }
    }
  }
  return { words, chapterStarts };
}

// -- Tokenization cache (survives Reader mount/unmount) --
const _tokenCache = new Map();
const _flatWordCache = new Map();

function cachedTokenize(bookId, chapters) {
  if (_tokenCache.has(bookId)) return _tokenCache.get(bookId);
  const result = tokenizeChapters(chapters);
  _tokenCache.set(bookId, result);
  return result;
}

function cachedFlatWords(bookId, chapters) {
  if (_flatWordCache.has(bookId)) return _flatWordCache.get(bookId);
  const result = flatWords(chapters);
  _flatWordCache.set(bookId, result);
  return result;
}

// -- Multi-word grouping --
function collectMultiWordGroup(tokens, startIdx, measureFn, containerWidth) {
  if (!measureFn || !containerWidth) return [tokens[startIdx]];
  const group = [];
  let totalWidth = 0;
  const spaceWidth = measureFn(' ');
  for (let i = startIdx; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== 'word') break;
    const wordWidth = measureFn(token.text);
    const newTotal = totalWidth + (group.length > 0 ? spaceWidth : 0) + wordWidth;
    if (group.length > 0 && newTotal > containerWidth) break;
    group.push(token);
    totalWidth = newTotal;
  }
  return group.length > 0 ? group : [tokens[startIdx]];
}

function calculateDelay(token, wpm, settings) {
  const base = 60000 / wpm;
  if (token.type === 'paragraph_break') return base * (settings.paragraphPauseMult ?? DEFAULT_SETTINGS.paragraphPauseMult);
  if (token.type === 'chapter_heading') return base * 5;
  if (token.type !== 'word') return base;
  let mult = 1;
  if (token.punctuation === 'fullstop') mult *= settings.fullstopMult;
  else if (token.punctuation === 'comma') mult *= settings.commaMult;
  else if (token.punctuation === 'semicolon') mult *= settings.semicolonMult;
  else if (token.punctuation === 'ellipsis') mult *= settings.ellipsisMult;
  let extra = 0;
  const threshold = settings.longWordThreshold ?? 9;
  if (token.text.length > threshold) extra = (token.text.length - threshold) * (settings.longWordMs ?? 10);
  return base * mult + extra;
}

// -- Delete modal (replaces confirm()) --
function DeleteModal({ book, theme, onArchive, onDelete, onCancel }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);
  const hasElectron = !!window.electronBooks;
  return (
    <div onClick={onCancel} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 440, maxWidth: '90vw', background: theme.bg, border: `0.75px solid ${theme.ink}`, padding: 28, color: theme.ink }}>
        <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Remove book?</div>
        <div style={{ fontSize: 15, lineHeight: 1.5, opacity: 0.7, marginBottom: hasElectron ? 16 : 28 }}>
          "{book.title}" will be removed from your library.
        </div>
        {hasElectron && (
          <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.5, marginBottom: 28 }}>
            Archive moves the file to books/archive. Delete removes it permanently.
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={secondaryBtn(theme)}>Cancel</button>
          {hasElectron && <button onClick={onArchive} style={secondaryBtn(theme)}>Archive</button>}
          <button onClick={onDelete} style={{ ...primaryBtn(theme), background: '#c33', color: '#fff', borderColor: '#c33' }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// -- Empty library / welcome --
function EmptyLibrary({ theme, onPick, onPickInput, supported, busy, progress }) {
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 40, textAlign: 'center', background: theme.bg, color: theme.ink }}>
      <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 56, fontWeight: 600, letterSpacing: -1.5, marginBottom: 12 }}>FentiRead</div>
      <Mono size={11} opacity={0.55}>Speed reader</Mono>
      <div style={{ marginTop: 60, maxWidth: 500, fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 17, lineHeight: 1.6, opacity: 0.75 }}>
        Choose a folder containing your <Mono size={12}>.epub</Mono>, <Mono size={12}>.mobi</Mono> or <Mono size={12}>.azw3</Mono> files, or pick individual files.
      </div>
      <div style={{ marginTop: 36, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        {supported && (
          <button onClick={onPick} disabled={busy} style={primaryBtn(theme)}>
            {I.folder(14)} <span style={{ marginLeft: 10 }}>Choose folder</span>
          </button>
        )}
        <label style={{ ...secondaryBtn(theme), cursor: busy ? 'wait' : 'pointer' }}>
          {I.plus(14)} <span style={{ marginLeft: 10 }}>Pick files</span>
          <input type="file" accept=".epub,.mobi,.azw,.azw3" multiple onChange={onPickInput} style={{ display: 'none' }} disabled={busy} />
        </label>
      </div>
      {!supported && (
        <Mono size={9} opacity={0.45} style={{ marginTop: 20, maxWidth: 480 }}>
          Folder picker requires Chrome/Edge. On Safari/Firefox use "Pick files".
        </Mono>
      )}
      {busy && progress && (
        <div style={{ marginTop: 32, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.65 }}>
          Indexing {progress.i + 1}/{progress.total} - {progress.name}
        </div>
      )}
    </div>
  );
}

// -- Library --
function Library({ theme, books, onOpen, onAdd, onAddInput, onDelete, onCoverChange, supported, busy, progress }) {
  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '32px 8vw 80px', background: theme.bg, color: theme.ink }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto 32px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Mono size={10} opacity={0.55}>Library - {books.length} {books.length === 1 ? 'title' : 'titles'}</Mono>
          <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 40, fontWeight: 600, letterSpacing: -1, marginTop: 6 }}>Your Books</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {supported && (
            <button onClick={onAdd} disabled={busy} style={secondaryBtn(theme)}>
              {I.folder(14)} <span style={{ marginLeft: 10 }}>Folder</span>
            </button>
          )}
          <label style={{ ...primaryBtn(theme), cursor: busy ? 'wait' : 'pointer' }}>
            {I.plus(14)} <span style={{ marginLeft: 10 }}>Add</span>
            <input type="file" accept=".epub,.mobi,.azw,.azw3" multiple onChange={onAddInput} style={{ display: 'none' }} disabled={busy} />
          </label>
        </div>
      </div>
      {busy && progress && (
        <div style={{ maxWidth: 1200, margin: '0 auto 24px', fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.65 }}>
          Indexing {progress.i + 1}/{progress.total} - {progress.name}
        </div>
      )}
      {(() => {
        const isFinished = (b) => b.totalWords ? Math.round((b.progress?.wordIndex || 0) / b.totalWords * 100) >= 100 : false;
        const unfinished = books.filter(b => !isFinished(b));
        const finished = books.filter(b => isFinished(b));
        const card = (b) => <BookCard key={b.id} book={b} theme={theme} onOpen={() => onOpen(b)} onDelete={() => onDelete(b)} onCoverChange={(file) => onCoverChange(b, file)} />;
        return <>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            columnGap: 28, rowGap: 40, maxWidth: 1200, margin: '0 auto',
          }}>
            {unfinished.map(card)}
          </div>
          {finished.length > 0 && <>
            <div style={{ maxWidth: 1200, margin: '48px auto 40px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, height: '0.75px', background: theme.ink, opacity: 0.2 }} />
              <Mono size={10} opacity={0.4}>Finished</Mono>
              <div style={{ flex: 1, height: '0.75px', background: theme.ink, opacity: 0.2 }} />
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              columnGap: 28, rowGap: 40, maxWidth: 1200, margin: '0 auto',
            }}>
              {finished.map(card)}
            </div>
          </>}
        </>;
      })()}
    </div>
  );
}

function BookCard({ book, theme, onOpen, onDelete, onCoverChange }) {
  const pct = book.totalWords ? Math.round((book.progress?.wordIndex || 0) / book.totalWords * 100) : 0;
  const coverInputRef = useRef(null);
  return (
    <div className="book-card" style={{ position: 'relative' }}>
      <div onClick={onOpen} style={{ cursor: book.unsupported ? 'not-allowed' : 'pointer', opacity: book.unsupported ? 0.5 : 1 }}>
        <div style={{ position: 'relative' }}>
          <CoverImg book={book} theme={theme} />
          <div style={{ position: 'absolute', top: 8, left: 8 }}><Pill theme={theme}>{pct}%</Pill></div>
          <div style={{ position: 'absolute', bottom: 8, right: 8 }}><Pill theme={theme}>{book.format}</Pill></div>
          <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onCoverChange(f); e.target.value = ''; }} />
          <button onClick={(e) => { e.stopPropagation(); coverInputRef.current?.click(); }} title="Change cover" className="book-del" style={{
            position: 'absolute', bottom: 8, left: 8,
            width: 26, height: 26, borderRadius: 13,
            border: `0.75px solid ${theme.ink}`, background: theme.bg, color: theme.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            opacity: 0, transition: 'opacity 150ms',
          }}>{I.image(12)}</button>
        </div>
        <div style={{ marginTop: 12, fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 14, fontWeight: 500, lineHeight: 1.25, textWrap: 'pretty' }}>{book.title}</div>
        <Mono size={9} opacity={0.55} style={{ marginTop: 4, display: 'block' }}>{book.author}</Mono>
      </div>
      <button onClick={onDelete} title="Remove" className="book-del" style={{
        position: 'absolute', top: 8, right: 8,
        width: 26, height: 26, borderRadius: 13,
        border: `0.75px solid ${theme.ink}`, background: theme.bg, color: theme.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        opacity: 0, transition: 'opacity 150ms',
      }}>{I.trash(12)}</button>
    </div>
  );
}

// -- Reader --
function Reader({ theme, book, onClose, settings, onSettings, onProgressChange, escapeToClose = false, onEscapeClose, showTopChrome = true }) {
  const [paused, setPaused] = useState(true);
  const [wpm, setWpm] = useState(settings.wpm);
  const [showSettings, setShowSettings] = useState(false);
  const [showPageView, setShowPageView] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [statMode, setStatMode] = useState(0); // 0=%, 1=pages left, 2=time left

  const fontFamily = getFontFamily(settings.font);

  // Tokenize chapters (cached across mount/unmount)
  const { tokens, chapterStarts } = useMemo(() => cachedTokenize(book.id, book.chapters), [book.id]);

  // Also keep flat words for PageView
  const { words: flatWordList, chapterStarts: wordChapterStarts } = useMemo(() => cachedFlatWords(book.id, book.chapters), [book.id]);

  // Pre-build O(1) lookup: token index -> word count
  const tokenWordIndex = useMemo(() => {
    const map = new Int32Array(tokens.length);
    let count = 0;
    for (let i = 0; i < tokens.length; i++) {
      map[i] = count;
      if (tokens[i].type === 'word') count++;
    }
    return map;
  }, [tokens]);

  const wordTokenIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'word') indices.push(i);
    }
    return indices;
  }, [tokens]);

  const wordIndexToTokenIndex = useCallback((wordIdx) => {
    if (wordTokenIndices.length === 0) return 0;
    const clamped = Math.max(0, Math.min(wordTokenIndices.length - 1, wordIdx));
    return wordTokenIndices[clamped];
  }, [wordTokenIndices]);

  // Compute initial token index synchronously from saved word position
  const initialIdx = useMemo(() => {
    const savedWordIdx = book.progress?.wordIndex || 0;
    // If no saved progress but book has a startChapter, jump to that chapter
    if (savedWordIdx <= 0 && book.startChapter > 0 && chapterStarts.length > book.startChapter) {
      return chapterStarts[book.startChapter];
    }
    if (savedWordIdx <= 0 || wordTokenIndices.length === 0) return 0;
    const clamped = Math.max(0, Math.min(wordTokenIndices.length - 1, savedWordIdx));
    return wordTokenIndices[clamped];
  }, [book.id, wordTokenIndices, chapterStarts]);

  const [idx, setIdx] = useState(initialIdx);

  // Sync idx when book changes (switching books)
  const prevBookIdRef = useRef(book.id);
  useEffect(() => {
    if (prevBookIdRef.current !== book.id) {
      prevBookIdRef.current = book.id;
      setIdx(initialIdx);
    }
  }, [book.id, initialIdx]);

  // Current word index - O(1) via lookup table
  const currentWordIndex = idx < tokens.length ? tokenWordIndex[idx] : (tokenWordIndex[tokens.length - 1] || 0);
  const totalWordCount = book.totalWords || flatWordList.length;

  // Current chapter
  const currentChapter = useMemo(() => {
    let c = 0;
    for (let i = 0; i < chapterStarts.length; i++) {
      if (chapterStarts[i] <= idx) c = i; else break;
    }
    return c;
  }, [idx, chapterStarts]);

  const currentChapterPct = useMemo(() => {
    const start = chapterStarts[currentChapter] || 0;
    const next = chapterStarts[currentChapter + 1] || tokens.length || 1;
    return (idx - start) / Math.max(1, (next - start));
  }, [idx, currentChapter, chapterStarts, tokens.length]);

  // Canvas measurement for multi-word mode
  const canvasRef = useRef(null);
  const rsvpContainerRef = useRef(null);

  const measureWidth = useCallback((text) => {
    if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
    const ctx = canvasRef.current.getContext('2d');
    ctx.font = `${settings.fontSize}px ${fontFamily}`;
    return ctx.measureText(text).width;
  }, [settings.fontSize, fontFamily]);

  // Compute current display group
  const displayGroup = useMemo(() => {
    if (idx >= tokens.length) return [];
    const token = tokens[idx];
    if (isTrailingPunctuationToken(token)) {
      const prev = tokens[idx - 1];
      return prev?.type === 'word' ? [withAttachedTrailingPunctuation(prev, token)] : [];
    }
    if (token.type !== 'word') return [token];
    if (!settings.multiWord) return [withAttachedTrailingPunctuation(token, tokens[idx + 1])];
    const containerWidth = rsvpContainerRef.current?.offsetWidth
      ? rsvpContainerRef.current.offsetWidth * 0.85
      : 600;
    const group = collectMultiWordGroup(tokens, idx, measureWidth, containerWidth);
    if (group.length === 1) return [withAttachedTrailingPunctuation(group[0], tokens[idx + 1])];
    return group.map((t, i) => i === group.length - 1 ? withAttachedTrailingPunctuation(t, tokens[idx + group.length]) : t);
  }, [idx, tokens, settings.multiWord, settings.fontSize, measureWidth]);

  // Helper: advance index past paragraph breaks, stopping on words, images, or chapter headings
  const skipToNextVisible = useCallback((fromIdx) => {
    let next = fromIdx;
    while (next < tokens.length && tokens[next].type === 'paragraph_break') next++;
    return Math.min(tokens.length - 1, next);
  }, [tokens]);

  const nextVisibleIndex = useCallback((fromIdx, dir) => {
    const step = dir > 0 ? 1 : -1;
    let target = fromIdx + step;
    while (target >= 0 && target < tokens.length && tokens[target].type === 'paragraph_break') {
      target += step;
    }
    return Math.max(0, Math.min(tokens.length - 1, target));
  }, [tokens]);

  // RSVP timer - requestAnimationFrame loop for consistent timing
  const rafRef = useRef(null);
  const advanceAtRef = useRef(0);
  const scheduledIdxRef = useRef(null);
  const preloadedImageUrlsRef = useRef(new Set());

  useEffect(() => {
    if (!tokens.length) return;
    let found = 0;
    for (let i = idx; i < tokens.length && found < 4; i++) {
      const token = tokens[i];
      if (token.type !== 'image' || !token.dataUrl) continue;
      if (preloadedImageUrlsRef.current.has(token.dataUrl)) {
        found++;
        continue;
      }
      preloadedImageUrlsRef.current.add(token.dataUrl);
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = token.dataUrl;
      found++;
    }
  }, [idx, tokens]);

  useEffect(() => {
    if (paused || idx >= tokens.length) {
      advanceAtRef.current = 0;
      scheduledIdxRef.current = null;
      return;
    }
    const token = tokens[idx];

    // Immediately skip paragraph breaks
    if (token.type === 'paragraph_break') {
      setIdx(skipToNextVisible(idx));
      return;
    }

    // Image or chapter heading: user just resumed, advance past it
    if (token.type === 'image' || token.type === 'chapter_heading') {
      let next = idx + 1;
      while (next < tokens.length && tokens[next].type === 'paragraph_break') next++;
      // If the next visible token is also a pause-type, go to it and pause again
      if (next < tokens.length && (tokens[next].type === 'image' || tokens[next].type === 'chapter_heading')) {
        setIdx(next);
        setPaused(true);
      } else {
        setIdx(Math.min(tokens.length - 1, next));
      }
      return;
    }

    // Calculate display duration
    let delay;
    {
      const advance = displayGroup.length || 1;
      const displayConsumesTrailingPunctuation = isTrailingPunctuationToken(tokens[idx + advance]);
      if (settings.multiWord && displayGroup.length > 1) {
        delay = displayGroup.reduce((sum, t) => sum + calculateDelay(t, wpm, settings), 0);
      } else {
        delay = calculateDelay(displayGroup[0] || token, wpm, settings);
      }
      const nextRaw = idx + advance + (displayConsumesTrailingPunctuation ? 1 : 0);
      if (nextRaw < tokens.length && tokens[nextRaw].type === 'paragraph_break') {
        delay = Math.max(delay, (60000 / wpm) * (settings.paragraphPauseMult ?? DEFAULT_SETTINGS.paragraphPauseMult));
      }
    }

    // Chain from previous target to prevent cumulative drift
    const now = performance.now();
    if (scheduledIdxRef.current === idx && advanceAtRef.current > now) {
      // WPM/settings changes can rerun this effect while the same word is still
      // displayed. Keep the existing target so arrow-key speed changes feel live.
    } else if (advanceAtRef.current === 0) {
      advanceAtRef.current = now + delay;
    } else {
      advanceAtRef.current += delay;
      if (advanceAtRef.current < now - 30) {
        advanceAtRef.current = now + 10;
      }
    }
    scheduledIdxRef.current = idx;

    const targetTime = advanceAtRef.current;
    const tick = () => {
      if (performance.now() >= targetTime) {
        const adv = displayGroup.length || 1;
        const nextIdx = idx + adv + (isTrailingPunctuationToken(tokens[idx + adv]) ? 1 : 0);
        // Check if the next visible token is an image or chapter heading, auto-pause on it
        let landed = nextIdx;
        while (landed < tokens.length && tokens[landed].type === 'paragraph_break') landed++;
        if (landed < tokens.length && (tokens[landed].type === 'image' || tokens[landed].type === 'chapter_heading')) {
          setIdx(landed);
          setPaused(true);
        } else {
          setIdx(skipToNextVisible(nextIdx));
        }
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, wpm, idx, tokens, settings, displayGroup, skipToNextVisible]);

  // Persist progress (debounced)
  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        if (onProgressChange) {
          await onProgressChange({
            wordIndex: currentWordIndex,
            totalWords: totalWordCount,
            complete: totalWordCount > 0 && currentWordIndex >= totalWordCount - 1,
          });
          return;
        }
        const fresh = await FRStore.dbGet('books', book.id);
        if (fresh) {
          fresh.progress = { wordIndex: currentWordIndex };
          fresh.lastReadAt = Date.now();
          await FRStore.dbPut('books', fresh);
        }
      } catch (e) { /* ignore */ }
    }, 400);
    return () => clearTimeout(t);
  }, [currentWordIndex, totalWordCount, book.id, onProgressChange]);

  // Sync WPM changes back to persisted settings
  useEffect(() => {
    if (wpm !== settings.wpm) {
      const t = setTimeout(() => onSettings({ wpm }), 300);
      return () => clearTimeout(t);
    }
  }, [wpm]);

  const jumpBy = useCallback((dir) => {
    setIdx(i => {
      const target = nextVisibleIndex(i, dir);
      const landed = tokens[target]?.type;
      if (landed === 'image' || landed === 'chapter_heading') setPaused(true);
      return target;
    });
  }, [nextVisibleIndex, tokens]);

  const jumpChapter = useCallback((dir) => {
    setIdx(i => {
      let c = 0;
      for (let k = 0; k < chapterStarts.length; k++) {
        if (chapterStarts[k] <= i) c = k; else break;
      }
      const target = dir < 0
        ? (i > (chapterStarts[c] ?? 0) + 3 ? c : Math.max(0, c - 1))
        : Math.min(chapterStarts.length - 1, c + 1);
      return chapterStarts[target] ?? 0;
    });
  }, [chapterStarts]);

  // Global 'L' for library (works from any sub-view)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'l' || e.key === 'L') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Keyboard
  useEffect(() => {
    if (showPageView) return;
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const ctrl = e.ctrlKey || e.metaKey;
      if (e.code === 'Space') { e.preventDefault(); setPaused(p => !p); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setWpm(v => Math.min(900, v + 20)); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setWpm(v => Math.max(100, v - 20)); }
      else if (e.key === 'ArrowLeft')  { e.preventDefault(); ctrl ? jumpChapter(-1) : jumpBy(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); ctrl ? jumpChapter(1)  : jumpBy(1); }
      else if (e.key === ',') setIdx(i => {
        const n = nextVisibleIndex(i, -1);
        const t = tokens[n]?.type;
        if (t === 'image' || t === 'chapter_heading') setPaused(true);
        return n;
      });
      else if (e.key === '.') setIdx(i => {
        const n = nextVisibleIndex(i, 1);
        const t = tokens[n]?.type;
        if (t === 'image' || t === 'chapter_heading') setPaused(true);
        return n;
      });
      else if (e.key === 'Escape') {
        setPaused(true);
        setShowSettings(false);
        (onEscapeClose || onClose)();
      }
      else if (e.key === 's' || e.key === 'S') setShowSettings(s => !s);
      else if (e.key === 'p' || e.key === 'P') { setPaused(true); setShowPageView(true); }
      else if (e.key === '?') setShowHelp(h => !h);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tokens, onClose, onEscapeClose, showSettings, showPageView, jumpBy, jumpChapter, nextVisibleIndex, escapeToClose]);

  useEffect(() => { try { window.focus(); } catch(_) {} }, []);

  // Unsupported book
  if (book.unsupported) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: theme.bg, color: theme.ink, padding: 40, textAlign: 'center' }}>
        <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 32, fontWeight: 600 }}>{book.title}</div>
        <Mono size={11} opacity={0.55} style={{ marginTop: 8 }}>{book.format} couldn't be parsed</Mono>
        <div style={{ maxWidth: 460, marginTop: 24, fontSize: 16, lineHeight: 1.6, opacity: 0.75 }}>
          {book.unsupportedReason || 'Unknown error.'} If this is an Amazon file (KF8/AZW3 with HUFF/CDIC or DRM), convert it with Calibre and re-add.
        </div>
        <button onClick={onClose} style={{ ...secondaryBtn(theme), marginTop: 32 }}>{I.back(14)} <span style={{ marginLeft: 10 }}>Back to library</span></button>
      </div>
    );
  }

  if (!tokens.length) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.bg, color: theme.ink }}>
        <Mono>Empty book</Mono>
      </div>
    );
  }

  const token = tokens[idx];
  const overall = idx / Math.max(1, tokens.length - 1);
  const wordsLeft = Math.max(0, totalWordCount - currentWordIndex);
  const pagesLeft = Math.ceil(wordsLeft / 250);

  // Render RSVP display
  const renderDisplay = () => {
    if (!token) return null;
    if (token.type === 'paragraph_break') return null;
    if (token.type === 'image') {
      return (
        <img src={token.dataUrl} alt="" style={{ maxWidth: '95%', maxHeight: '85vh', objectFit: 'contain', borderRadius: 4 }} />
      );
    }
    if (token.type === 'chapter_heading') {
      return (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Mono size={11} opacity={0.45}>Chapter</Mono>
          <span style={{ fontFamily, fontSize: settings.fontSize, lineHeight: 1, letterSpacing: -1, fontWeight: 600, color: theme.ink }}>{token.text}</span>
        </div>
      );
    }
    if (settings.multiWord && displayGroup.length > 1) {
      return (
        <span style={{ fontFamily, fontSize: settings.fontSize, lineHeight: 1, letterSpacing: -1, color: theme.ink }}>
          {displayGroup.map((t, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="mw-space">{' '}</span>}
                {t.strong ? <span style={{ fontWeight: 700 }}>{t.text}</span> : settings.bionicBold ? (() => {
                  const [head, tail] = bionicSplit(t.text, settings.bionicRatio);
                  return <><span style={{ fontWeight: 700 }}>{head}</span><span style={{ fontWeight: 300 }}>{tail}</span></>;
                })() : t.text}
            </React.Fragment>
          ))}
        </span>
      );
    }
    if (token.strong) {
      return <span style={{ fontFamily, fontSize: settings.fontSize, lineHeight: 1, letterSpacing: -1, color: theme.ink, fontWeight: 700 }}>{token.text}</span>;
    }
    return <FocusWord word={token.text} size={settings.fontSize} color={theme.ink} ratio={settings.bionicRatio} bionic={settings.bionicBold} fontFamily={fontFamily} />;
  };

  return (
    <div onClick={() => setPaused(p => !p)} style={{ height: '100%', background: theme.bg, color: theme.ink, display: 'flex', flexDirection: 'column', position: 'relative', cursor: 'pointer', userSelect: 'none' }}>
      {/* Top chrome (paused only, hidden on images) */}
      {showTopChrome && token?.type !== 'image' && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: paused ? 1 : 0, transition: 'opacity 200ms', pointerEvents: paused ? 'auto' : 'none', zIndex: 5 }} onClick={e => e.stopPropagation()}>
          <button onClick={onClose} style={iconBtn(theme)}>{I.back(18)}</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 14, fontWeight: 600 }}>{book.title}</div>
            <Mono size={9} opacity={0.55} style={{ marginTop: 2, display: 'block' }}>
              {book.chapters[currentChapter]?.title || ('Ch ' + (currentChapter + 1))} - {Math.round(overall * 100)}%
            </Mono>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => { setPaused(true); setShowPageView(true); }} title="Page view" style={iconBtn(theme)}>{I.page(18)}</button>
            <button onClick={() => setShowHelp(h => !h)} title="Keyboard shortcuts" style={iconBtn(theme)}>{I.help(18)}</button>
            <button onClick={() => setShowSettings(s => !s)} title="Settings" style={iconBtn(theme)}>{I.gear(18)}</button>
          </div>
        </div>
      )}

      {/* RSVP display */}
      <div ref={rsvpContainerRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: token?.type === 'image' ? 0 : 18, padding: token?.type === 'image' ? '0 8px' : '0 40px' }}>
        {settings.focusMarks && token?.type !== 'image' && <div style={{ width: 1, height: 24, background: theme.ink, opacity: 0.85 }} />}
        {renderDisplay()}
        {settings.focusMarks && token?.type !== 'image' && <div style={{ width: 1, height: 24, background: theme.ink, opacity: 0.85 }} />}
      </div>

      {/* Bottom chrome - hidden on images */}
      <div style={{ padding: '0 28px 28px', display: token?.type === 'image' && !paused ? 'none' : 'block' }} onClick={e => e.stopPropagation()}>
        <div style={{ maxWidth: 720, margin: '0 auto 20px', display: 'flex', alignItems: 'center', gap: 20, opacity: paused ? 1 : 0, visibility: paused ? 'visible' : 'hidden', transition: 'opacity 200ms', pointerEvents: paused ? 'auto' : 'none' }}>
          <button onClick={() => setPaused(p => !p)} style={{ width: 56, height: 56, borderRadius: 28, background: 'transparent', border: `1.5px solid ${theme.ink}`, color: theme.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {paused
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>}
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <Mono opacity={0.55}>Speed</Mono>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14 }}>{wpm} <span style={{ fontSize: 10, opacity: 0.55 }}>WPM</span></span>
            </div>
            <Slider value={wpm} min={100} max={900} step={10} onChange={setWpm} theme={theme} />
          </div>
        </div>
        <ChapterTickProgress
          chapterWordCounts={book.chapters.map(c => c.wordCount)}
          currentChapter={currentChapter}
          chapterPct={currentChapterPct}
          color={theme.ink}
          expanded={paused}
          totalWords={totalWordCount}
          wordsRead={currentWordIndex}
          wpm={wpm}
          statMode={statMode}
          onStatClick={() => setStatMode(m => (m + 1) % 3)}
        />
      </div>

      {showSettings && (
        <SettingsPanel theme={theme} settings={settings} onSettings={onSettings} onClose={() => setShowSettings(false)} />
      )}
      {showHelp && (
        <HelpModal theme={theme} onClose={() => setShowHelp(false)} />
      )}
      <PageView
        theme={theme}
        bookId={book.id}
        words={flatWordList}
        chapterStarts={wordChapterStarts}
        chapters={book.chapters}
        currentIdx={currentWordIndex}
        visible={showPageView}
        onPick={(newWordIdx) => {
          setIdx(wordIndexToTokenIndex(newWordIdx));
          setShowPageView(false);
        }}
        onBookmark={(newWordIdx) => {
          setIdx(wordIndexToTokenIndex(newWordIdx));
          setTimeout(() => setShowPageView(false), 900);
        }}
        onClose={() => setShowPageView(false)}
        onEscape={onEscapeClose || onClose}
      />
    </div>
  );
}

// -- Chapter tick progress --
function ChapterTickProgress({ chapterWordCounts, currentChapter, chapterPct, color, expanded, totalWords, wordsRead, wpm, statMode, onStatClick }) {
  const chapters = chapterWordCounts.length || 1;

  // Cumulative word positions for each chapter boundary (0 to 1)
  const cumulative = useMemo(() => {
    const total = chapterWordCounts.reduce((s, w) => s + w, 0) || 1;
    const positions = [0];
    let sum = 0;
    for (const wc of chapterWordCounts) {
      sum += wc;
      positions.push(sum / total);
    }
    return positions;
  }, [chapterWordCounts]);

  // Overall position: interpolate within current chapter's proportional range
  const chStart = cumulative[currentChapter] || 0;
  const chEnd = cumulative[currentChapter + 1] || 1;
  const overall = chStart + chapterPct * (chEnd - chStart);

  const wordsLeft = Math.max(0, totalWords - wordsRead);
  const minLeft = wpm ? Math.round(wordsLeft / wpm) : 0;
  const totalPages = Math.ceil(totalWords / 250);
  const currentPage = Math.min(totalPages, Math.ceil(wordsRead / 250) + 1);
  const pagesLeft = Math.max(0, totalPages - currentPage);
  const pct = Math.round(overall * 100);

  const statText = statMode === 0
    ? (pct + '% done')
    : statMode === 1
    ? ('~' + pagesLeft + ' pg left')
    : ('~' + minLeft + 'm remaining');

  return (
    <div style={{ width: '100%' }}>
      {expanded && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <Mono size={11} opacity={0.55}>ch {String(currentChapter + 1).padStart(2,'0')} / {String(chapters).padStart(2,'0')}</Mono>
          <span
            onClick={onStatClick}
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color, letterSpacing: 0.4, cursor: 'pointer', userSelect: 'none' }}
          >{statText}</span>
        </div>
      )}
      <div style={{ position: 'relative', height: 18, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: color, opacity: 0.18 }} />
        {cumulative.map((pos, i) => {
          const passed = i <= currentChapter;
          const isEndpoint = i === 0 || i === chapters;
          return <div key={i} style={{
            position: 'absolute', left: `${pos * 100}%`, transform: 'translateX(-50%)',
            width: 1, height: isEndpoint ? 12 : 7, background: color,
            opacity: passed ? 0.85 : 0.28, alignSelf: 'center', top: '50%', marginTop: isEndpoint ? -6 : -3.5,
          }} />;
        })}
        <div style={{ position: 'absolute', left: `${overall * 100}%`, top: 0, bottom: 0, transform: 'translateX(-50%)', width: 2, background: color }} />
      </div>
      <div style={{ textAlign: 'center', marginTop: 6 }}>
        <Mono size={11} opacity={0.45}>{currentPage} / {totalPages}</Mono>
      </div>
    </div>
  );
}

// -- Pagination cache --
function savePaginationCache(bookId, layoutKey, pageModel) {
  try {
    const chapterImgCounters = {};
    const slim = pageModel.pages.map(p => ({
      ci: p.chapterIdx, pi: p.pageIdx, sw: p.startWord, ew: p.endWord,
      items: p.items.map(it => {
        if (it.type === 'heading') return { t: 'h' };
        if (it.type === 'image') {
          if (!chapterImgCounters[p.chapterIdx]) chapterImgCounters[p.chapterIdx] = 0;
          return { t: 'i', ii: chapterImgCounters[p.chapterIdx]++ };
        }
        return { t: 'p', a: it.absStartWordIdx, f: it.fromWord, to: it.toWord };
      }),
    }));
    localStorage.setItem('pg-cache-' + bookId, JSON.stringify({ layoutKey, slim, cfp: pageModel.chapterFirstPages }));
  } catch (_) {}
}

function loadPaginationCache(bookId, layoutKey) {
  try {
    const raw = localStorage.getItem('pg-cache-' + bookId);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.layoutKey !== layoutKey) return null;
    return data;
  } catch (_) {
    return null;
  }
}

function reconstructPageModel(cache, chapters, chapterStarts, words, buildContentItems) {
  const contentByChapter = {};
  const getContent = (ci) => {
    if (!contentByChapter[ci]) {
      const cs = chapterStarts[ci] ?? 0;
      const ce = chapterStarts[ci + 1] ?? words.length;
      contentByChapter[ci] = buildContentItems(ci, cs, ce);
    }
    return contentByChapter[ci];
  };

  const pages = cache.slim.map((sp, gi) => {
    const content = getContent(sp.ci);
    const paraMap = {};
    for (const it of content) {
      if (it.type === 'paragraph') paraMap[it.absStartWordIdx] = it.words;
    }
    const contentImages = content.filter(it => it.type === 'image');

    const items = sp.items.map(it => {
      if (it.t === 'h') return { type: 'heading', text: chapters[sp.ci]?.title || '' };
      if (it.t === 'i') return contentImages[it.ii ?? 0] || { type: 'image', dataUrl: '' };
      return { type: 'paragraph', words: paraMap[it.a] || [], absStartWordIdx: it.a, fromWord: it.f, toWord: it.to };
    });

    return { chapterIdx: sp.ci, pageIdx: sp.pi, globalPageIdx: gi, items, startWord: sp.sw, endWord: sp.ew };
  });

  return { layoutKey: cache.layoutKey, complete: true, pages, chapterFirstPages: cache.cfp };
}

// -- Page view --
function PageView({ theme, bookId, words, chapterStarts, chapters, currentIdx, onPick, onBookmark, onClose, onEscape, visible = true }) {
  const chOf = useCallback((wordIdx) => {
    let c = 0;
    for (let i = 0; i < chapterStarts.length; i++) {
      if (chapterStarts[i] <= wordIdx) c = i; else break;
    }
    return c;
  }, [chapterStarts]);

  const currentIdxRef = useRef(currentIdx);
  currentIdxRef.current = currentIdx;

  const [spreadIdx, setSpreadIdx] = useState(0);
  const [toast, setToast] = useState(null);
  const [longPressIdx, setLongPressIdx] = useState(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [pageModel, setPageModel] = useState(null);
  const initialScrollDone = useRef(false);
  const fullModelAppliedRef = useRef(null);
  const activePageIdentityRef = useRef({ chapterIdx: chOf(currentIdx), pageIdx: 0 });
  const spreadIdxRef = useRef(0);
  const displayChIdxRef = useRef(chOf(currentIdx));

  const buildContentItems = useCallback((chIdx, windowStart, windowEnd) => {
    const ch = chapters[chIdx];
    if (!ch) return [];
    const items = [];
    const imagesByParagraph = {};
    if (ch.images) {
      for (const img of ch.images) {
        const pi = img.afterParagraph || 0;
        if (!imagesByParagraph[pi]) imagesByParagraph[pi] = [];
        imagesByParagraph[pi].push(img.dataUrl);
      }
    }
    const paragraphs = normalizeAppSplitNumberLines(ch.text).split(/\n\s*\n/);
    const normalizedImages = normalizeImageBreaks(paragraphs, imagesByParagraph);
    let wordIdx = 0;
    const chStart = chapterStarts[chIdx] ?? 0;
    for (let pi = 0; pi < paragraphs.length; pi++) {
      const expanded = applyInlineMarkdownWordStyles(splitReadableWords(paragraphs[pi])).map(w => w.text);
      if (expanded.length > 0) {
        const paraStart = chStart + wordIdx;
        const from = Math.max(0, windowStart - paraStart);
        const to = Math.min(expanded.length, windowEnd - paraStart);
        if (from < to) {
          items.push({ type: 'paragraph', words: expanded.slice(from, to), absStartWordIdx: paraStart + from });
        }
        wordIdx += expanded.length;
      }
      if (normalizedImages[pi]) {
        const imageAnchor = chStart + wordIdx;
        if (imageAnchor >= windowStart && imageAnchor <= windowEnd) {
          for (const dataUrl of normalizedImages[pi]) {
            items.push({ type: 'image', dataUrl });
          }
        }
      }
    }
    return items;
  }, [chapters, chapterStarts]);

  const spreadContainerRef = useRef(null);
  const measurerRef = useRef(null);

  useEffect(() => {
    if (!spreadContainerRef.current) return;
    const measure = () => {
      const el = spreadContainerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setContainerSize({ w: Math.floor((r.width - 1) / 2), h: Math.floor(r.height) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(spreadContainerRef.current);
    return () => ro.disconnect();
  }, []);

  // Auto font size: fit ~28-32 lines in the available height
  const autoFontSize = useMemo(() => {
    if (containerSize.h === 0) return 18;
    const padding = 96; // 48px top + 48px bottom
    return Math.max(14, Math.min(24, Math.floor((containerSize.h - padding) / 48)));
  }, [containerSize.h]);

  // Max image height in pixels (40% of page height), used in both measurement and render
  const imgMaxH = useMemo(() => Math.max(200, Math.floor(containerSize.h * 0.4)), [containerSize.h]);

  const layoutKey = useMemo(() => {
    if (!containerSize.w || !containerSize.h) return null;
    return [
      'v1',
      'w' + containerSize.w,
      'h' + containerSize.h,
      'fs' + autoFontSize,
      'lh165',
      'img' + imgMaxH,
      'chapters' + chapters.length,
      'words' + words.length,
    ].join('-');
  }, [containerSize.w, containerSize.h, autoFontSize, imgMaxH, chapters.length, words.length]);

  const paginateChapter = useCallback((chapterIdx, windowStart, windowEnd) => {
    if (containerSize.w === 0 || containerSize.h === 0 || chapters.length === 0) return [];
    const m = measurerRef.current;
    if (!m) return [];

    m.style.width = containerSize.w + 'px';
    m.style.height = 'auto';
    m.style.fontSize = autoFontSize + 'px';
    const maxH = containerSize.h;

    // Helper: how many words fit given baseHTML already on the page
    const fitWords = (words, baseHTML) => {
      m.innerHTML = baseHTML + '<p style="margin:0 0 0.6em 0;">' + words.join(' ') + ' </p>';
      if (m.scrollHeight <= maxH) return words.length;
      let lo = 0, hi = words.length;
      while (lo + 1 < hi) {
        const mid = (lo + hi) >> 1;
        m.innerHTML = baseHTML + '<p style="margin:0 0 0.6em 0;">' + words.slice(0, mid).join(' ') + ' </p>';
        if (m.scrollHeight > maxH) hi = mid; else lo = mid;
      }
      return lo;
    };

    const contentItems = buildContentItems(chapterIdx, windowStart, windowEnd);
    const pages = [];
    let page = [];
    let html = '';

    const pushPage = () => { if (page.length > 0) { pages.push(page); page = []; html = ''; } };

    const chapterStart = chapterStarts[chapterIdx] ?? 0;

    // Chapter heading only belongs to the real first page of the chapter.
    if (chapters[chapterIdx]?.title && windowStart <= chapterStart) {
      const safe = chapters[chapterIdx].title.replace(/</g, '&lt;');
      html = '<div style="font-size:1.5em;font-weight:600;margin:0 0 0.8em 0;line-height:1.25;text-align:left">' + safe + '</div>';
      page.push({ type: 'heading', text: chapters[chapterIdx].title });
    }

    for (const item of contentItems) {
      if (item.type === 'image') {
        const imgH = '<div style="text-align:center;margin:0.8em 0"><div style="width:100%;height:' + imgMaxH + 'px"></div></div>';
        m.innerHTML = html + imgH;
        if (page.length > 0 && m.scrollHeight > maxH) pushPage();
        page.push({ type: 'image', dataUrl: item.dataUrl });
        html += imgH;
        continue;
      }

      // Paragraph, fill current page and overflow to new pages
      let from = 0;
      while (from < item.words.length) {
        const slice = item.words.slice(from);
        let fit = fitWords(slice, html);
        if (fit === 0 && page.length === 0) fit = 1;
        if (fit === 0) { pushPage(); continue; }
        const to = from + fit;
        const pH = '<p style="margin:0 0 0.6em 0;">' + item.words.slice(from, to).join(' ') + ' </p>';
        page.push({ type: 'paragraph', words: item.words, absStartWordIdx: item.absStartWordIdx, fromWord: from, toWord: to });
        html += pH;
        from = to;
        if (from < item.words.length) pushPage();
      }
    }
    if (page.length > 0) pages.push(page);
    return pages;
  }, [containerSize, autoFontSize, chapters, chapterStarts, buildContentItems, imgMaxH]);

  const pageWordRange = useCallback((pageItems, fallbackWord) => {
    let start = Infinity;
    let end = -Infinity;
    for (const item of pageItems || []) {
      if (item.type !== 'paragraph' && item.type !== 'partial') continue;
      start = Math.min(start, item.absStartWordIdx + item.fromWord);
      end = Math.max(end, item.absStartWordIdx + item.toWord);
    }
    if (!Number.isFinite(start) || !Number.isFinite(end)) return { start: fallbackWord, end: fallbackWord };
    return { start, end };
  }, []);

  useEffect(() => {
    if (!layoutKey || !measurerRef.current || containerSize.w === 0 || containerSize.h === 0) return;
    let cancelled = false;
    const activeChapter = chOf(currentIdxRef.current);
    initialScrollDone.current = false;
    fullModelAppliedRef.current = null;
    setPageModel(null);

    // Try cached pagination first
    const cached = loadPaginationCache(bookId, layoutKey);
    if (cached) {
      const restored = reconstructPageModel(cached, chapters, chapterStarts, words, buildContentItems);
      if (!cancelled && restored.pages.length > 0) {
        setPageModel(restored);
        return;
      }
    }

    const buildChapterEntries = (chapterIdx, basePage = 0) => {
      const chapterStart = chapterStarts[chapterIdx] ?? 0;
      const chapterEnd = chapterStarts[chapterIdx + 1] ?? words.length;
      const chapterPageItems = paginateChapter(chapterIdx, chapterStart, chapterEnd);
      return chapterPageItems.map((items, pageIdx) => {
        const range = pageWordRange(items, chapterStart);
        return { chapterIdx, pageIdx, globalPageIdx: basePage + pageIdx, items, startWord: range.start, endWord: range.end };
      });
    };

    const activeEntries = buildChapterEntries(activeChapter, 0);
    if (!cancelled) {
      setPageModel({
        layoutKey,
        complete: false,
        pages: activeEntries,
        chapterFirstPages: { [activeChapter]: 0 },
        activeChapter,
      });
    }

    const pages = [];
    const chapterFirstPages = [];
    let chapterIdx = 0;

    const buildNextChapter = () => {
      if (cancelled) return;
      chapterFirstPages[chapterIdx] = pages.length;
      pages.push(...buildChapterEntries(chapterIdx, pages.length));
      chapterIdx++;
      if (chapterIdx < chapters.length) {
        setTimeout(buildNextChapter, 0);
        return;
      }
      if (!cancelled) {
        const fullModel = { layoutKey, complete: true, pages, chapterFirstPages };
        setPageModel(fullModel);
        savePaginationCache(bookId, layoutKey, fullModel);
      }
    };

    setTimeout(buildNextChapter, 0);
    return () => { cancelled = true; };
  }, [layoutKey, containerSize.w, containerSize.h, chapters.length, chapterStarts, words.length, chOf, paginateChapter, pageWordRange, bookId, buildContentItems]);

  const pagesReady = !!pageModel && pageModel.layoutKey === layoutKey && pageModel.pages.length > 0;
  const fullPagesReady = pagesReady && pageModel.complete;
  const pages = pagesReady ? pageModel.pages : [];

  // Re-scroll when becoming visible or when pages become ready
  const prevVisibleRef = useRef(visible);
  useEffect(() => {
    const justBecameVisible = visible && !prevVisibleRef.current;
    prevVisibleRef.current = visible;
    if (!pagesReady) return;
    if (initialScrollDone.current && !justBecameVisible) return;
    let targetPage = 0;
    const wordIdx = currentIdxRef.current;
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].endWord > wordIdx) {
        targetPage = i;
        break;
      }
    }
    const targetEntry = pages[targetPage];
    if (targetEntry) {
      activePageIdentityRef.current = { chapterIdx: targetEntry.chapterIdx, pageIdx: targetEntry.pageIdx };
    }
    const nextSpread = Math.floor(targetPage / 2);
    spreadIdxRef.current = nextSpread;
    setSpreadIdx(nextSpread);
    initialScrollDone.current = true;
  }, [pagesReady, pages, visible]);

  useEffect(() => {
    spreadIdxRef.current = spreadIdx;
  }, [spreadIdx]);

  const leftPageIdx = spreadIdx * 2;
  const rightPageIdx = spreadIdx * 2 + 1;
  const leftEntry = pages[leftPageIdx];
  const rightEntry = pages[rightPageIdx];
  const leftPage = leftEntry?.items || [];
  const rightPage = rightEntry?.items || [];
  const displayChIdx = rightEntry?.pageIdx === 0
    ? rightEntry.chapterIdx
    : (leftEntry?.chapterIdx ?? rightEntry?.chapterIdx ?? chOf(currentIdx));
  const hasMorePages = pagesReady && leftPageIdx + 2 < pages.length;
  const prevDisabled = !pagesReady || spreadIdx === 0;

  useEffect(() => {
    if (!fullPagesReady || fullModelAppliedRef.current === layoutKey) return;
    const active = activePageIdentityRef.current;
    let targetPage = pages.findIndex(p => p.chapterIdx === active.chapterIdx && p.pageIdx === active.pageIdx);
    if (targetPage < 0) {
      targetPage = pages.findIndex(p => p.endWord > currentIdxRef.current);
    }
    if (targetPage < 0) targetPage = 0;
    const nextSpread = Math.floor(targetPage / 2);
    spreadIdxRef.current = nextSpread;
    setSpreadIdx(nextSpread);
    fullModelAppliedRef.current = layoutKey;
  }, [fullPagesReady, layoutKey, pages]);

  useEffect(() => {
    const activeEntry = leftEntry || rightEntry;
    if (activeEntry) {
      activePageIdentityRef.current = { chapterIdx: activeEntry.chapterIdx, pageIdx: activeEntry.pageIdx };
    }
  }, [leftEntry, rightEntry]);

  useEffect(() => {
    displayChIdxRef.current = displayChIdx;
  }, [displayChIdx]);

  const goPrev = useCallback(() => {
    if (spreadIdxRef.current <= 0) return;
    const nextSpread = spreadIdxRef.current - 1;
    spreadIdxRef.current = nextSpread;
    setSpreadIdx(nextSpread);
  }, []);

  const goNext = useCallback(() => {
    if (!pagesReady || spreadIdxRef.current * 2 + 2 >= pages.length) return;
    const nextSpread = spreadIdxRef.current + 1;
    spreadIdxRef.current = nextSpread;
    setSpreadIdx(nextSpread);
  }, [pagesReady, pages.length]);

  const goChapter = useCallback((dir) => {
    if (!fullPagesReady) return;
    const nextCh = Math.max(0, Math.min(chapters.length - 1, displayChIdxRef.current + dir));
    const firstPage = pageModel.chapterFirstPages[nextCh] ?? 0;
    const nextSpread = Math.floor(firstPage / 2);
    spreadIdxRef.current = nextSpread;
    displayChIdxRef.current = nextCh;
    setSpreadIdx(nextSpread);
  }, [fullPagesReady, chapters.length, pageModel]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const ctrl = e.ctrlKey || e.metaKey;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        ctrl ? goChapter(-1) : goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        ctrl ? goChapter(1) : goNext();
      } else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onClose, onEscape, goPrev, goNext, goChapter]);

  useEffect(() => { try { window.focus(); } catch(_) {} }, []);

  const pressTimer = useRef(null);
  const startPress = (absIdx) => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => {
      setLongPressIdx(absIdx);
      onBookmark(absIdx);
      setToast('Bookmarked, will resume here next time');
      setTimeout(() => setToast(null), 1800);
      pressTimer.current = null;
    }, 600);
  };
  const endPress = (absIdx) => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
      onPick(absIdx);
    }
  };
  const cancelPress = () => {
    if (pressTimer.current) { clearTimeout(pressTimer.current); pressTimer.current = null; }
  };

  const renderWord = (w, absIdx) => {
    const isCurrent = absIdx === currentIdx;
    const isBookmark = absIdx === longPressIdx;
    return (
      <React.Fragment key={absIdx}>
        <span
          onPointerDown={(e) => { e.preventDefault(); startPress(absIdx); }}
          onPointerUp={() => endPress(absIdx)}
          onPointerLeave={cancelPress}
          onPointerCancel={cancelPress}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            cursor: 'pointer',
            background: isBookmark ? theme.invertedBg : isCurrent ? theme.highlight : 'transparent',
            color: isBookmark ? theme.invertedInk : 'inherit',
            padding: (isBookmark || isCurrent) ? '2px 4px' : '2px 0',
            borderRadius: 2, transition: 'background 120ms',
            WebkitUserSelect: 'none', userSelect: 'none',
          }}
        >{w}</span>{' '}
      </React.Fragment>
    );
  };

  const PAGE_PADDING = '48px 56px';
  const PAGE_FONT = {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: autoFontSize, lineHeight: 1.65, textAlign: 'justify', hyphens: 'auto',
  };
  const pageStyle = {
    flex: 1, padding: PAGE_PADDING, ...PAGE_FONT,
    overflow: 'hidden', minWidth: 0, boxSizing: 'border-box',
  };

  const chapterTitle = chapters[displayChIdx]?.title || ('Chapter ' + (displayChIdx + 1));

  // Render a page from its content items
  const renderPage = (pageItems) => {
    if (!pageItems || pageItems.length === 0) return null;
    const elements = [];
    let paraCount = 0;
    for (let ii = 0; ii < pageItems.length; ii++) {
      const item = pageItems[ii];
      if (item.type === 'heading') {
        elements.push(
          <div key="ch-heading" style={{ fontSize: '1.5em', fontWeight: 600, marginBottom: '0.8em', lineHeight: 1.25, textAlign: 'left' }}>
            {item.text}
          </div>
        );
      } else if (item.type === 'image') {
        elements.push(
          <div key={'img' + ii} style={{ textAlign: 'center', margin: '0.8em 0' }}>
            <img src={item.dataUrl} alt="" style={{ maxWidth: '100%', maxHeight: imgMaxH, objectFit: 'contain', borderRadius: 2 }} />
          </div>
        );
      } else if (item.type === 'paragraph' || item.type === 'partial') {
        const indent = paraCount > 0 ? '1.5em' : 0;
        const wordSlice = item.words.slice(item.fromWord, item.toWord);
        elements.push(
          <p key={'p' + ii} style={{ margin: '0 0 0.6em 0', textIndent: indent }}>
            {wordSlice.map((w, wi) => renderWord(w, item.absStartWordIdx + item.fromWord + wi))}
          </p>
        );
        paraCount++;
      }
    }
    return elements;
  };

  const chapterNum = displayChIdx + 1;
  const spreadWordRange = useMemo(() => {
    const fallback = chapterStarts[displayChIdx] ?? 0;
    const leftRange = leftEntry ? { start: leftEntry.startWord, end: leftEntry.endWord } : null;
    const rightRange = rightEntry ? { start: rightEntry.startWord, end: rightEntry.endWord } : null;
    const start = Math.min(leftRange?.start ?? Infinity, rightRange?.start ?? Infinity);
    const end = Math.max(leftRange?.end ?? -Infinity, rightRange?.end ?? -Infinity);
    if (!Number.isFinite(start) || !Number.isFinite(end)) return { start: fallback, end: fallback };
    return { start, end };
  }, [leftEntry, rightEntry, chapterStarts, displayChIdx]);
  const spreadProgressWord = Math.max(0, Math.min(words.length, spreadWordRange.start));
  const chapterProgressPct = useMemo(() => {
    const start = chapterStarts[displayChIdx] ?? 0;
    const end = chapterStarts[displayChIdx + 1] ?? words.length;
    const span = Math.max(1, end - start);
    const visibleStart = Math.max(start, Math.min(end, spreadProgressWord));
    return Math.max(0, Math.min(1, (visibleStart - start) / span));
  }, [chapterStarts, displayChIdx, words.length, spreadProgressWord]);
  const spreadLabel = fullPagesReady
    ? ((leftPageIdx + 1) + '-' + Math.min(rightPageIdx + 1, pages.length) + ' / ' + pages.length)
    : pagesReady
    ? ('spread ' + (spreadIdx + 1) + ' / indexing')
    : 'paginating';

  return (
    <div onClick={e => e.stopPropagation()} style={{
      position: 'absolute', inset: 0, background: theme.bg, color: theme.ink,
      display: 'flex', flexDirection: 'column',
      zIndex: visible ? 20 : -1,
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: `0.5px solid ${theme.hairline}`, flexShrink: 0 }}>
        <button onClick={onClose} style={{ ...iconBtn(theme), width: 'auto', padding: '0 12px', display: 'flex', gap: 8 }}>
          {I.back(16)} <Mono size={10}>Read</Mono>
        </button>
        <Mono size={10} opacity={0.55} style={{ flex: 1, textAlign: 'center' }}>{chapterTitle}</Mono>
        <Mono size={10} opacity={0.55} style={{ width: 140, textAlign: 'right' }}>
          ch.{chapterNum}{'  '}{spreadLabel}
        </Mono>
      </div>

      <div ref={spreadContainerRef} style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative', minHeight: 0 }}>
        <div style={pageStyle}>{renderPage(leftPage)}</div>
        <div style={{ width: 1, background: theme.hairline, margin: '40px 0' }} />
        <div style={pageStyle}>{renderPage(rightPage)}</div>

        {!pagesReady && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
                Preparing page view
              </div>
              <Mono size={10} opacity={0.45}>Paginating current chapter</Mono>
              <div style={{ width: 160, height: 1, background: theme.hairline, margin: '18px auto 0', overflow: 'hidden' }}>
                <div style={{ width: 52, height: 1, background: theme.ink, animation: 'indeterminate 1100ms ease-in-out infinite' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={measurerRef} aria-hidden="true" style={{
          position: 'absolute', visibility: 'hidden', pointerEvents: 'none',
          top: 0, left: -99999, width: containerSize.w || '50%',
          padding: PAGE_PADDING, ...PAGE_FONT,
          boxSizing: 'border-box', whiteSpace: 'normal', wordBreak: 'normal',
        }} />

        <button aria-label="Previous page" onClick={goPrev}
          disabled={prevDisabled}
          style={navZone(theme, 'left', prevDisabled)}>{I.back(20)}</button>
        <button aria-label="Next page" onClick={goNext}
          disabled={!hasMorePages}
          style={navZone(theme, 'right', !hasMorePages)}>
          <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>{I.back(20)}</span>
        </button>
      </div>

      <div style={{ padding: '8px 24px 12px', borderTop: `0.5px solid ${theme.hairline}`, flexShrink: 0 }}>
        <div style={{ maxWidth: 980, margin: '0 auto 6px' }}>
          <ChapterTickProgress
            chapterWordCounts={chapters.map(c => c.wordCount)}
            currentChapter={displayChIdx}
            chapterPct={chapterProgressPct}
            color={theme.ink}
            expanded={false}
            totalWords={words.length}
            wordsRead={spreadProgressWord}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Mono size={10} opacity={0.5}>tap a word to read from there</Mono>
        </div>
      </div>

      {toast && (
        <div style={{
          position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          background: theme.invertedBg, color: theme.invertedInk,
          padding: '10px 18px', borderRadius: 22,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 0.8,
          zIndex: 30, animation: 'fadeUp 200ms ease-out',
        }}>{toast}</div>
      )}
    </div>
  );
}

function navZone(theme, side, disabled) {
  return {
    position: 'absolute', top: 0, bottom: 0, [side]: 0, width: 56,
    background: 'transparent', border: 'none', cursor: disabled ? 'default' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: theme.ink, opacity: disabled ? 0.15 : 0.4,
    transition: 'opacity 150ms',
  };
}

// -- Settings panel --
function SettingsPanel({ theme, settings, onSettings, onClose }) {
  const stop = (e) => e.stopPropagation();
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
      <div onClick={stop} style={{ width: 520, maxWidth: '90vw', maxHeight: '85vh', overflow: 'auto', background: theme.bg, border: `0.75px solid ${theme.ink}`, padding: 28, color: theme.ink }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
          <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 24, fontWeight: 600 }}>Settings</div>
          <button onClick={onClose} style={iconBtn(theme)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <Mono size={10} opacity={0.45} style={{ display: 'block', marginBottom: 12 }}>Reading</Mono>

        <SetRow theme={theme} label="Font" sub={FONTS.find(f => f.id === settings.font)?.label}>
          <ToggleGroup
            options={FONTS.map(f => ({ value: f.id, label: f.label }))}
            value={settings.font}
            onChange={(v) => onSettings({ font: v })}
            theme={theme}
          />
        </SetRow>

        <SetRow theme={theme} label="Font size" sub={settings.fontSize + ' px'}>
          <Slider value={settings.fontSize} min={48} max={220} step={4} theme={theme} onChange={(v) => onSettings({ fontSize: v })} />
        </SetRow>

        <SetRow theme={theme} label="Bionic bold">
          <Toggle on={settings.bionicBold} onChange={(v) => onSettings({ bionicBold: v })} theme={theme} />
        </SetRow>

        {settings.bionicBold && (
          <SetRow theme={theme} label="Bionic ratio" sub={'bold first ' + Math.round(settings.bionicRatio * 100) + '%'}>
            <Slider value={settings.bionicRatio * 100} min={20} max={60} step={5} theme={theme} onChange={(v) => onSettings({ bionicRatio: v / 100 })} />
          </SetRow>
        )}

        <SetRow theme={theme} label="Focus marks">
          <Toggle on={settings.focusMarks} onChange={(v) => onSettings({ focusMarks: v })} theme={theme} />
        </SetRow>

        <SetRow theme={theme} label="Word mode">
          <ToggleGroup
            options={[{ value: false, label: 'Single' }, { value: true, label: 'Multi' }]}
            value={settings.multiWord}
            onChange={(v) => onSettings({ multiWord: v })}
            theme={theme}
          />
        </SetRow>

        <div style={{ height: 20 }} />
        <Mono size={10} opacity={0.45} style={{ display: 'block', marginBottom: 12 }}>Speed</Mono>

        <SetRow theme={theme} label="Default WPM" sub={settings.wpm + ' wpm'}>
          <Slider value={settings.wpm} min={100} max={900} step={10} theme={theme} onChange={(v) => onSettings({ wpm: v })} />
        </SetRow>

        <SetRow theme={theme} label="Comma pause" sub={settings.commaMult.toFixed(1) + 'x'}>
          <Slider value={settings.commaMult * 10} min={10} max={30} step={1} theme={theme} onChange={(v) => onSettings({ commaMult: v / 10 })} />
        </SetRow>

        <SetRow theme={theme} label="Full stop pause" sub={settings.fullstopMult.toFixed(1) + 'x'}>
          <Slider value={settings.fullstopMult * 10} min={10} max={40} step={1} theme={theme} onChange={(v) => onSettings({ fullstopMult: v / 10 })} />
        </SetRow>

        <SetRow theme={theme} label="Paragraph pause" sub={'+' + (settings.paragraphPauseMult ?? DEFAULT_SETTINGS.paragraphPauseMult).toFixed(1) + 'x before break'}>
          <Slider value={(settings.paragraphPauseMult ?? DEFAULT_SETTINGS.paragraphPauseMult) * 10} min={0} max={30} step={1} theme={theme} onChange={(v) => onSettings({ paragraphPauseMult: v / 10 })} />
        </SetRow>

        <SetRow theme={theme} label="Semicolon pause" sub={settings.semicolonMult.toFixed(1) + 'x'}>
          <Slider value={settings.semicolonMult * 10} min={10} max={25} step={1} theme={theme} onChange={(v) => onSettings({ semicolonMult: v / 10 })} />
        </SetRow>

        <SetRow theme={theme} label="Ellipsis pause" sub={settings.ellipsisMult.toFixed(1) + 'x'}>
          <Slider value={settings.ellipsisMult * 10} min={10} max={40} step={1} theme={theme} onChange={(v) => onSettings({ ellipsisMult: v / 10 })} />
        </SetRow>

        <SetRow theme={theme} label="Long word threshold" sub={'after ' + (settings.longWordThreshold ?? 9) + ' characters'}>
          <Slider value={settings.longWordThreshold ?? 9} min={5} max={15} step={1} theme={theme} onChange={(v) => onSettings({ longWordThreshold: v })} />
        </SetRow>

        <SetRow theme={theme} label="Long word delay" sub={'+' + (settings.longWordMs ?? 10) + 'ms per extra char'}>
          <Slider value={settings.longWordMs ?? 10} min={0} max={30} step={1} theme={theme} onChange={(v) => onSettings({ longWordMs: v })} />
        </SetRow>

        <Mono size={10} opacity={0.45} style={{ display: 'block', marginTop: 24, marginBottom: 12 }}>Integrations</Mono>

        <SetRow theme={theme} label="OpenAI API key" sub="Auto-generates paste session titles">
          <ApiKeyInput theme={theme} />
        </SetRow>
      </div>
    </div>
  );
}

const OPENAI_KEY_STORAGE = 'fentiread-openai-key';

function ApiKeyInput({ theme }) {
  const [key, setKey] = useState(() => localStorage.getItem(OPENAI_KEY_STORAGE) || '');
  const [show, setShow] = useState(false);
  const save = (v) => {
    setKey(v);
    if (v.trim()) localStorage.setItem(OPENAI_KEY_STORAGE, v.trim());
    else localStorage.removeItem(OPENAI_KEY_STORAGE);
  };
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <input
        type={show ? 'text' : 'password'}
        value={key}
        onChange={e => save(e.target.value)}
        placeholder="sk-..."
        style={{
          flex: 1, minWidth: 0, padding: '6px 10px', border: `0.75px solid ${theme.hairline}`,
          borderRadius: 4, background: theme.bg, color: theme.ink, fontSize: 12,
          fontFamily: '"JetBrains Mono", monospace', outline: 'none',
        }}
      />
      <button onClick={() => setShow(s => !s)} style={{ ...iconBtn(theme), width: 28, height: 28, fontSize: 10 }}>
        <Mono size={8}>{show ? 'Hide' : 'Show'}</Mono>
      </button>
    </div>
  );
}

async function generatePasteTitle(text) {
  const key = localStorage.getItem(OPENAI_KEY_STORAGE);
  if (!key) return null;
  try {
    const snippet = text.slice(0, 1000);
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 20,
        messages: [
          { role: 'system', content: 'Generate a short title (3-5 words) for this pasted text. Return only the title, no quotes or punctuation.' },
          { role: 'user', content: snippet },
        ],
      }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (_) {
    return null;
  }
}

function SetRow({ theme, label, sub, children }) {
  return (
    <div style={{ padding: '14px 0', borderBottom: `0.5px solid ${theme.rowDiv}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ minWidth: 120 }}>
        <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 15, fontWeight: 500 }}>{label}</div>
        {sub && <Mono size={10} opacity={0.5} style={{ marginTop: 2, display: 'block' }}>{sub}</Mono>}
      </div>
      <div style={{ flex: 1, minWidth: 120 }}>{children}</div>
    </div>
  );
}

// -- Help modal --
function HelpModal({ theme, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' || e.key === '?') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 20 }}>
      <Mono size={10} opacity={0.45} style={{ display: 'block', marginBottom: 8 }}>{title}</Mono>
      {children}
    </div>
  );

  const Key = ({ k, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' }}>
      <div style={{
        minWidth: 80, display: 'flex', gap: 4, justifyContent: 'flex-end',
      }}>
        {k.split('+').map((part, i) => (
          <span key={i} style={{
            display: 'inline-block', padding: '2px 7px', borderRadius: 4,
            border: `1px solid ${theme.hairline}`, background: theme.bg,
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10, lineHeight: 1.6,
          }}>{part}</span>
        ))}
      </div>
      <span style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 13, opacity: 0.75 }}>{label}</span>
    </div>
  );

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 480, maxWidth: '90vw', maxHeight: '85vh', overflow: 'auto', background: theme.bg, border: `0.75px solid ${theme.ink}`, padding: 28, color: theme.ink }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
          <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 24, fontWeight: 600 }}>Keyboard shortcuts</div>
          <button onClick={onClose} style={iconBtn(theme)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <Section title="Reader">
          <Key k="Space" label="Play / pause" />
          <Key k="Up" label="Speed up (+20 wpm)" />
          <Key k="Down" label="Slow down (-20 wpm)" />
          <Key k="Left" label="Previous word" />
          <Key k="Right" label="Next word" />
          <Key k="Ctrl+Left" label="Previous chapter" />
          <Key k="Ctrl+Right" label="Next chapter" />
          <Key k="," label="Step back one token" />
          <Key k="." label="Step forward one token" />
          <Key k="P" label="Open page view" />
          <Key k="S" label="Toggle settings" />
          <Key k="Esc" label="Back to library" />
        </Section>

        <Section title="Page view">
          <Key k="Left" label="Previous page" />
          <Key k="Right" label="Next page" />
          <Key k="Ctrl+Left" label="Previous chapter" />
          <Key k="Ctrl+Right" label="Next chapter" />
          <Key k="Esc" label="Back to reader" />
        </Section>

        <Section title="Library">
          <Key k="Ctrl+V" label="Paste text into session" />
          <Key k="N" label="New paste session" />
          <Key k="L" label="Back to library (from reader)" />
          <Key k="?" label="Toggle this help" />
        </Section>
      </div>
    </div>
  );
}

// -- Pastes View --
function EditableSessionTitle({ theme, value, onSave, style, inputStyle, title = 'Rename session' }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!editing) setDraft(value || '');
  }, [value, editing]);

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [editing]);

  const commit = useCallback(() => {
    const next = draft.trim() || 'New paste';
    setEditing(false);
    if (next !== value) onSave(next);
  }, [draft, value, onSave]);

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => {
          e.stopPropagation();
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') {
            setDraft(value || '');
            setEditing(false);
          }
        }}
        style={{
          ...inputStyle,
          background: 'transparent',
          color: theme.ink,
          border: `0.75px solid ${theme.hairline}`,
          outline: 'none',
          padding: '2px 4px',
        }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={e => {
        e.stopPropagation();
        setEditing(true);
      }}
      title={title}
      style={{
        ...style,
        border: 'none',
        background: 'transparent',
        color: theme.ink,
        padding: 0,
        cursor: 'text',
        textAlign: 'left',
      }}
    >
      {value}
    </button>
  );
}

function PasteSidebar({ theme, sessions, activeId, onSelect, onNew, onRename, onSettings, onDelete, onHelp }) {
  const sidebarBg = theme.bg === '#fff' ? '#fafaf7' : '#0d0d0d';
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const filtered = sessions.filter(s => s.title.toLowerCase().includes(query.trim().toLowerCase()));

  if (collapsed) {
    return (
      <div style={{ width: 48, flexShrink: 0, borderRight: `0.75px solid ${theme.hairline}`, background: sidebarBg, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', padding: '16px 0', gap: 6 }}>
        <button onClick={() => setCollapsed(false)} title="Expand pastes" style={{ ...iconBtn(theme), width: 32, height: 32 }}>
          {I.clipboard(16)}
        </button>
        <button onClick={onNew} title="New paste" style={{ ...iconBtn(theme), width: 32, height: 32 }}>
          {I.plus(14)}
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={onHelp} title="Keyboard shortcuts" style={{ ...iconBtn(theme), width: 32, height: 32 }}>
          {I.help(16)}
        </button>
        <button onClick={onSettings} title="Settings" style={{ ...iconBtn(theme), width: 32, height: 32 }}>
          {I.gear(16)}
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: 280, flexShrink: 0, borderRight: `0.75px solid ${theme.hairline}`, background: sidebarBg, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '22px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Mono size={8} opacity={0.42} style={{ flex: 1 }}>FentiRead</Mono>
        <button onClick={() => setCollapsed(true)} title="Collapse sidebar" style={{ ...iconBtn(theme), width: 24, height: 24 }}>
          {I.back(14)}
        </button>
      </div>
      <div style={{ padding: '0 16px 12px' }}>
        <button onClick={onNew} style={{ ...primaryBtn(theme), width: '100%', justifyContent: 'center', padding: '11px 16px', fontSize: 9, borderRadius: 18 }}>
          {I.plus(12)} <span style={{ marginLeft: 8 }}>New paste</span>
        </button>
      </div>

      <div style={{ padding: '0 16px 14px' }}>
        <div style={{ height: 28, border: `0.75px solid ${theme.hairline}`, borderRadius: 5, display: 'flex', alignItems: 'center', padding: '0 9px', gap: 8, background: theme.bg }}>
          <span style={{ width: 9, height: 9, border: `1px solid ${theme.dim}`, borderRadius: 9, display: 'inline-block', position: 'relative', opacity: 0.7 }}>
            <span style={{ position: 'absolute', width: 4, height: 1, background: theme.dim, right: -3, bottom: -1, transform: 'rotate(45deg)' }} />
          </span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pastes"
            style={{
              flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', color: theme.ink,
              fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 12,
            }}
          />
          <Mono size={7} opacity={0.35}>Ctrl K</Mono>
        </div>
      </div>

      <div style={{ padding: '0 16px 7px' }}>
        <Mono size={9} opacity={0.4}>Recents</Mono>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 8px 12px' }}>
        {filtered.length === 0 && (
          <div style={{ padding: '24px 8px', textAlign: 'center' }}>
            <Mono size={9} opacity={0.35}>{sessions.length ? 'No matches' : 'No paste sessions yet'}</Mono>
          </div>
        )}
        {filtered.map(s => {
          const isActive = s.id === activeId;
          return (
            <div key={s.id} onClick={() => onSelect(s.id)} style={{
              padding: '9px 10px', borderRadius: 5, cursor: 'pointer', marginBottom: 3,
              display: 'flex', alignItems: 'center', gap: 6,
              background: isActive ? (theme.bg === '#fff' ? '#e9e8e4' : 'rgba(255,255,255,0.08)') : 'transparent',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 13, fontWeight: 600, lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {s.title}
                </div>
                <Mono size={8} opacity={0.45} style={{ marginTop: 4, display: 'block' }}>
                  {s.pasteIds.length} {s.pasteIds.length === 1 ? 'paste' : 'pastes'} · {relativeTime(s.updatedAt)}
                </Mono>
              </div>
              <button onClick={(e) => { e.stopPropagation(); onDelete(s.id); }} title="Delete session" style={{ ...iconBtn(theme), width: 22, height: 22, flexShrink: 0, opacity: 0.4 }}>
                {I.trash(12)}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: `0.75px solid ${theme.hairline}`, padding: '13px 16px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <button onClick={onHelp} title="Keyboard shortcuts" style={{ ...iconBtn(theme), width: 32, height: 32 }}>
          {I.help(16)}
        </button>
        <button onClick={onSettings} title="Settings" style={{ ...iconBtn(theme), width: 32, height: 32 }}>
          {I.gear(16)}
        </button>
      </div>
    </div>
  );
}

function PasteComposer({ theme }) {
  return (
    <div style={{ borderTop: `0.75px solid ${theme.hairline}`, padding: '12px 24px 14px', background: theme.bg, flexShrink: 0 }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <div style={{ border: `0.75px solid ${theme.ink}`, borderRadius: 10, padding: '13px 15px', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 13.5, color: theme.ink }}>Press Ctrl+V to paste text into this session</div>
          <Mono size={8} opacity={0.45} style={{ flexShrink: 0 }}>Clipboard only</Mono>
        </div>
      </div>
    </div>
  );
}

function EmptyChatHero({ theme }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 430, paddingBottom: 24 }}>
        <div style={{ width: 50, height: 50, borderRadius: 25, border: `1.25px solid ${theme.dim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: theme.ink }}>
          {I.clipboard(22)}
        </div>
        <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 25, fontWeight: 600, color: theme.ink }}>
          Paste anything to read
        </div>
        <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 14, opacity: 0.55, marginTop: 14, lineHeight: 1.5, color: theme.ink }}>
          Each session keeps related pastes together. Add more in this chat to keep context, or start a new one for a fresh topic.
        </div>
      </div>
    </div>
  );
}

function pasteToReaderBook(paste, session) {
  const words = getPasteWords(paste);
  const text = getPasteReaderText(paste);
  const images = paste.images || (paste.contentType === 'markdown' && window.FRStore?.markdownToReaderContent ? window.FRStore.markdownToReaderContent(paste.rawText || '').images : []);
  const title = session?.title || 'Pasted text';
  return {
    id: 'paste:' + paste.id,
    format: 'PASTE',
    title,
    author: 'Pasted text',
    chapters: [{
      id: 'paste',
      title: null,
      text,
      images,
      wordCount: words.length,
    }],
    totalWords: words.length,
    cover: null,
    addedAt: paste.createdAt,
    progress: { wordIndex: Math.min(paste.readIdx || 0, Math.max(0, words.length - 1)) },
  };
}

function pickReadablePasteId(pastes) {
  return (pastes.find(p => !p.readAt && p.readIdx > 0) || pastes.find(p => !p.readAt) || pastes[0] || null)?.id || null;
}

function getPasteReadableText(paste) {
  if (paste?.plainText) return paste.plainText;
  if (paste?.contentType === 'markdown' && window.FRStore?.markdownToPlainText) {
    return window.FRStore.markdownToPlainText(paste.rawText || '');
  }
  return paste?.rawText || '';
}

function getPasteReaderText(paste) {
  if (paste?.readerText) return paste.readerText;
  if (paste?.contentType === 'markdown' && window.FRStore?.markdownToReaderContent) {
    return window.FRStore.markdownToReaderContent(paste.rawText || '').readerText;
  }
  return getPasteReadableText(paste);
}

function getPasteWords(paste) {
  if (paste?.contentType === 'markdown') return getPasteReaderText(paste).trim().split(/\s+/).filter(Boolean);
  if (paste?.words?.length) return paste.words;
  return getPasteReaderText(paste).trim().split(/\s+/).filter(Boolean);
}

function trimText(text, max) {
  return text.length > max ? text.slice(0, max).trimEnd() + '...' : text;
}

function renderInlineMarkdown(text, keyPrefix = 'md') {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let idx = 0;
  for (const match of text.matchAll(re)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**') || token.startsWith('__')) {
      parts.push(<strong key={`${keyPrefix}-b-${idx++}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      parts.push(<code key={`${keyPrefix}-c-${idx++}`}>{token.slice(1, -1)}</code>);
    } else {
      const label = token.match(/^\[([^\]]+)\]/)?.[1] || token;
      parts.push(<span key={`${keyPrefix}-l-${idx++}`}>{label}</span>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function MarkdownPreview({ text, theme, maxLines = 14 }) {
  const lines = (text || '').replace(/\r\n?/g, '\n').split('\n');
  const nodes = [];
  let shown = 0;
  let inFence = false;

  for (let i = 0; i < lines.length && shown < maxLines; i++) {
    let line = lines[i];
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    if (!line.trim()) {
      nodes.push(<div key={`gap-${i}`} style={{ height: 7 }} />);
      continue;
    }
    if (/^\s{0,3}---+\s*$/.test(line)) {
      nodes.push(<div key={`hr-${i}`} style={{ borderTop: `0.75px solid ${theme.hairline}`, margin: '10px 0' }} />);
      shown++;
      continue;
    }
    if (/^\s*!\[[^\]]*\]\([^)]+\)\s*$/.test(line)) {
      nodes.push(<Mono key={`img-${i}`} size={8} opacity={0.45} style={{ display: 'block', margin: '6px 0' }}>[Image]</Mono>);
      shown++;
      continue;
    }
    const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (heading) {
      nodes.push(<div key={`h-${i}`} style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: heading[1].length <= 2 ? 16 : 14, fontWeight: 700, margin: '9px 0 4px' }}>{renderInlineMarkdown(heading[2], `h-${i}`)}</div>);
      shown++;
      continue;
    }
    const bullet = line.match(/^\s{0,3}([-*+]|\d+[.)])\s+(.+)$/);
    if (bullet) {
      nodes.push(<div key={`li-${i}`} style={{ display: 'flex', gap: 8, margin: '3px 0' }}><span style={{ opacity: 0.55 }}>{/^\d/.test(bullet[1]) ? bullet[1] : '*'}</span><span>{renderInlineMarkdown(bullet[2], `li-${i}`)}</span></div>);
      shown++;
      continue;
    }
    nodes.push(<p key={`p-${i}`} style={{ margin: '0 0 7px' }}>{renderInlineMarkdown(line.trim(), `p-${i}`)}</p>);
    shown++;
  }

  return <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 13.5, lineHeight: 1.55, color: theme.ink }}>{nodes}</div>;
}

function PasteChatCard({ theme, paste, index, onRead, onDelete, highlighted }) {
  const cardRef = useRef(null);
  const accent = theme.bg === '#fff' ? '#c96442' : '#d97759';
  const words = getPasteWords(paste);
  const readableText = getPasteReadableText(paste);
  const pct = words.length ? Math.round((paste.readIdx / words.length) * 100) : 0;
  const isRead = !!paste.readAt;
  const isInProgress = !isRead && paste.readIdx > 0;
  const preview = trimText(readableText, 280);
  const readMins = Math.max(1, Math.round(words.length / 300));
  const status = isRead ? 'Read' : isInProgress ? `${pct}%` : 'Queued';

  useEffect(() => {
    if (!highlighted) return;
    cardRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [highlighted]);

  return (
    <div ref={cardRef} style={{
      border: `0.75px solid ${highlighted ? accent : isInProgress ? accent : theme.hairline}`,
      boxShadow: highlighted ? `0 0 0 1px ${accent}` : 'none',
      borderRadius: 6,
      padding: '12px 14px 10px',
      opacity: isRead ? 0.62 : 1,
      background: theme.bg,
      transition: 'border-color 180ms, opacity 180ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isRead ? theme.ink : 'transparent',
            color: isRead ? theme.bg : theme.ink,
            border: isRead ? 'none' : `1px solid ${theme.dim}`,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 9,
          }}>
            {isRead ? I.check(11) : index + 1}
          </div>
          <Mono size={8} opacity={0.45}>
            {relativeTime(paste.createdAt)} - pasted text
          </Mono>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Mono size={8} opacity={0.45}>{words.length}w - ~{readMins}m</Mono>
          <button
            type="button"
            onClick={() => onDelete?.(paste)}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              border: `1px solid ${theme.hairline}`,
              background: theme.bg,
              color: theme.dim,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Delete paste"
            title="Delete paste"
          >
            {I.trash(10)}
          </button>
          <button
            type="button"
            onClick={() => onRead?.(paste)}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              border: `1px solid ${theme.dim}`,
              background: theme.bg,
              color: theme.ink,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Read paste"
          >
            {I.play(10)}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        {paste.contentType === 'markdown'
          ? <MarkdownPreview text={paste.rawText} theme={theme} maxLines={12} />
          : <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 13.5, lineHeight: 1.55, color: theme.ink }}>{preview}</div>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 2, background: theme.hairline, overflow: 'hidden' }}>
          <div style={{
            width: `${isRead ? 100 : pct}%`,
            height: '100%',
            background: isRead ? theme.ink : isInProgress ? accent : 'transparent',
            transition: 'width 250ms',
          }} />
        </div>
        <Mono size={8} opacity={0.5}>{status}</Mono>
      </div>
    </div>
  );
}

function PasteChatPane({ theme, session, pastes, onReadPaste, onDeletePaste, onRenameSession, highlightedPasteId }) {
  const totalWords = pastes.reduce((s, p) => s + p.words.length, 0);
  const minutes = Math.max(1, Math.round(totalWords / 300));
  const isEmpty = pastes.length === 0;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '22px 28px 16px', borderBottom: `0.75px solid ${theme.hairline}`, flexShrink: 0 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <Mono size={8} opacity={0.42}>Paste session - {relativeTime(session.createdAt)}</Mono>
            <EditableSessionTitle
              theme={theme}
              value={session.title}
              onSave={(title) => onRenameSession(session.id, title)}
              style={{ display: 'block', fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 22, fontWeight: 600, marginTop: 6 }}
              inputStyle={{ display: 'block', fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 22, fontWeight: 600, marginTop: 6, minWidth: 260 }}
            />
            {!isEmpty && (
              <Mono size={8} opacity={0.45} style={{ marginTop: 7, display: 'block' }}>
                {pastes.length} {pastes.length === 1 ? 'paste' : 'pastes'} - {totalWords} words - ~{minutes} min total
              </Mono>
            )}
          </div>
          <button type="button" style={{ border: 'none', background: 'transparent', color: theme.dim, padding: 4, cursor: 'pointer', fontSize: 18, lineHeight: 1 }} aria-label="Session options">
            ...
          </button>
        </div>
      </div>

      {isEmpty ? (
        <EmptyChatHero theme={theme} />
      ) : (
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px 22px' }}>
          <div style={{ maxWidth: 620, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pastes.map((paste, i) => (
              <PasteChatCard key={paste.id} theme={theme} paste={paste} index={i} onRead={onReadPaste} onDelete={onDeletePaste} highlighted={paste.id === highlightedPasteId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PasteDeckSessionList({ theme, sessions, activeSessionId, onSelectSession, onNewSession, onRenameSession }) {
  return (
    <aside style={{ width: 224, flexShrink: 0, borderRight: `0.75px solid ${theme.hairline}`, padding: '28px 12px', overflow: 'auto', background: theme.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: '0 0 18px 2px' }}>
        <Mono size={8} opacity={0.5}>Sessions</Mono>
        <button
          type="button"
          onClick={onNewSession}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            border: `0.75px solid ${theme.hairline}`,
            background: theme.bg,
            color: theme.ink,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="New session"
          title="New session"
        >
          {I.plus(12)}
        </button>
      </div>
      {sessions.map(session => {
        const isActive = session.id === activeSessionId;
        return (
          <button
            key={session.id}
            type="button"
            onClick={() => onSelectSession(session.id)}
            style={{
              width: '100%',
              border: 'none',
              borderLeft: isActive ? `2px solid ${theme.ink}` : '2px solid transparent',
              background: isActive ? (theme.bg === '#fff' ? '#efeee9' : 'rgba(255,255,255,0.08)') : 'transparent',
              color: theme.ink,
              textAlign: 'left',
              padding: '9px 10px',
              marginBottom: 4,
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            <EditableSessionTitle
              theme={theme}
              value={session.title}
              onSave={(title) => onRenameSession(session.id, title)}
              style={{ display: 'block', width: '100%', fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              inputStyle={{ width: '100%', fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 13, fontWeight: 600 }}
            />
            <Mono size={8} opacity={0.45} style={{ display: 'block', marginTop: 3 }}>{relativeTime(session.updatedAt)}</Mono>
          </button>
        );
      })}
    </aside>
  );
}

function PasteDeckQueue({ theme, pastes, activePasteId, onSelectPaste, onDeletePaste }) {
  return (
    <aside style={{ width: 260, flexShrink: 0, borderLeft: `0.75px solid ${theme.hairline}`, padding: '28px 14px', overflow: 'auto', background: theme.bg }}>
      <Mono size={8} opacity={0.5} style={{ display: 'block', marginBottom: 18 }}>Pastes in session</Mono>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {pastes.map((paste, i) => {
          const words = getPasteWords(paste);
          const readableText = getPasteReadableText(paste);
          const pct = words.length ? Math.round((paste.readIdx / words.length) * 100) : 0;
          const isRead = !!paste.readAt;
          const isActive = paste.id === activePasteId;
          const label = isRead ? 'Read' : paste.readIdx > 0 ? `${pct}%` : isActive ? `${pct}%` : 'Queued';
          const preview = trimText(readableText, 120);
          return (
            <div
              key={paste.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectPaste(paste.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPaste(paste.id);
                }
              }}
              style={{
                border: `0.75px solid ${isActive ? theme.ink : theme.hairline}`,
                borderLeft: `3px solid ${isActive ? theme.ink : 'transparent'}`,
                borderRadius: 6,
                background: isActive ? (theme.bg === '#fff' ? '#faf9f5' : 'rgba(255,255,255,0.05)') : theme.bg,
                color: theme.ink,
                textAlign: 'left',
                padding: '10px 11px',
                cursor: 'pointer',
                opacity: isRead && !isActive ? 0.65 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                <Mono size={8} opacity={0.55}>{String(i + 1).padStart(2, '0')} - {words.length}w</Mono>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Mono size={8} opacity={0.55}>{label}</Mono>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePaste?.(paste);
                    }}
                    style={{ border: 'none', background: 'transparent', color: theme.dim, padding: 2, cursor: 'pointer', display: 'flex' }}
                    aria-label="Delete paste"
                    title="Delete paste"
                  >
                    {I.trash(10)}
                  </button>
                </div>
              </div>
              <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 12.5, lineHeight: 1.45, color: theme.ink }}>
                {preview}
              </div>
              <div style={{ height: 2, background: theme.hairline, marginTop: 9, overflow: 'hidden' }}>
                <div style={{ width: `${isRead ? 100 : pct}%`, height: '100%', background: theme.ink }} />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function PasteReaderDeck({ theme, sessions, session, pastes, activePaste, settings, onSettings, onProgressChange, onSelectSession, onNewSession, onRenameSession, onSelectPaste, onPasteMore, onDeletePaste, onEndSession }) {
  const activeIndex = pastes.findIndex(p => p.id === activePaste.id);
  const book = pasteToReaderBook(activePaste, session);

  return (
    <div style={{ height: '100%', display: 'flex', background: theme.bg, color: theme.ink, overflow: 'hidden' }}>
      <PasteDeckSessionList theme={theme} sessions={sessions} activeSessionId={session.id} onSelectSession={onSelectSession} onNewSession={onNewSession} onRenameSession={onRenameSession} />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', borderRight: `0 solid ${theme.hairline}` }}>
        <div style={{ height: 92, flexShrink: 0, borderBottom: `0.75px solid ${theme.hairline}`, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ minWidth: 0 }}>
            <Mono size={8} opacity={0.48}>Now reading - paste {String(activeIndex + 1).padStart(2, '0')} of {String(pastes.length).padStart(2, '0')}</Mono>
            <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 18, fontWeight: 600, marginTop: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {session.title}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Mono size={8} opacity={0.45}>Press Ctrl+V to add paste</Mono>
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <Reader
            theme={theme}
            book={book}
            onClose={onEndSession}
            settings={settings}
            onSettings={onSettings}
            onProgressChange={onProgressChange}
            escapeToClose={true}
            onEscapeClose={onPasteMore}
            showTopChrome={false}
          />
        </div>
      </main>
      <PasteDeckQueue theme={theme} pastes={pastes} activePasteId={activePaste.id} onSelectPaste={onSelectPaste} onDeletePaste={onDeletePaste} />
    </div>
  );
}

// -- Top bar --
function TopBar({ theme, dark, setDark, title }) {
  return (
    <div style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: `0.75px solid ${theme.hairline}`, background: theme.bg, color: theme.ink, flexShrink: 0 }}>
      <div style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 16, fontWeight: 600, letterSpacing: -0.3 }}>FentiRead</div>
      {title && <div style={{ marginLeft: 16, opacity: 0.55, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1.3, textTransform: 'uppercase' }}>- {title}</div>}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
        <button onClick={() => setDark(!dark)} style={{ ...iconBtn(theme), width: 32, height: 32 }}>{dark ? I.sun(16) : I.moon(16)}</button>
      </div>
    </div>
  );
}

// -- App --
function App() {
  const [books, setBooks] = useState([]);
  const [openBookId, setOpenBookId] = useState(null);
  const [dark, setDark] = useState(() => {
    const cached = readCachedAppSettings();
    return cached?.dark ?? false;
  });
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [pasteSessions, setPasteSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [activePastes, setActivePastes] = useState([]);
  const [activePasteId, setActivePasteId] = useState(null);
  const [showAppSettings, setShowAppSettings] = useState(false);
  const [showAppHelp, setShowAppHelp] = useState(false);
  const [highlightedPasteId, setHighlightedPasteId] = useState(null);
  const supported = !!window.showDirectoryPicker;
  const theme = useTheme(dark);

  useEffect(() => { (async () => {
    try {
      // Show cached books immediately
      const list = await FRStore.dbAll('books');
      list.sort((a, b) => (b.lastReadAt || b.addedAt || 0) - (a.lastReadAt || a.addedAt || 0));
      setBooks(list);
      const s = await FRStore.dbGet('settings', 'app');
      if (s) {
        setSettings(prev => ({ ...prev, ...s.value }));
        if (s.value.dark != null) setDark(!!s.value.dark);
      }
    } catch (e) { console.error(e); }
    // Scan for new books in background (after UI is visible)
    setTimeout(async () => {
      try {
        const result = await FRStore.autoScanLibrary();
        if (result && result.added > 0) {
          const updated = await FRStore.dbAll('books');
          updated.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
          setBooks(updated);
        }
      } catch (_) {}
    }, 50);
  })(); }, []);

  // Pre-tokenize books in background so opening is instant
  useEffect(() => {
    if (!books.length) return;
    let i = 0;
    const next = () => {
      if (i >= books.length) return;
      const b = books[i++];
      if (b.chapters && !_tokenCache.has(b.id)) {
        cachedTokenize(b.id, b.chapters);
        cachedFlatWords(b.id, b.chapters);
      }
      setTimeout(next, 0);
    };
    setTimeout(next, 100);
  }, [books]);

  useEffect(() => {
    const combined = { ...settings, dark };
    cacheAppSettings(combined);
    FRStore.dbPut('settings', { key: 'app', value: combined }).catch(() => {});
  }, [settings, dark]);

  const refresh = useCallback(async () => {
    // Auto-scan saved library folder for new books
    try { await FRStore.autoScanLibrary(); } catch (e) { /* silent */ }
    const list = await FRStore.dbAll('books');
    list.sort((a, b) => (b.lastReadAt || b.addedAt || 0) - (a.lastReadAt || a.addedAt || 0));
    setBooks(list);
  }, []);

  const refreshPasteSessions = useCallback(async () => {
    const list = await FRStore.listPasteSessions();
    setPasteSessions(list);
    return list;
  }, []);

  useEffect(() => {
    refreshPasteSessions().catch(console.error);
  }, [refreshPasteSessions]);

  useEffect(() => {
    if (!activeSessionId) { setActivePastes([]); return; }
    FRStore.getPastesBySession(activeSessionId).then(setActivePastes).catch(console.error);
  }, [activeSessionId]);

  // Clean up empty sessions when navigating away
  const cleanupEmptySession = useCallback(async (sessionId) => {
    if (!sessionId) return;
    try {
      const pastes = await FRStore.getPastesBySession(sessionId);
      if (pastes.length === 0) await FRStore.deletePasteSession(sessionId);
    } catch (_) {}
  }, []);

  const handleNewPasteSession = useCallback(async () => {
    const prevId = activeSessionId;
    const session = await FRStore.createPasteSession();
    setActivePasteId(null);
    setHighlightedPasteId(null);
    setActiveSessionId(session.id);
    await cleanupEmptySession(prevId);
    await refreshPasteSessions();
  }, [activeSessionId, cleanupEmptySession, refreshPasteSessions]);

  const handleRenamePasteSession = useCallback(async (sessionId, title) => {
    await FRStore.updatePasteSession(sessionId, { title });
    await refreshPasteSessions();
  }, [refreshPasteSessions]);

  const handleDeletePasteSession = useCallback(async (sessionId) => {
    await FRStore.deletePasteSession(sessionId);
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
      setActivePasteId(null);
      setActivePastes([]);
    }
    await refreshPasteSessions();
  }, [activeSessionId, refreshPasteSessions]);

  const handlePasteSubmit = useCallback(async (text) => {
    let sessionId = activeSessionId;
    let isNewSession = false;
    if (!sessionId) {
      const session = await FRStore.createPasteSession();
      sessionId = session.id;
      setActiveSessionId(sessionId);
      isNewSession = true;
    }
    const paste = await FRStore.addPaste(sessionId, text);
    if (!paste) return null;
    const updatedPastes = await FRStore.getPastesBySession(sessionId);
    setActivePastes(updatedPastes);
    await refreshPasteSessions();

    // Auto-generate title on first paste in session
    if (isNewSession || updatedPastes.length === 1) {
      generatePasteTitle(text).then(async (title) => {
        if (title) {
          await FRStore.updatePasteSession(sessionId, { title });
          await refreshPasteSessions();
        }
      });
    }

    return paste;
  }, [activeSessionId, refreshPasteSessions]);

  const handlePasteProgress = useCallback(async ({ wordIndex, totalWords, complete }) => {
    if (!activePasteId || !activeSessionId) return;
    const readIdx = complete ? totalWords : Math.min(wordIndex, totalWords);
    const updates = { readIdx };
    if (complete) updates.readAt = Date.now();
    await FRStore.updatePaste(activePasteId, updates);
    setActivePastes(await FRStore.getPastesBySession(activeSessionId));
  }, [activePasteId, activeSessionId]);

  const handleDeletePaste = useCallback(async (paste) => {
    if (!paste) return;
    const sessionId = paste.sessionId || activeSessionId;
    await FRStore.deletePaste(paste.id);
    const updated = sessionId ? await FRStore.getPastesBySession(sessionId) : [];
    setActivePastes(updated);
    await refreshPasteSessions();
    if (activePasteId === paste.id) {
      setActivePasteId(pickReadablePasteId(updated));
    }
    if (highlightedPasteId === paste.id) setHighlightedPasteId(null);
  }, [activePasteId, activeSessionId, highlightedPasteId, refreshPasteSessions]);

  const onRefreshLibrary = useCallback(async () => {
    setBusy(true);
    try {
      await FRStore.autoScanLibrary((p) => setProgress(p));
      await refresh();
    } catch (e) { console.error('Refresh failed:', e); }
    finally { setBusy(false); setProgress(null); }
  }, [refresh]);

  const onPickFolder = useCallback(async () => {
    setBusy(true);
    try {
      await FRStore.pickFolder((p) => setProgress(p));
      await refresh();
    } catch (e) { if (e.name !== 'AbortError') console.error('Folder pick failed:', e); }
    finally { setBusy(false); setProgress(null); }
  }, [refresh]);

  const onPickInput = useCallback(async (e) => {
    const fileList = Array.from(e.target.files || []);
    if (!fileList.length) return;
    setBusy(true);
    try {
      const entries = fileList.map(f => ({ name: f.name, file: f }));
      await FRStore.ingestFiles(entries, (p) => setProgress(p));
      await refresh();
    } catch (err) { console.error('Ingestion failed:', err); }
    finally { setBusy(false); setProgress(null); e.target.value = ''; }
  }, [refresh]);

  const onCoverChange = useCallback(async (book, file) => {
    const resized = await FRStore.resizeCover(file);
    const fresh = await FRStore.dbGet('books', book.id);
    if (fresh) {
      fresh.cover = resized;
      await FRStore.dbPut('books', fresh);
      await refresh();
    }
  }, [refresh]);

  const findBookFile = useCallback((book) => {
    if (!window.electronBooks) return null;
    if (book.fileName) return book.fileName;
    // Match by title/author in the books directory
    const epubs = window.electronBooks.listEpubs();
    const needle = (book.title || '').toLowerCase();
    const match = epubs.find(ep => ep.name.toLowerCase().includes(needle));
    return match ? match.name : null;
  }, []);

  const onDeleteBook = useCallback(async () => {
    if (!deleteTarget) return;
    const fileName = findBookFile(deleteTarget);
    if (fileName && window.electronBooks) {
      // Permanently delete: archive first as safety net, then delete the archive
      window.electronBooks.deleteBook(fileName);
    }
    await FRStore.dbDelete('books', deleteTarget.id);
    const targetId = deleteTarget.id;
    setDeleteTarget(null);
    setBooks(prev => prev.filter(b => b.id !== targetId));
  }, [deleteTarget, findBookFile]);

  const onArchiveBook = useCallback(async () => {
    if (!deleteTarget) return;
    const fileName = findBookFile(deleteTarget);
    if (fileName && window.electronBooks) {
      window.electronBooks.archiveBook(fileName);
    }
    await FRStore.dbDelete('books', deleteTarget.id);
    const targetId = deleteTarget.id;
    setDeleteTarget(null);
    setBooks(prev => prev.filter(b => b.id !== targetId));
  }, [deleteTarget, findBookFile]);

  // Main-shell hotkeys: Escape returns from chat to library, N creates a paste session.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (openBookId) return; // don't intercept while reading
      if (activePasteId) return;
      if ((e.key === 'Escape' || e.key === 'l' || e.key === 'L') && activeSessionId) {
        setActivePasteId(null);
        setHighlightedPasteId(null);
        setActiveSessionId(null);
      }
      else if (e.key === 'n' || e.key === 'N') handleNewPasteSession();
      else if (e.key === '?') setShowAppHelp(h => !h);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openBookId, activePasteId, activeSessionId, handleNewPasteSession]);

  useEffect(() => {
    const onPaste = async (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (openBookId || !activeSessionId) return;
      const text = e.clipboardData?.getData('text/plain');
      if (!text?.trim()) return;
      e.preventDefault();
      const paste = await handlePasteSubmit(text);
      if (paste && activePasteId) {
        setHighlightedPasteId(null);
        setActivePasteId(paste.id);
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [openBookId, activeSessionId, activePasteId, handlePasteSubmit]);

  const openBook = books.find(b => b.id === openBookId);
  const activeSession = pasteSessions.find(s => s.id === activeSessionId);
  const activePaste = activePastes.find(p => p.id === activePasteId);

  let content;
  if (openBook) {
    content = (
      <Reader
        theme={theme}
        book={openBook}
        onClose={() => { setOpenBookId(null); refresh(); }}
        settings={settings}
        onSettings={(patch) => setSettings(s => ({ ...s, ...patch }))}
      />
    );
  } else if (activePaste && activeSession) {
    content = (
      <PasteReaderDeck
        theme={theme}
        sessions={pasteSessions}
        session={activeSession}
        pastes={activePastes}
        activePaste={activePaste}
        settings={settings}
        onSettings={(patch) => setSettings(s => ({ ...s, ...patch }))}
        onProgressChange={handlePasteProgress}
        onSelectSession={async (id) => {
          setActiveSessionId(id);
          const nextPastes = await FRStore.getPastesBySession(id);
          setActivePastes(nextPastes);
          setActivePasteId(pickReadablePasteId(nextPastes));
        }}
        onNewSession={handleNewPasteSession}
        onRenameSession={handleRenamePasteSession}
        onSelectPaste={setActivePasteId}
        onPasteMore={() => {
          setHighlightedPasteId(activePasteId);
          setActivePasteId(null);
        }}
        onDeletePaste={handleDeletePaste}
        onEndSession={() => {
          setActivePasteId(null);
          setActiveSessionId(null);
        }}
      />
    );
  } else {
    let mainPane;
    if (activeSession) {
      mainPane = (
        <>
          <PasteChatPane theme={theme} session={activeSession} pastes={activePastes} onReadPaste={(paste) => setActivePasteId(paste.id)} onDeletePaste={handleDeletePaste} onRenameSession={handleRenamePasteSession} highlightedPasteId={highlightedPasteId} />
          <PasteComposer theme={theme} />
        </>
      );
    } else if (books.length === 0) {
      mainPane = (
        <EmptyLibrary
          theme={theme}
          onPick={onPickFolder}
          onPickInput={onPickInput}
          supported={supported}
          busy={busy}
          progress={progress}
        />
      );
    } else {
      mainPane = (
        <Library
          theme={theme}
          books={books}
          onOpen={(b) => setOpenBookId(b.id)}
          onAdd={onPickFolder}
          onAddInput={onPickInput}
          onDelete={(b) => setDeleteTarget(b)}
          onCoverChange={onCoverChange}
          supported={supported}
          busy={busy}
          progress={progress}
        />
      );
    }
    content = (
      <div style={{ display: 'flex', height: '100%', minHeight: 0, background: theme.bg, color: theme.ink }}>
        <PasteSidebar
          theme={theme}
          sessions={pasteSessions}
          activeId={activeSessionId}
          onSelect={(id) => { const prev = activeSessionId; setActivePasteId(null); setActiveSessionId(id); cleanupEmptySession(prev).then(refreshPasteSessions); }}
          onNew={handleNewPasteSession}
          onRename={handleRenamePasteSession}
          onDelete={handleDeletePasteSession}
          onHelp={() => setShowAppHelp(true)}
          onSettings={() => setShowAppSettings(true)}
        />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {mainPane}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: theme.bg, color: theme.ink }}>
      {openBook && <TopBar theme={theme} dark={dark} setDark={setDark} title={openBook.title} />}
      <div style={{ flex: 1, minHeight: 0 }}>
        {content}
      </div>
      {deleteTarget && (
        <DeleteModal
          book={deleteTarget}
          theme={theme}
          onArchive={onArchiveBook}
          onDelete={onDeleteBook}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {showAppSettings && (
        <SettingsPanel
          theme={theme}
          settings={settings}
          onSettings={(patch) => setSettings(s => ({ ...s, ...patch }))}
          onClose={() => setShowAppSettings(false)}
        />
      )}
      {showAppHelp && (
        <HelpModal theme={theme} onClose={() => setShowAppHelp(false)} />
      )}
    </div>
  );
}

window.FRApp = App;

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<App />);
  const bootStatus = document.getElementById('boot-status');
  if (bootStatus) bootStatus.remove();
}
