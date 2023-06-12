async function main(){
let count = 0
  const countNode = document.querySelector('p')
  const button = document.querySelector('button')
  const update = () => {
    count += 1
    countNode.innerHTML = `the count is ${count}`
  }
  const updateButton = () => {
    const num = Math.random()
    console.log('num', num)
    button.innerHTML = `click! ${num}`
  }
  button.addEventListener('click', updateButton)
  setInterval(() => {
    update()
  }, 100)
  const res = await window.api.blockEverything()
  console.log('res', res)

}
window.onload = main
