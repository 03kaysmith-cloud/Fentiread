# FentiRead

A speed reader for EPUB books and pasted text. Built with Electron.

Features:
- RSVP (rapid serial visual presentation) speed reading with bionic text
- Traditional page view with cached pagination (instant page loads)
- Paste any text to speed-read it (articles, emails, transcripts)
- Auto-generates paste session titles via OpenAI (bring your own key)
- EPUB, MOBI, AZW3 support
- Dark / light mode
- Adjustable WPM, font, punctuation pauses, long word delays
- Keyboard-driven (press ? for shortcuts)
- Auto-scans a `books/` folder for new EPUBs on startup

## Quick start

```bash
npm install
npm start
```

## Build

```bash
# Unpacked build (fastest startup)
npm run dist:unpacked
# then run: dist/win-unpacked/FentiRead.exe

# Single portable exe (slower startup, self-extracts)
npm run dist
```

## Usage

1. Drop `.epub` files into the `books/` folder, or use the Add button in the app
2. Click a book to start reading
3. Press Space to play/pause, arrows to navigate, P for page view
4. Press ? for all keyboard shortcuts
5. Ctrl+V to paste text into a speed-reading session

## Claude Code skills

The `.claude/commands/` folder contains Claude Code skills for managing your book library:

- `/bookcheck [name]` - assess an EPUB's quality, fix metadata, detect chapters, organize files
- `/book [name]` - look up info about a book in your library
- `/booklog [name]` - add a book to your reading wishlist (no EPUB needed)
- `/bookdone [name]` - mark a book as finished

These skills use `tools/fix_book.py` for EPUB processing and store metadata in a local SQLite database.

## Settings

- OpenAI API key (for auto-generating paste session titles) is stored in your browser's localStorage, never in code
- All reading preferences persist between sessions

## Project structure

```
app/           UI (React, JSX, no build step)
desktop/       Electron main process + preload
assets/        App icons
books/         Your EPUB library (gitignored)
books/raw/     Original unprocessed EPUBs (gitignored)
tools/         Python EPUB processing tools
.claude/       Claude Code skill definitions
```
