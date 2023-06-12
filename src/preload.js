const { ipcRenderer } = require('electron')
const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

ipcRenderer.on('port', async (e) => {
  await windowLoaded
  window.postMessage('port', '*', e.ports)
})
