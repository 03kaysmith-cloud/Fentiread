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
  }
});
