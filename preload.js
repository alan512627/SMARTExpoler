const { contextBridge, ipcRenderer } = require('electron');

// Expose a small, safe API to the renderer for file operations and basic logging.
contextBridge.exposeInMainWorld('api', {
  readFile: async (filePath) => {
    try {
      ipcRenderer.send('renderer-log', `readFile request: ${filePath}`);
      const res = await ipcRenderer.invoke('read-file', filePath);
      ipcRenderer.send('renderer-log', `readFile response: ${res && res.ok ? 'ok' : 'error'}${res && res.error ? ' - '+res.error : ''}`);
      return res;
    } catch (e) {
      ipcRenderer.send('renderer-log', `readFile exception: ${e && e.message}`);
      throw e;
    }
  }
});
