// preload.js
const { contextBridge, ipcRenderer } = require('electron')

// CHANGE 'storage' to 'myStorage' here
contextBridge.exposeInMainWorld('myStorage', {  // ← CHANGED
    set: (key, value) => ipcRenderer.send('storage-set', { key, value }),
    get: (key) => ipcRenderer.invoke('storage-get', { key }),
    delete: (key) => ipcRenderer.send('storage-delete', { key }),
    clear: () => ipcRenderer.send('storage-clear')
})

console.log('✅ Preload loaded!')