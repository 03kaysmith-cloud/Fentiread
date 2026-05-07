Assess and prepare an EPUB for FentiRead. The book name is: $ARGUMENTS

## File layout

```
fentiread-desktop/
  books/          <- clean, checked EPUBs ready for reading
  books/raw/      <- archived originals (pre-fix copies)
  [root]          <- drop raw EPUBs here for intake
```

## Step 1: Find the file(s)

If `$ARGUMENTS` is empty or blank, scan for ALL unchecked EPUBs:
1. Find every `.epub` file in the project root
2. Find every `.epub` in `books/` that doesn't match the clean `Author - Title.epub` naming pattern (i.e. has long messy filenames, hashes, or "Anna" in the name)
3. Process each one in sequence, running the full assessment and fix flow for each

If `$ARGUMENTS` is provided, search for a matching EPUB in the project root first, then `books/`. Match by filename (case-insensitive partial match). If not found, tell the user and stop.

## Step 2: Quality assessment

Run `python tools/fix_book.py --assess <path>` to generate a quality report. If the `--assess` flag doesn't exist yet, run the assessment manually:

1. Open the EPUB as a ZIP and inspect:
   - **DRM check**: Try reading `META-INF/encryption.xml`. If it contains `EncryptedData` entries for content files (not just fonts), report "DRM-protected, cannot process" and stop.
   - **Text quality**: Sample 3-4 large HTML files. Count and report:
     - Broken ligatures: look for mid-word splits like `dif icult`, `conf ine`, `f irst`, `f light`. **IMPORTANT:** Do NOT count cross-word matches like `of feet`, `off into`, `of fire` - these are normal English. The `f` must be part of the same word as the following letter, not the end of a preceding word. Verify a sample before reporting.
     - Encoding issues: mojibake characters, mangled quotes, broken em-dashes
     - Duplicate passages (repeated 80+ char blocks within 500 chars)
   - **Metadata**: Check OPF for title, author, cover image. Flag what's missing or looks auto-generated (e.g. filename as title).
   - **Chapter structure**: Report spine item count, TOC entries (NCX + nav), and whether chapters are split into separate files or concatenated into large files. Flag if TOC only has Part-level entries.
   - **Images**: Count images, report total size, flag any over 1MB or over 2000px wide. List image references in HTML vs actual image files (flag orphans).
   - **Spine issues**: Flag empty or near-empty (<50 chars of text) spine items.

2. Present the report in a clean format. For each issue category, show count and examples. At the end, list recommended actions:
   - `[fix-text]` Fix ligatures and encoding (modifies EPUB text)
   - `[chapters]` Detect and write chapter map (adds fentiread-chapters.json)
   - `[images]` Resize oversized images to 1200px max width
   - `[metadata]` Look up and fix title, author, cover from Open Library
   - `[organize]` Clean filename, move to books/, archive raw to books/raw/

3. **Auto-apply** `[chapters]`, `[metadata]`, and `[organize]` without asking. These are always done.
4. **Ask permission** only for `[fix-text]` and `[images]`, as these modify the book content. Show the issue count and a few examples so the user can judge the risk.

## Step 3: Book stats and information

After (or during) the quality assessment, gather the following about the book:

### Page and reading stats
- **Word count**: Count all text content across all XHTML spine items (strip HTML tags, count words). Use this Python snippet inside the EPUB ZIP:
  ```python
  import re, zipfile
  total_words = 0
  for name in zip_obj.namelist():
      if name.endswith(('.xhtml', '.html')) and 'nav' not in name.lower() and 'toc' not in name.lower():
          text = re.sub(r'<[^>]+>', ' ', zip_obj.read(name).decode('utf-8', errors='replace'))
          total_words += len(text.split())
  ```
- **Page count**: Estimate as `word_count / 250` (standard publishing estimate). Also check Open Library for the official page count if available.
- **Reading time**: Estimate as `word_count / 14000` hours (average 230 wpm reading speed).

### Book information (use your knowledge + Open Library)
- **Genre / categories**: e.g. "Historical Fiction", "Science Fiction", "Memoir"
- **Author gender**: 'male' / 'female' / 'non-binary' / 'unknown'. Use your knowledge of the author.
- **Year published**: First publication year
- **Themes**: Key themes of the book (comma-separated, no spoilers)
- **Summary**: 3-5 sentence non-spoiler summary. Describe the premise, setting, and what makes it compelling, but reveal nothing past the first act. Write it like a good back-cover blurb.
- **Reader reception**: 2-3 sentences on what readers tend to enjoy about this book, common praise, and who it appeals to. Mention any notable awards or recognition. Be honest about any common criticisms too.

Present all of this clearly to the user as part of the assessment report.

## Step 4: Apply selected fixes

For each selected action:

### fix-text
- Run the ligature and encoding fix pipeline from `tools/fix_book.py` (the `fix_broken_ligatures_in_html` and `fix_encoding` functions) on each XHTML item.
- Report how many fixes were applied.

### chapters
- Run `python tools/fix_book.py --chapters <path>` to detect chapter boundaries. If it fails or finds 0, build the chapter map manually by inspecting heading tags and anchor IDs in the HTML.
- The chapter map JSON must be placed at `{opfDir}/fentiread-chapters.json` inside the EPUB (e.g. `OEBPS/fentiread-chapters.json`). Check `META-INF/container.xml` for the OPF path to determine the correct directory.
- Use the **object format**: `{ "chapters": [...], "startChapter": N }` where each chapter entry has `{ "file", "charOffset", "title", "number" }`.
- **Include front matter** (title page, dedication, epigraph, table of contents, etc.) as the first chapter with `charOffset: 0` and title "Front Matter". This lets readers navigate back to it if they want.
- **Set `startChapter`** to the index of the first real content chapter (e.g. Chapter 1, Introduction, Prologue). If there's a meaningful prologue or introduction that is part of the narrative, that counts as the start. Skip prefaces by publishers, copyright pages, and tables of contents.
- Report how many chapters were detected and which one is the start chapter.

### images
- Open the EPUB ZIP, find images over 1200px wide, resize them using Python PIL/Pillow, and write back.
- Report how many images were resized and total size reduction.

### metadata
- Search Open Library for the book by title.
- Update the OPF: set clean title, author name (First Last format).
- If no cover image exists and Open Library has one, download and add it.
- Report what was updated.

### organize
- Derive a clean filename: `Author - Title.epub` (e.g. `Laura Hillenbrand - Unbroken.epub`)
- Copy the original (pre-fix) file to `books/raw/` with its original filename
- Save the processed EPUB to `books/` with the clean filename
- If the source file was in the project root, delete it after archiving
- If the source file was already in `books/` with a messy name, rename it and archive the original to `books/raw/`
- Report both paths

## Step 5: Store in books database

After assessment (regardless of which fixes were applied), store the book information in `books.db` (in the project root):

```python
import sqlite3, datetime
conn = sqlite3.connect('books.db')
conn.execute('''INSERT OR REPLACE INTO books
    (title, author, author_gender, year_published, genre, page_count, word_count,
     reading_time_hours, summary, reader_reception, themes,
     file_path, file_size_kb, quality_issues, status, date_added)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
    (title, author, gender, year, genre, pages, words, reading_hours,
     summary, reception, themes, file_path, size_kb, issues_summary,
     'planning', datetime.datetime.now().isoformat()))
conn.commit()
conn.close()
```

The `file_path` should be the final clean path in `books/`, e.g. `books/Laura Hillenbrand - Unbroken.epub`.

Tell the user the book has been saved and they can ask about it anytime.

## Important notes

- Never auto-fix without user approval. Always show the report first.
- The assessment should be quick (sample-based, not exhaustive).
- If the EPUB is already clean (no issues found), say so and just offer chapters + organize.
- Use the existing functions in `tools/fix_book.py` where possible rather than reimplementing.
- Always store the book info in books.db even if no fixes are needed.
- If you cannot determine some info (e.g. obscure book with no online presence), note what's missing rather than guessing.
- The `books/` folder is what the user points FentiRead at when loading books. Keep it tidy: clean filenames only.
- **NEVER put unchecked books in `books/`.** New/raw EPUBs go in the project root or `books/raw/` until they pass through `/bookcheck`. Only checked, clean-named EPUBs belong in `books/`.
- **NEVER delete a file without confirming a replacement exists.** When reorganising, always copy first, verify, then delete the original.
