const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    consoleLog: (message) => ipcRenderer.send('console-log', message),
})