const path = require('path');
const http = require('http');
const { app, BrowserWindow, Menu, shell } = require('electron');

const isDev = !app.isPackaged;
let mainWindow = null;

// Resolve the books folder - in dev it's next to desktop/, in packaged it's next to the exe
const booksDir = isDev
  ? path.join(__dirname, '..', 'books')
  : path.join(path.dirname(process.execPath), '..', '..', 'books');
process.env.FENTIREAD_BOOKS_DIR = booksDir;

function createWindow() {
  const iconPath = path.join(__dirname, '..', 'assets', 'icon.ico');
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 960,
    minHeight: 640,
    title: 'FentiRead',
    icon: iconPath,
    show: false,
    backgroundColor: '#ffffff',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow = win;
  win.loadFile(path.join(__dirname, '..', 'app', 'index.html'));
  win.once('ready-to-show', () => win.show());

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (isDev) {
    win.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.shift && input.key.toLowerCase() === 'i') {
        win.webContents.toggleDevTools();
      }
    });
  }
}

app.setName('FentiRead');

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Local API for reading progress (used by CLI commands)
const API_PORT = 18271;
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/api/books' && mainWindow) {
    try {
      const data = await mainWindow.webContents.executeJavaScript(`
        (async () => {
          const db = await new Promise((resolve, reject) => {
            const req = indexedDB.open('fentiread-v1', 3);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
          });
          const books = await new Promise((resolve, reject) => {
            const tx = db.transaction('books', 'readonly');
            const req = tx.objectStore('books').getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
          });
          return books.map(b => ({
            id: b.id,
            title: b.title,
            author: b.author,
            totalWords: b.totalWords || 0,
            wordIndex: b.progress?.wordIndex || 0,
            percent: b.totalWords ? Math.round((b.progress?.wordIndex || 0) / b.totalWords * 100) : 0,
            format: b.format,
            addedAt: b.addedAt
          }));
        })()
      `);
      res.end(JSON.stringify(data));
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: e.message }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'not found' }));
  }
});
server.listen(API_PORT, '127.0.0.1', () => {});
server.on('error', () => {});
