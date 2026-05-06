Look up information about a book from Kay's library. The book name is: $ARGUMENTS

## Step 1: Find the book in books.db

```sql
SELECT * FROM books WHERE title LIKE '%[name]%' OR author LIKE '%[name]%';
```

Use `python3` with sqlite3 to query `books.db`.

If not found, tell the user the book hasn't been checked in yet and suggest running `/bookcheck [name]`.

## Step 2: Check reading progress from FentiRead

Try to fetch live reading progress from the running FentiRead app:

```python
import urllib.request, json
try:
    data = json.loads(urllib.request.urlopen('http://127.0.0.1:18271/api/books', timeout=2).read())
    # Match by title (case-insensitive partial match)
    for b in data:
        if '[name]'.lower() in b['title'].lower():
            # Found it - report percent, wordIndex, totalWords
            break
except:
    pass  # App not running, skip
```

If the app is running and the book is found, report the reading percentage. If not running, note that FentiRead isn't open so progress can't be checked.

## Step 3: Present the information

Show a clean summary card:

```
[Title] by [Author] ([Year])
Genre: [genre] | Author: [author_gender]
Pages: ~[page_count] | Words: [word_count] | Reading time: [X]h [Y]m

Status: [wishlist/planning/reading/finished]
Progress: [X]% (from FentiRead, if available)

Summary:
[summary]

What readers enjoy:
[reader_reception]

Themes: [themes]

Notes: [any personal notes]
```

If the book has status "finished", also show `date_finished`.

## Step 4: Update progress in books.db

If FentiRead shows reading progress > 0%, update the book's status to "reading" if it was "planning":

```python
conn.execute("UPDATE books SET status = 'reading' WHERE title LIKE ? AND status = 'planning'", ('%name%',))
```
