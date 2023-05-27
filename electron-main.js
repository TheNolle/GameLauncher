const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, './public/favicon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'electron-preloader.js')
        },
    })

    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') mainWindow.loadURL('http://localhost:45678/')
    else mainWindow.loadFile(path.join(__dirname, './dist/index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
})

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })

ipcMain.on('console-log', (event, message) => console.log(message))
