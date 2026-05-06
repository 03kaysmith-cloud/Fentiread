"""
FentiRead Book Fixer
Extracts MOBI/EPUB, fixes common text errors, enriches metadata, outputs clean EPUB.
"""

import re
import os
import sys
import shutil
import json
import urllib.request
import urllib.parse
import ftfy
from mobi import extract as mobi_extract
from ebooklib import epub

# ---------------------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------------------
READER_DIR = os.path.join(os.path.dirname(__file__), 'Reader')
ORIGINALS_DIR = os.path.join(os.path.dirname(__file__), 'originals')

# Common English words for ligature repair (loaded lazily)
_WORD_SET = None

def get_word_set():
    """Load a word set for dictionary-based ligature repair."""
    global _WORD_SET
    if _WORD_SET is not None:
        return _WORD_SET

    dict_path = os.path.join(os.path.dirname(__file__), 'english_words.txt')
    if os.path.exists(dict_path):
        with open(dict_path, 'r', encoding='utf-8') as f:
            _WORD_SET = set(line.strip().lower() for line in f if line.strip())
    else:
        # Fallback: build from nltk or use a minimal set
        try:
            from nltk.corpus import words
            _WORD_SET = set(w.lower() for w in words.words())
        except Exception:
            # Generate from common patterns - this is the fallback
            _WORD_SET = set()

    return _WORD_SET


# ---------------------------------------------------------------------------
# TEXT FIXERS
# ---------------------------------------------------------------------------

def fix_encoding(text):
    """Fix mojibake and encoding issues using ftfy."""
    return ftfy.fix_text(text, fix_latin_ligatures=True, uncurl_quotes=False)


def fix_broken_ligatures_in_html(html):
    """
    Fix broken ligatures where 'll', 'fi', 'fl', 'ff' etc. were split
    into 'l ', 'f i', 'f l', 'f f' by bad MOBI conversion.

    Works on text content only, preserving HTML tags.
    """
    words = get_word_set()
    stats = {'ll': 0, 'fi': 0, 'fl': 0, 'ff': 0, 'total': 0}

    def fix_text_segment(text):
        """Fix ligature breaks in a plain text segment."""
        fixed = text

        # Fix broken 'll': "smal raft" -> "small raft"
        # The second 'l' was replaced by a space, so "small" became "smal "
        # Pattern: word ending in 'l' + space + next word
        # Fix: check if adding 'l' to the broken word makes a real word
        def fix_ll(match):
            broken_word = match.group(1)  # e.g. "smal" or "Hil"
            next_word = match.group(2)    # e.g. "raft" or "enbrand"
            fixed_word = broken_word + 'l'  # e.g. "small" or "Hill"
            joined = broken_word + 'l' + next_word  # e.g. "smallraft" or "Hillenbrand"

            fixed_lower = fixed_word.lower().rstrip('.,;:!?\'")')
            broken_lower = broken_word.lower().rstrip('.,;:!?\'")')
            next_lower = next_word.lower().rstrip('.,;:!?\'")')
            joined_lower = joined.lower().rstrip('.,;:!?\'")')

            if words:
                is_broken_word = broken_lower in words
                is_fixed_word = fixed_lower in words
                is_next_word = next_lower in words and len(next_lower) > 1
                is_joined = joined_lower in words

                # Case 1: joined form is a real word -> always join
                # e.g. "cal ed"->"called", "mil ion"->"million", "control ed"->"controlled"
                if is_joined:
                    stats['ll'] += 1
                    stats['total'] += 1
                    return joined

                # Case 2: fixed word is real, next word is real -> two words
                # e.g. "smal raft" -> "small raft", "stil mostly" -> "still mostly"
                if is_fixed_word and is_next_word and not is_broken_word:
                    stats['ll'] += 1
                    stats['total'] += 1
                    return fixed_word + ' ' + next_word

                # Case 3: fixed word is real, broken is also a word but short/unlikely
                # e.g. "Al rights" -> "All rights" (al=word but "All rights" is intended)
                # Heuristic: prefer the 'll' form when both broken and fixed are words
                # "Wal Street"->"Wall Street", "stil mostly"->"still mostly"
                if is_fixed_word and is_next_word and is_broken_word:
                    if len(fixed_lower) > len(broken_lower):
                        stats['ll'] += 1
                        stats['total'] += 1
                        return fixed_word + ' ' + next_word

                # Case 4: fixed word is real, next word is NOT real -> join
                # e.g. "Hil enbrand" where "enbrand" isn't a word
                if is_fixed_word and not is_next_word and not is_broken_word:
                    stats['ll'] += 1
                    stats['total'] += 1
                    return joined

            else:
                # Heuristic mode without dictionary
                common_suffixes = ['ing', 'ed', 'er', 'est', 'y', 'ow', 'ey',
                                   'en', 'ent', 'ence', 'ion', 'ions', 'ets',
                                   'et', 'owed', 'ows', 'ying', 'ness']
                for suf in common_suffixes:
                    if next_word.lower().rstrip('.,;:!?').startswith(suf):
                        stats['ll'] += 1
                        stats['total'] += 1
                        return broken_word + 'l' + next_word
            return match.group(0)

        fixed = re.sub(r'(\b\w+l) ([a-zA-Z]\w*)', fix_ll, fixed)

        # Fix broken 'fi' ligature: "f irst" -> "first", "dif icult" -> "difficult"
        def fix_fi(match):
            before = match.group(1)
            after = match.group(2)
            merged = before + 'fi' + after
            merged_lower = merged.lower().rstrip('.,;:!?\'")')
            if words and merged_lower in words:
                stats['fi'] += 1
                stats['total'] += 1
                return merged
            return match.group(0)

        fixed = re.sub(r'(\w*)f i(\w+)', fix_fi, fixed)

        # Fix broken 'fl' ligature: "f light" -> "flight"
        def fix_fl(match):
            before = match.group(1)
            after = match.group(2)
            merged = before + 'fl' + after
            merged_lower = merged.lower().rstrip('.,;:!?\'")')
            if words and merged_lower in words:
                stats['fl'] += 1
                stats['total'] += 1
                return merged
            return match.group(0)

        fixed = re.sub(r'(\w*)f l(\w+)', fix_fl, fixed)

        # Fix broken 'ff' ligature: "co f ee" -> needs different approach
        def fix_ff(match):
            before = match.group(1)
            after = match.group(2)
            merged = before + 'ff' + after
            merged_lower = merged.lower().rstrip('.,;:!?\'")')
            if words and merged_lower in words:
                stats['ff'] += 1
                stats['total'] += 1
                return merged
            return match.group(0)

        fixed = re.sub(r'(\w*)f f(\w+)', fix_ff, fixed)

        return fixed

    # Process only text content, skip HTML tags
    parts = re.split(r'(<[^>]+>)', html)
    for i, part in enumerate(parts):
        if not part.startswith('<'):
            parts[i] = fix_text_segment(part)

    return ''.join(parts), stats


def fix_text_duplication(html):
    """
    Detect and remove duplicated text passages that occur at MOBI
    record boundaries (~4096 byte intervals).
    """
    dupes_fixed = 0

    # Work on plain text extracted from paragraphs
    # Find repeated passages of 80+ chars
    text_only = re.sub(r'<[^>]+>', '', html)

    # Sliding window to find duplicates
    window = 100
    duplicates = []

    for i in range(0, len(text_only) - window * 2, window):
        chunk = text_only[i:i + window]
        next_pos = text_only.find(chunk, i + 50)
        if next_pos > 0 and (next_pos - i) < 500:
            # Found a duplicate, determine the overlap region
            # Find how much text is duplicated
            overlap_start = i
            overlap_end = next_pos
            j = 0
            while (i + j < next_pos and
                   next_pos + j < len(text_only) and
                   text_only[i + j] == text_only[next_pos + j]):
                j += 1
            if j >= 80:
                duplicates.append((i, next_pos, j))

    # Remove duplicates from HTML (approximate, working on the HTML string)
    # We need to be careful not to break HTML structure
    for start, dup_start, length in reversed(duplicates):
        # Find the duplicated text
        dup_text = text_only[dup_start:dup_start + length]
        # Find it in the HTML and remove the first occurrence
        # (the first one is usually the truncated/broken version)
        idx = html.find(dup_text[:80])
        if idx >= 0:
            # Find the end of the first occurrence
            end_idx = idx + len(dup_text)
            # Check if removing this doesn't break HTML
            removed = html[idx:end_idx]
            if removed.count('<') == removed.count('>'):
                html = html[:idx] + html[end_idx:]
                dupes_fixed += 1

    return html, dupes_fixed


def fix_html_entities(html):
    """Clean up leftover HTML entities."""
    # These should already be handled but just in case
    html = html.replace('&nbsp;', '\u00a0')
    return html


def fix_smart_quotes(html):
    """Normalize quote characters to consistent Unicode curly quotes."""
    # Fix common mojibake patterns for quotes
    replacements = [
        ('\u00e2\u0080\u0099', '\u2019'),  # '
        ('\u00e2\u0080\u009c', '\u201c'),  # "
        ('\u00e2\u0080\u009d', '\u201d'),  # "
        ('\u00e2\u0080\u0094', '\u2014'),  # em dash
        ('\u00e2\u0080\u0093', '\u2013'),  # en dash
    ]
    for old, new in replacements:
        html = html.replace(old, new)
    return html


# ---------------------------------------------------------------------------
# MOBI -> EPUB CONVERSION
# ---------------------------------------------------------------------------

def split_into_chapters(html):
    """
    Split monolithic MOBI HTML into chapters at <mbp:pagebreak/> tags.
    Returns list of (title, html_content) tuples.
    """
    # Split on Kindle pagebreaks
    chunks = re.split(r'<mbp:pagebreak\s*/?\s*>', html)

    chapters = []
    for i, chunk in enumerate(chunks):
        chunk = chunk.strip()
        if not chunk:
            continue

        # Get text content to check
        text_content = re.sub(r'<[^>]+>', '', chunk).strip()

        # Skip empty chapters
        if not text_content:
            continue

        # Skip spam/watermark chapters (Chinese piracy watermarks)
        if re.search(r'[\u4e00-\u9fff]{5,}', text_content):
            continue

        # Try to extract chapter title from bold text or first meaningful text
        title_match = re.search(r'<b[^>]*>(.*?)</b>', chunk, re.DOTALL)
        if title_match:
            title = re.sub(r'<[^>]+>', '', title_match.group(1)).strip()
            title = re.sub(r'\s+', ' ', title)[:80]
        else:
            # Use first line of text
            text = re.sub(r'<[^>]+>', ' ', chunk[:500]).strip()
            title = text[:60] if text else f'Section {i+1}'

        if not title:
            title = f'Section {i+1}'

        chapters.append((title, chunk))

    return chapters


def clean_chapter_html(html):
    """Clean up MOBI-specific HTML for EPUB compatibility."""
    # Remove Kindle-specific tags
    html = re.sub(r'<mbp:[^>]+/?>', '', html)
    # Remove filepos anchors (Kindle internal links)
    html = re.sub(r'<a\s+id="filepos\d+"[^>]*/?\s*>', '', html)
    # Fix self-closing tags
    html = re.sub(r'<br\s*>', '<br/>', html)
    # Remove empty paragraphs (but keep ones with just &nbsp; for spacing)
    html = re.sub(r'<p[^>]*>\s*</p>', '', html)
    # Fix image paths
    html = re.sub(r'src="Images/', 'src="images/', html)
    return html


def build_epub(title, author, chapters, images_dir, cover_image_name, output_path):
    """Build an EPUB file from chapters and images."""
    book = epub.EpubBook()

    # Metadata
    book.set_identifier(f'fentiread-{title.lower().replace(" ", "-")}')
    book.set_title(title)
    book.set_language('en')
    book.add_author(author)

    # Add cover image
    if cover_image_name and images_dir:
        cover_path = os.path.join(images_dir, cover_image_name)
        if os.path.exists(cover_path):
            with open(cover_path, 'rb') as f:
                cover_data = f.read()
            ext = os.path.splitext(cover_image_name)[1].lower()
            media_type = 'image/jpeg' if ext in ('.jpg', '.jpeg') else 'image/png'
            book.set_cover('cover' + ext, cover_data)

    # Add all images
    image_items = {}
    if images_dir and os.path.exists(images_dir):
        for img_file in sorted(os.listdir(images_dir)):
            img_path = os.path.join(images_dir, img_file)
            with open(img_path, 'rb') as f:
                img_data = f.read()
            ext = os.path.splitext(img_file)[1].lower()
            media_type = 'image/jpeg' if ext in ('.jpg', '.jpeg') else 'image/png'
            img_item = epub.EpubImage()
            img_item.file_name = f'images/{img_file}'
            img_item.media_type = media_type
            img_item.content = img_data
            book.add_item(img_item)
            image_items[img_file] = img_item

    # Add chapters
    epub_chapters = []
    toc = []

    for i, (ch_title, ch_html) in enumerate(chapters):
        ch = epub.EpubHtml(
            title=ch_title,
            file_name=f'chapter_{i:03d}.xhtml',
            lang='en'
        )
        # Wrap in proper XHTML, ensure non-empty
        clean_html = clean_chapter_html(ch_html)
        if not clean_html.strip():
            clean_html = '<p></p>'
        ch.content = f'<html><body>{clean_html}</body></html>'
        book.add_item(ch)
        epub_chapters.append(ch)
        toc.append(ch)

    # Table of contents and spine
    book.toc = toc
    book.spine = ['nav'] + epub_chapters
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())

    # Write
    epub.write_epub(output_path, book)
    return output_path


# ---------------------------------------------------------------------------
# METADATA ENRICHMENT
# ---------------------------------------------------------------------------

def search_book_metadata(title):
    """Search Open Library for book metadata."""
    try:
        query = urllib.parse.quote(title)
        url = f'https://openlibrary.org/search.json?title={query}&limit=3'
        req = urllib.request.Request(url, headers={'User-Agent': 'FentiRead/1.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))

        if data.get('docs'):
            doc = data['docs'][0]
            author = doc.get('author_name', ['Unknown'])[0]
            cover_id = doc.get('cover_i')
            return {
                'author': author,
                'cover_id': cover_id,
                'year': doc.get('first_publish_year'),
            }
    except Exception as e:
        print(f'  Metadata search failed: {e}')

    return None


def download_cover(cover_id, output_path):
    """Download cover image from Open Library."""
    try:
        url = f'https://covers.openlibrary.org/b/id/{cover_id}-L.jpg'
        req = urllib.request.Request(url, headers={'User-Agent': 'FentiRead/1.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            with open(output_path, 'wb') as f:
                f.write(resp.read())
        return True
    except Exception as e:
        print(f'  Cover download failed: {e}')
        return False


# ---------------------------------------------------------------------------
# MAIN PIPELINE
# ---------------------------------------------------------------------------

def fix_book(filename):
    """Main fix pipeline for a single book."""
    # Find the file - search both READER_DIR and project root
    filepath = None
    search_dirs = [READER_DIR, os.path.dirname(__file__)]
    for search_dir in search_dirs:
        if not os.path.exists(search_dir):
            continue
        for f in os.listdir(search_dir):
            if f.lower().endswith(('.mobi', '.epub')) and filename.lower() in f.lower():
                filepath = os.path.join(search_dir, f)
                break
        if filepath:
            break

    if not filepath:
        print(f'ERROR: Could not find "{filename}" in search paths')
        return

    basename = os.path.basename(filepath)
    name_no_ext = os.path.splitext(basename)[0]
    ext = os.path.splitext(basename)[1].lower()

    print(f'Fixing: {basename[:80]}{"..." if len(basename) > 80 else ""}')
    print(f'{"=" * 50}')

    if ext == '.epub':
        return fix_epub(filepath, filename)
    elif ext == '.mobi':
        return fix_mobi(filepath, filename)
    else:
        print(f'Unsupported format: {ext}')


def fix_epub(filepath, clean_name):
    """Fix an EPUB file in-place: fix text, enrich metadata, rename cleanly."""
    from ebooklib import epub as epublib

    basename = os.path.basename(filepath)
    print(f'\n[1/5] Reading EPUB...')
    book = epublib.read_epub(filepath, options={'ignore_ncx': True})

    xhtml_items = [i for i in book.get_items() if i.get_type() == 9]
    image_items = [i for i in book.get_items() if i.get_type() == 6]
    print(f'  Chapters: {len(xhtml_items)}')
    print(f'  Images: {len(image_items)}')

    # Ensure word list
    ensure_wordlist()

    global _WORD_SET
    _WORD_SET = None

    # Step 2: Fix text in each chapter
    print(f'\n[2/5] Fixing text...')
    total_lig = {'ll': 0, 'fi': 0, 'fl': 0, 'ff': 0, 'total': 0}
    total_encoding = 0

    for item in xhtml_items:
        content = item.get_content().decode('utf-8', errors='replace')

        # Fix encoding
        before = content
        content = fix_encoding(content)
        content = fix_smart_quotes(content)
        content = fix_html_entities(content)
        total_encoding += sum(1 for a, b in zip(before[:len(content)], content) if a != b)

        # Fix ligatures
        content, stats = fix_broken_ligatures_in_html(content)
        for k in total_lig:
            total_lig[k] += stats.get(k, 0)

        item.set_content(content.encode('utf-8'))

    print(f'  Encoding fixes: {total_encoding}')
    print(f'  Broken "ll" fixed: {total_lig["ll"]}')
    print(f'  Broken "fi" fixed: {total_lig["fi"]}')
    print(f'  Broken "fl" fixed: {total_lig["fl"]}')
    print(f'  Broken "ff" fixed: {total_lig["ff"]}')
    print(f'  Total ligature fixes: {total_lig["total"]}')

    # Step 3: Check/enrich metadata
    print(f'\n[3/5] Enriching metadata...')
    existing_title = book.get_metadata('DC', 'title')
    existing_author = book.get_metadata('DC', 'creator')
    has_title = bool(existing_title and existing_title[0][0])
    has_author = bool(existing_author and existing_author[0][0])
    has_cover = bool(image_items) and any('cover' in (i.get_name() or '').lower() for i in image_items)

    title_str = existing_title[0][0] if has_title else clean_name
    author_str = existing_author[0][0] if has_author else 'Unknown'

    # Clean up author name if in "Last, First" format
    if ',' in author_str:
        parts = [p.strip() for p in author_str.split(',')]
        if len(parts) == 2:
            author_str = f'{parts[1]} {parts[0]}'

    print(f'  Title: {title_str}')
    print(f'  Author: {author_str}')

    # Search online for missing metadata or cover
    meta = None
    if not has_author or not has_cover or author_str == 'Unknown':
        meta = search_book_metadata(clean_name or title_str)

    if meta:
        if not has_author or author_str == 'Unknown':
            author_str = meta.get('author', author_str)
            print(f'  Author (online): {author_str}')
        if meta.get('year'):
            print(f'  Year: {meta["year"]}')

        # Download cover if book has no images
        if not has_cover and meta.get('cover_id'):
            import tempfile
            cover_path = os.path.join(tempfile.gettempdir(), 'fentiread_cover.jpg')
            if download_cover(meta['cover_id'], cover_path):
                with open(cover_path, 'rb') as f:
                    cover_data = f.read()
                book.set_cover('cover.jpg', cover_data)
                print(f'  Cover: downloaded from Open Library')

    # Update metadata in the book
    # Clear and re-set title and author
    book.metadata['http://purl.org/dc/elements/1.1/']['title'] = [(title_str, {})]
    book.metadata['http://purl.org/dc/elements/1.1/']['creator'] = [(author_str, {})]

    # Step 4: Determine clean filename
    print(f'\n[4/5] Saving...')
    # Derive clean name from the search term or title
    clean_title = re.sub(r'[^\w\s-]', '', clean_name or title_str).strip()
    clean_title = re.sub(r'\s+', ' ', clean_title)
    if not clean_title:
        clean_title = 'Untitled'
    output_name = f'{clean_title}.epub'
    output_path = os.path.join(READER_DIR, output_name)

    # Fix TOC items with missing UIDs (ebooklib bug)
    for i, item in enumerate(book.toc):
        if hasattr(item, 'uid') and item.uid is None:
            item.uid = f'navpoint-{i}'
        elif isinstance(item, tuple) and len(item) == 2:
            section, children = item
            if hasattr(section, 'uid') and section.uid is None:
                section.uid = f'navpoint-{i}'
            for j, child in enumerate(children):
                if hasattr(child, 'uid') and child.uid is None:
                    child.uid = f'navpoint-{i}-{j}'

    epublib.write_epub(output_path, book)
    epub_size = os.path.getsize(output_path)
    print(f'  Output: {output_path}')
    print(f'  Size: {epub_size / 1024:.0f} KB')

    # Step 5: Move original
    print(f'\n[5/5] Archiving original...')
    os.makedirs(ORIGINALS_DIR, exist_ok=True)
    original_dest = os.path.join(ORIGINALS_DIR, basename)
    if os.path.abspath(filepath) != os.path.abspath(output_path):
        shutil.move(filepath, original_dest)
        print(f'  Original moved to: originals/{basename[:60]}...')
    else:
        print(f'  Same path, skipping move')

    # Step 5b: Detect and write chapter map
    print(f'\n[5b] Detecting chapter boundaries...')
    ch_count = enrich_chapter_map(output_path)

    # Summary
    print(f'\n{"=" * 50}')
    print(f'DONE: {basename[:60]}... -> {output_name}')
    print(f'  Ligature fixes: {total_lig["total"]}')
    print(f'  Encoding fixes: {total_encoding}')
    print(f'  Author: {author_str}')
    print(f'  Chapters (HTML files): {len(xhtml_items)}')
    print(f'  Chapters (detected): {ch_count}')
    print(f'  Images: {len(image_items)}')


def ensure_wordlist():
    """Download English word list if not present."""
    wordlist_path = os.path.join(os.path.dirname(__file__), 'english_words.txt')
    if not os.path.exists(wordlist_path):
        print('  Downloading English word list...')
        try:
            url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt'
            req = urllib.request.Request(url, headers={'User-Agent': 'FentiRead/1.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                words_data = resp.read().decode('utf-8')
            with open(wordlist_path, 'w', encoding='utf-8') as f:
                f.write(words_data)
            print(f'  Downloaded {len(words_data.splitlines()):,} words')
        except Exception as e:
            print(f'  Warning: Could not download word list: {e}')


def fix_mobi(filepath, clean_name):
    """Fix a MOBI file: extract, fix, rebuild as EPUB."""
    basename = os.path.basename(filepath)

    print(f'\n[1/6] Extracting...')
    tempdir, _ = mobi_extract(filepath)
    html_path = os.path.join(tempdir, 'mobi7', 'book.html')
    images_dir = os.path.join(tempdir, 'mobi7', 'Images')
    html = open(html_path, 'r', encoding='utf-8', errors='replace').read()
    print(f'  HTML: {len(html):,} chars')
    img_count = len(os.listdir(images_dir)) if os.path.exists(images_dir) else 0
    print(f'  Images: {img_count}')

    # Step 2: Fix encoding (ftfy)
    print('\n[2/6] Fixing encoding...')
    html_before = html
    html = fix_encoding(html)
    html = fix_smart_quotes(html)
    html = fix_html_entities(html)
    encoding_changes = sum(1 for a, b in zip(html_before, html) if a != b)
    print(f'  Encoding fixes: {encoding_changes} character changes')

    # Step 3: Fix broken ligatures
    print('\n[3/6] Fixing broken ligatures...')
    # Download word list if we don't have one
    wordlist_path = os.path.join(os.path.dirname(__file__), 'english_words.txt')
    if not os.path.exists(wordlist_path):
        print('  Downloading English word list...')
        try:
            url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt'
            req = urllib.request.Request(url, headers={'User-Agent': 'FentiRead/1.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                words_data = resp.read().decode('utf-8')
            with open(wordlist_path, 'w', encoding='utf-8') as f:
                f.write(words_data)
            print(f'  Downloaded {len(words_data.splitlines()):,} words')
        except Exception as e:
            print(f'  Warning: Could not download word list: {e}')
            print('  Will use heuristic-only ligature repair')

    # Reset word set cache to pick up new file
    global _WORD_SET
    _WORD_SET = None

    html, lig_stats = fix_broken_ligatures_in_html(html)
    print(f'  Broken "ll" fixed: {lig_stats["ll"]}')
    print(f'  Broken "fi" fixed: {lig_stats["fi"]}')
    print(f'  Broken "fl" fixed: {lig_stats["fl"]}')
    print(f'  Broken "ff" fixed: {lig_stats["ff"]}')
    print(f'  Total ligature fixes: {lig_stats["total"]}')

    # Step 4: Fix text duplication
    print('\n[4/6] Checking for text duplication...')
    html, dupes = fix_text_duplication(html)
    print(f'  Duplicate passages removed: {dupes}')

    # Step 5: Metadata enrichment
    print('\n[5/6] Enriching metadata...')
    title = name_no_ext.replace('_', ' ').replace('-', ' ')
    author = 'Unknown'
    cover_image = None

    # Try to extract title/author from the book's own text
    title_match = re.search(r'<b[^>]*>(.*?)</b>', html[:5000], re.DOTALL)

    # Search online
    meta = search_book_metadata(title)
    if meta:
        author = meta.get('author', 'Unknown')
        year = meta.get('year', '')
        print(f'  Title: {title}')
        print(f'  Author: {author}')
        if year:
            print(f'  Year: {year}')

        # Download cover if available and not in the book already
        if meta.get('cover_id'):
            cover_dl_path = os.path.join(images_dir, 'cover_downloaded.jpg')
            if download_cover(meta['cover_id'], cover_dl_path):
                cover_image = 'cover_downloaded.jpg'
                print(f'  Cover: downloaded from Open Library')
            else:
                cover_image = None
    else:
        print(f'  Could not find metadata online, using filename')
        print(f'  Title: {title}')

    # If book has its own cover, prefer that
    if not cover_image:
        for img in sorted(os.listdir(images_dir)):
            if 'cover' in img.lower():
                cover_image = img
                print(f'  Cover: using embedded {img}')
                break

    # Step 6: Build EPUB
    print('\n[6/6] Building EPUB...')
    chapters = split_into_chapters(html)
    print(f'  Chapters: {len(chapters)}')

    output_path = os.path.join(READER_DIR, f'{name_no_ext}.epub')
    build_epub(title, author, chapters, images_dir, cover_image, output_path)

    epub_size = os.path.getsize(output_path)
    print(f'  Output: {output_path}')
    print(f'  Size: {epub_size/1024:.0f} KB')

    # Move original
    os.makedirs(ORIGINALS_DIR, exist_ok=True)
    original_dest = os.path.join(ORIGINALS_DIR, basename)
    shutil.move(filepath, original_dest)
    print(f'  Original moved to: {original_dest}')

    # Summary
    print(f'\n{"=" * 50}')
    print(f'DONE: {basename} -> {name_no_ext}.epub')
    print(f'  Ligature fixes: {lig_stats["total"]}')
    print(f'  Encoding fixes: {encoding_changes}')
    print(f'  Duplicates removed: {dupes}')
    print(f'  Chapters: {len(chapters)}')
    print(f'  Images: {img_count}')
    print(f'  Author: {author}')


# ---------------------------------------------------------------------------
# CHAPTER MAP ENRICHMENT
# ---------------------------------------------------------------------------

# Number words used as chapter markers in many EPUBs
_NUMBER_WORDS = [
    'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
    'Eighteen', 'Nineteen', 'Twenty', 'Twenty-one', 'Twenty-two', 'Twenty-three',
    'Twenty-four', 'Twenty-five', 'Twenty-six', 'Twenty-seven', 'Twenty-eight',
    'Twenty-nine', 'Thirty', 'Thirty-one', 'Thirty-two', 'Thirty-three',
    'Thirty-four', 'Thirty-five', 'Thirty-six', 'Thirty-seven', 'Thirty-eight',
    'Thirty-nine', 'Forty',
]

# Broken-ligature variants (MOBI conversion artifacts)
_BROKEN_VARIANTS = {
    'Six': 'S ix', 'Seven': 'S even', 'Eight': 'E ight',
    'Eleven': 'E leven', 'Sixteen': 'S ixteen', 'Seventeen': 'S eventeen',
    'Eighteen': 'E ighteen', 'Fifteen': 'F ifteen', 'Fifty': 'F ifty',
}


def detect_chapter_boundaries(zip_obj, opf_dir):
    """
    Scan EPUB HTML files for chapter boundaries that aren't in the TOC.
    Detects patterns like:
      <p>One</p><p>The Title</p>  (number-word chapter headings)
      <h1>CHAPTER TITLE</h1>       (h1/h2/h3 headings within large files)

    Returns a list of dicts: [{file, charOffset, number, title}]
    """
    import zipfile

    chapters = []

    # Build regex for number words (including broken ligature variants)
    patterns = []
    for nw in _NUMBER_WORDS:
        if nw in _BROKEN_VARIANTS:
            patterns.append((nw, rf'(?:{re.escape(nw)}|{re.escape(_BROKEN_VARIANTS[nw])})'))
        else:
            patterns.append((nw, re.escape(nw)))

    # Process each HTML file in the EPUB
    for finfo in sorted(zip_obj.namelist()):
        if not finfo.startswith(opf_dir) or not finfo.endswith(('.html', '.xhtml')):
            continue

        html = zip_obj.read(finfo).decode('utf-8', errors='replace')
        rel_path = finfo[len(opf_dir):] if finfo.startswith(opf_dir) else finfo

        # Skip small files (TOC pages, title pages, etc.)
        if len(html) < 5000:
            continue

        # Method 1: Number-word chapter headings
        # Pattern: <p>NumberWord</p> <p>Title</p>
        for nw_clean, nw_pat in patterns:
            pat = rf'<p[^>]*>\s*\n?\s*{nw_pat}\s*</p>\s*<p[^>]*>\s*\n?(.*?)\s*</p>'
            for m in re.finditer(pat, html):
                title = re.sub(r'<[^>]+>', '', m.group(1)).strip()
                if title and len(title) < 100:
                    chapters.append({
                        'file': rel_path,
                        'charOffset': m.start(),
                        'number': nw_clean,
                        'title': title,
                    })

    return chapters


def enrich_chapter_map(epub_path):
    """
    Detect chapter boundaries in an EPUB and write fentiread-chapters.json
    into the EPUB for the app to read.

    Returns the number of chapters detected.
    """
    import zipfile
    import tempfile

    z = zipfile.ZipFile(epub_path, 'r')

    # Find OPF to determine base directory
    container = z.read('META-INF/container.xml').decode('utf-8')
    opf_match = re.search(r'full-path="([^"]+)"', container)
    opf_path = opf_match.group(1) if opf_match else ''
    opf_dir = opf_path.rsplit('/', 1)[0] + '/' if '/' in opf_path else ''

    chapters = detect_chapter_boundaries(z, opf_dir)

    if not chapters:
        z.close()
        print('  No chapter boundaries detected')
        return 0

    # Also detect h1 headings (Preface, Epilogue, etc.) in large files
    headings = []
    for finfo in sorted(z.namelist()):
        if not finfo.startswith(opf_dir) or not finfo.endswith(('.html', '.xhtml')):
            continue
        html = z.read(finfo).decode('utf-8', errors='replace')
        rel_path = finfo[len(opf_dir):] if finfo.startswith(opf_dir) else finfo
        if len(html) < 5000:
            continue

        for m in re.finditer(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL):
            h1_text = re.sub(r'<[^>]+>', '', m.group(1)).strip()
            if h1_text and len(h1_text) < 80:
                # Don't duplicate if a numbered chapter starts at nearly the same position
                is_dup = any(
                    c['file'] == rel_path and abs(c['charOffset'] - m.start()) < 500
                    for c in chapters
                )
                if not is_dup:
                    headings.append({
                        'file': rel_path,
                        'charOffset': m.start(),
                        'number': None,
                        'title': h1_text,
                    })

    all_entries = headings + chapters
    all_entries.sort(key=lambda x: (x['file'], x['charOffset']))

    # Write the JSON into the EPUB
    chapter_json = json.dumps(all_entries, indent=2)
    json_path_in_epub = opf_dir + 'fentiread-chapters.json'

    # Rewrite the ZIP with the new file + updated OPF manifest
    z.close()

    # Read original, add our file, write new
    tmp_path = epub_path + '.tmp'
    with zipfile.ZipFile(epub_path, 'r') as zin, zipfile.ZipFile(tmp_path, 'w') as zout:
        for item in zin.namelist():
            data = zin.read(item)

            # If this is the OPF, inject our manifest item
            if item == opf_path:
                opf_str = data.decode('utf-8')
                if 'fentiread-chapters' not in opf_str:
                    # Add to manifest
                    opf_str = opf_str.replace(
                        '</manifest>',
                        '    <item id="fentiread-chapters" href="fentiread-chapters.json" media-type="application/json"/>\n  </manifest>'
                    )
                data = opf_str.encode('utf-8')

            # Skip old chapter map if it exists
            if item == json_path_in_epub:
                continue

            zout.writestr(item, data)

        # Add the chapter map
        zout.writestr(json_path_in_epub, chapter_json)

    # Replace original
    os.replace(tmp_path, epub_path)

    print(f'  Chapter map: {len(all_entries)} entries written to {json_path_in_epub}')
    return len(all_entries)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python fix_book.py <book_name>')
        print('       python fix_book.py --chapters <book_name>  (chapter detection only)')
        sys.exit(1)

    if sys.argv[1] == '--chapters':
        book_name = ' '.join(sys.argv[2:])
        # Find the file
        for search_dir in [READER_DIR, os.path.dirname(__file__)]:
            if not os.path.exists(search_dir):
                continue
            for f in os.listdir(search_dir):
                if f.lower().endswith('.epub') and book_name.lower() in f.lower():
                    filepath = os.path.join(search_dir, f)
                    print(f'Enriching chapters: {f}')
                    count = enrich_chapter_map(filepath)
                    print(f'Done: {count} chapters detected')
                    sys.exit(0)
        print(f'ERROR: Could not find "{book_name}"')
        sys.exit(1)
    else:
        book_name = ' '.join(sys.argv[1:])
        fix_book(book_name)
