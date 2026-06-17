const electron = require('electron');
console.log('DEBUG: require("electron") keys =', Object.keys(electron));
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');
const fs = require('fs').promises;

// Quick self-test mode: read package.json and exit
if(process.env.SELFTEST){
  (async ()=>{
    try{
      const p = path.join(__dirname,'package.json');
      const data = await fs.readFile(p,'utf8');
      console.log('SELFTEST: read package.json length=', data.length);
      console.log(data.split('\n').slice(0,5).join('\n'));
      process.exit(0);
    } catch(e){
      console.error('SELFTEST ERROR', e && e.message ? e.message : e);
      process.exit(2);
    }
  })();
}

function createWindow(){
  const win = new BrowserWindow({ width:1200, height:800, webPreferences: { nodeIntegration: false, contextIsolation: true, preload: path.join(__dirname,'preload.js') } });
  win.loadURL('http://localhost:5173');
  // forward renderer logs to main console
  ipcMain.on('renderer-log', (event, msg) => {
    console.log('RENDERER_LOG:', msg);
  });

  win.webContents.once('did-finish-load', async () => {
    try{
      const testPath = path.join(__dirname, 'package.json');
      console.log('MAIN: triggering renderer readFile for', testPath);
      const res = await win.webContents.executeJavaScript(`window.api.readFile(${JSON.stringify(testPath)})`);
      console.log('MAIN: executeJavaScript result:', res && res.ok ? `ok (len=${res.content.length})` : JSON.stringify(res));
    } catch(e){
      console.error('MAIN: executeJavaScript error', e && e.message ? e.message : e);
    }
  });
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
  } else {
    console.log('DEBUG: ipcMain is not available or missing handle');
  }
  createWindow();
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
