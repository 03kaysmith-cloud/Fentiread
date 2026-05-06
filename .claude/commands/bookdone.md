Mark a book as finished. The book name is: $ARGUMENTS

## Step 1: Find the book in books.db

```python
import sqlite3, datetime
conn = sqlite3.connect('books.db')
rows = conn.execute("SELECT id, title, author, status FROM books WHERE title LIKE ?", ('%[name]%',)).fetchall()
```

If not found, tell the user and suggest `/bookcheck [name]` first.
If multiple matches, show them and ask which one.

## Step 2: Mark as finished

```python
now = datetime.datetime.now().isoformat()
conn.execute("UPDATE books SET status = 'finished', date_finished = ? WHERE id = ?", (now, book_id))
conn.commit()
conn.close()
```

## Step 3: Confirm and suggest

Tell the user the book is marked as done. Show:
- Title and author
- Date finished
- Reading time estimate (from the stored data)

Then ask if they'd like to:
- Add a personal rating (1-5)
- Add any notes or thoughts about the book

If they provide either, update the record:
```python
conn.execute("UPDATE books SET rating = ?, notes = ? WHERE id = ?", (rating, notes, book_id))
```
