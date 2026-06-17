const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

function createWindow(){
  const win = new BrowserWindow({ width:1200, height:800, webPreferences: { nodeIntegration: false, contextIsolation: true, preload: path.join(__dirname,'preload.js') } });
  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  // register IPC handlers after app is ready
  if (ipcMain && ipcMain.handle) {
    ipcMain.handle('read-file', async (event, filePath) => {
      try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        return { ok: true, content: data };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    });
  }
  createWindow();
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
