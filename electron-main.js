const { app, BrowserWindow, protocol } = require('electron')
const path = require('path')
const fs = require('fs')

const appdata = app.getPath('appData')
const roaming = path.join(appdata, 'gamelauncher')
if (!fs.existsSync(roaming)) fs.mkdirSync(roaming)
const locallow = path.join(path.join(appdata, '..'), 'LocalLow', 'gamelauncher')
if (!fs.existsSync(locallow)) fs.mkdirSync(locallow)
const temp = path.join(app.getPath('temp'), 'gamelauncher')
if (!fs.existsSync(temp)) fs.mkdirSync(temp)

function createWindow() {
    const mainWindow = new BrowserWindow({
        title: 'NoPack',
        icon: path.join(__dirname, './public/favicon.ico'),
        center: true,
        darkTheme: true,
        minWidth: 1024,
        width: 1024,
        minHeight: 600,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            webSecurity: false,
            contextIsolation: true,
            devTools: true,
            preload: path.join(__dirname, 'electron-preloader.js')
        },
    })

    mainWindow.setMenuBarVisibility(false)
    // mainWindow.setMenu(null)

    process.env.NODE_ENV === 'development' ? mainWindow.loadURL('http://localhost:45678/') : mainWindow.loadFile(path.join(__dirname, './dist/index.html'))
    protocol.registerFileProtocol('file', (request, callback) => callback(decodeURI(request.url.replace('file:///', ''))))
    app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
    app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : null)
}

app.on('ready', () => createWindow())
