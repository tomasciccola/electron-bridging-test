const { ipcRenderer, contextBridge } = require('electron')
const { createServer, createClient } = require('rpc-reflector')
const windowLoaded = new Promise((resolve) => {
  window.onload = resolve
})

const api = {
  /** @param {String} who */
  greet: (who) => `hi ${who}!`,
  greetAsync: (who) => new Promise((res, rej) => {
    setTimeout(() => res(`hi ${who}!`), 1000)
  })
}

ipcRenderer.on('port-renderer', async (e) => {
  await windowLoaded
  contextBridge.exposeInMainWorld('createClient', createClient)
  window.postMessage('port', '*', e.ports)
  console.log('client', createClient(e.ports[0]))
})

ipcRenderer.on('port-worker', async (e) => {
  await windowLoaded
  const [msgChannel] = e.ports
  const clientApi = createServer(api, msgChannel)
  console.log('api', clientApi)
  // contextBridge.exposeInMainWorld('createServer', createServer)
  // contextBridge.exposeInMainWorld('api', api)
  window.postMessage('port', '*', e.ports)
})
