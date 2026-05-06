const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

const booksDir = process.env.FENTIREAD_BOOKS_DIR || path.join(__dirname, '..', 'books');

contextBridge.exposeInMainWorld('electronBooks', {
  getBooksDir: () => booksDir,
  listEpubs: () => {
    try {
      if (!fs.existsSync(booksDir)) return [];
      return fs.readdirSync(booksDir)
        .filter(f => /\.epub$/i.test(f) && !fs.statSync(path.join(booksDir, f)).isDirectory())
        .map(name => ({ name, path: path.join(booksDir, name) }));
    } catch (e) {
      console.error('listEpubs failed:', e, 'booksDir:', booksDir);
      return [];
    }
  },
  readFile: (filePath) => {
    try {
      const resolved = path.resolve(filePath);
      if (!resolved.startsWith(path.resolve(booksDir))) return null;
      return fs.readFileSync(resolved);
    } catch (e) {
      console.error('readFile failed:', e);
      return null;
    }
  },
  archiveBook: (fileName) => {
    try {
      const src = path.join(booksDir, fileName);
      if (!fs.existsSync(src)) return { ok: false, error: 'File not found' };
      const archiveDir = path.join(booksDir, 'archive');
      if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, { recursive: true });
      const dest = path.join(archiveDir, fileName);
      fs.renameSync(src, dest);
      return { ok: true, dest };
    } catch (e) {
      console.error('archiveBook failed:', e);
      return { ok: false, error: e.message };
    }
  },
  deleteBook: (fileName) => {
    try {
      const src = path.join(booksDir, fileName);
      if (!fs.existsSync(src)) return { ok: false, error: 'File not found' };
      fs.unlinkSync(src);
      return { ok: true };
    } catch (e) {
      console.error('deleteBook failed:', e);
      return { ok: false, error: e.message };
    }
  }
});
