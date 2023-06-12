const { BrowserWindow, app, ipcMain, MessageChannelMain } = require('electron')
const path = require('path')

app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  await mainWindow.loadFile(path.join(__dirname, 'index.html'))

  const worker = new BrowserWindow({
    show: false,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  await worker.loadFile(path.join(__dirname, 'worker.html'))

  const { port1, port2 } = new MessageChannelMain()
  mainWindow.webContents.postMessage('port', null, [port1])
  worker.webContents.postMessage('port', null, [port2])
})
