const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, '..', 'docs', 'sprint-1', 'ui_mockup.svg');
const outPath = path.join(__dirname, '..', 'docs', 'sprint-1', 'ui_mockup.png');

function createWindow() {
  const win = new BrowserWindow({ width: 1200, height: 700, show: false });
  win.loadFile(svgPath);
  win.webContents.once('did-finish-load', async () => {
    try {
      const image = await win.webContents.capturePage();
      fs.writeFileSync(outPath, image.toPNG());
      console.log('Saved PNG to', outPath);
    } catch (e) {
      console.error('Error capturing SVG:', e);
    }
    app.quit();
  });
}

app.whenReady().then(createWindow);
