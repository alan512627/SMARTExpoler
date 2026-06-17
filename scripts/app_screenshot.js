const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const outPath = path.join(__dirname, '..', 'docs', 'sprint-1', 'app_screenshot.png');
const url = 'http://localhost:5173';

function createWindow() {
  const win = new BrowserWindow({ width: 1200, height: 800, show: true });
  win.loadURL(url);
  win.webContents.once('did-finish-load', async () => {
    try{
      const image = await win.webContents.capturePage();
      fs.writeFileSync(outPath, image.toPNG());
      console.log('Saved app screenshot to', outPath);
    } catch(e){ console.error('Error capturing app:', e); }
    app.quit();
  });
}

app.whenReady().then(createWindow);
