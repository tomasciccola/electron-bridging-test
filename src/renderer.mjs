async function main(){
let count = 0
  let countNode = document.querySelector('p')
  const update = () => {
    count += 1
    countNode.innerHTML = `the count is ${count}`
  }
  setInterval(() =>{
    update()
  }, 100)

  setTimeout(async () => {
  const res = await window.api.blockEverything()
  console.log('res', res)
  })
}
window.onload = main
