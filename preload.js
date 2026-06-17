const { contextBridge, ipcRenderer } = require('electron');

// Expose a small, safe API to the renderer for file operations.
contextBridge.exposeInMainWorld('api', {
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath)
});
