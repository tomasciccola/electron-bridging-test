window.onmessage =
/**
 * @params {Object} obj
 * @params {[MessagePort]} obj.ports
*/
({ ports }) => {
  const [ renderPort, workerPort ] = ports
  workerPort.postMessage('hi from renderer!')
  workerPort.onMessage = (e) => {
    console.log('message from worker', e.data)
  }
}
