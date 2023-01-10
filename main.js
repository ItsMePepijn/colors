import { CSS_COLOR_NAMES } from './colors.js'

let allowed = true

document.addEventListener('click', (e) => {
  if(allowed === false && document.getElementById('delay').checked) return
  if(e.target.tagName !== "BODY") return
  
  addColor(e.clientX, e.clientY)
})

const auto = document.getElementById('auto')
auto.addEventListener('click', async () => {
  while(auto.checked){
    addColor(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
    await new Promise(r => setTimeout(r, (getSpeed() * 0.6) * 1000));
  }
})

let timeout
function setTextTimeout(delay){
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    const title = document.createElement('h1')
    title.innerText = 'Click!'
    document.body.appendChild(title)
  }, delay)
}

function getSpeed(){
  return (5 - ((document.getElementById('speed').value / 100) * 5))
}

function addColor(x, y){
  allowed = false

  const speed = getSpeed()
  console.log(speed)

  const newElement = document.createElement('div')
  newElement.classList.add('color')
  newElement.style.animationDuration =  speed + 's'
  newElement.style.left = (x - (window.innerWidth * 3 / 2)) + 'px'
  newElement.style.top = (y - (window.innerWidth * 3 / 2)) + 'px'
  newElement.style.backgroundColor = CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)]

  document.body.appendChild(newElement)

  setTextTimeout((speed + 5) * 1000)

  setTimeout(() => {
    allowed = true
  }, (speed * 0.6) * 1000);

  setTimeout(() => {
    newElement.remove()
    document.body.style.backgroundColor = newElement.style.backgroundColor

    const title = document.querySelector('h1')
    if(title) title.remove(); 

  }, (speed) * 1000)
}