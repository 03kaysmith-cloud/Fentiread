Log a book to the reading wishlist. No EPUB needed. The book is: $ARGUMENTS

## Step 1: Identify the book

If `$ARGUMENTS` contains both a title and author (e.g. "Shogun, James Clavell" or "The Road by Cormac McCarthy"), use both to identify it.

If only a title is given, search your knowledge and Open Library to find likely matches. If there are multiple books with the same or similar title, list the top candidates with author and year, and ask the user to confirm which one.

## Step 2: Check if already logged

```python
import sqlite3
conn = sqlite3.connect('books.db')
rows = conn.execute("SELECT id, title, author, status FROM books WHERE title LIKE ?", ('%[title]%',)).fetchall()
```

If already in the database, tell the user and show the current status. Don't duplicate.

## Step 3: Gather information

Use your knowledge and Open Library to gather:

- **Title**: Full title
- **Author**: Full name (First Last)
- **Author gender**: 'male' / 'female' / 'non-binary' / 'unknown'. Use your knowledge of the author.
- **Year published**: First publication year
- **Genre**: e.g. "Historical Fiction", "Science Fiction", "Memoir", "Literary Fiction"
- **Page count**: From Open Library, or your knowledge. If unavailable, estimate.
- **Word count**: Estimate as `page_count * 250`
- **Reading time**: `word_count / 14000` hours
- **Themes**: Key themes, comma-separated, no spoilers
- **Summary**: 3-5 sentence non-spoiler summary. Premise, setting, what makes it compelling. Back-cover blurb style.
- **Reader reception**: 2-3 sentences. What readers enjoy, common praise, any awards. Honest about criticisms too.

## Step 4: Present and confirm

Show a summary card:

```
[Title] by [Author] ([Year])
Genre: [genre] | Author: [gender]
Pages: ~[pages] | Reading time: ~[X]h [Y]m

Summary:
[summary]

What readers enjoy:
[reception]

Themes: [themes]
```

Ask the user to confirm before saving (in case the wrong book was identified).

Also ask: "Have you started reading this before?" If yes, set status to `reading` instead of `wishlist`.

## Step 5: Store in books.db

```python
import sqlite3, datetime
conn = sqlite3.connect('books.db')
conn.execute('''INSERT INTO books
    (title, author, author_gender, year_published, genre, page_count, word_count,
     reading_time_hours, summary, reader_reception, themes,
     status, date_added)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
    (title, author, gender, year, genre, pages, words, reading_hours,
     summary, reception, themes, 'wishlist',
     datetime.datetime.now().isoformat()))
conn.commit()
conn.close()
```

Confirm: "Added [Title] to your reading wishlist."

## Important notes

- Status is 'wishlist' by default, or 'reading' if the user says they've already started it
- No file_path or file_size_kb (no EPUB)
- If unsure about any info, say so rather than guessing
- If the user logs multiple books in one go (e.g. "booklog Shogun, Musashi, Papillon"), process each one
