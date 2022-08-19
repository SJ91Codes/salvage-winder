// select buttons and text inputs
const addReelB = document.querySelector(".bigger.home")
const addButton = document.querySelector(".bigger.add")
const cButton = document.querySelector(".smaller.add")
const addScreen = document.querySelector(".addScreen")
const saveButton = document.querySelector(".smaller.home.save")
const loadButton = document.querySelector(".smaller.home.load")
const ui = document.querySelector("#UI")
const oWidth = document.querySelector("#oWidth")
const nWidth = document.querySelector("#nWidth")
const grade = document.querySelector("#grade")
const run = document.querySelector("#run")
//initialise data
let reels = 0
let reelsData = []
let reelsSave = []
let load = false
// set up event listeners
addReelB.addEventListener("click", ()=> addScreen.classList.remove("hidden"))
addButton.addEventListener("click", addReel)
cButton.addEventListener("click", ()=> addScreen.classList.add("hidden"))
saveButton.addEventListener("click", ()=>{
  //save reel data in local storage
  localStorage.setItem("reels", reelsSave)
  localStorage.setItem("num", reels)
})
loadButton.addEventListener("click", loadReels)


// function to read data from text inputs and add to new box on main section
function addReel(){
  //check if loading
  if(load === false){
    // save UI into array for easy retrieval
    reelsData[0] = ui.value
    reelsData[1] = oWidth.value
    reelsData[2] = nWidth.value
    reelsData[3] = grade.value
    reelsData[4] = run.value
  }else if(load ===true){
    
  }
  //make new array of order arrays
  reelsSave[reels] = Array.from(reelsData)
  // create box with seperate divs for specific text
  const orders = document.querySelector(".orders")
  const orderDiv = document.createElement("div")
  const box = document.createElement("div")
  const left = document.createElement("div")
  const right = document.createElement("div")
  const uiDiv = document.createElement("div")
  const oWidthDiv = document.createElement("div")
  const nWidthDiv = document.createElement("div")
  const gradeDiv = document.createElement("div")
  const runDiv = document.createElement("div")
  const buttonDiv = document.createElement("div")
  //create buttons for orders
  const copyButton = document.createElement("button")
  const delButton = document.createElement("button")
  copyButton.innerText="Copy U.I."
  delButton.innerText = "Delete"
  delButton.setAttribute("data-reelNo", reels)
  copyButton.setAttribute("data-reelNo", reels)
  
  // set box and orderDiv attributes
  orderDiv.setAttribute("data-reelNo", reels )
  orderDiv.classList.add("divorder")
  orderDiv.setAttribute("style", "display:flex; justify-content: space-between; width: 90%; gap: 5px;")
  box.setAttribute("class", "box")
  box.setAttribute("data-reelNo", reels )
  box.setAttribute("style", "display:flex; justify-content: space-between")
  // create text nodes from input data
  uiText = document.createTextNode("UI:" + reelsData[0])
  oWidthText = document.createTextNode("Width: " + reelsData[1])
  nWidthText = document.createTextNode("Trim: " + reelsData[2])
  gradeText = document.createTextNode("Grade: " + reelsData[3])
  runText = document.createTextNode("Run: " + reelsData[4])
  //set style of internal divs
  left.setAttribute("style", "display: flex; flex-direction:column")
  right.setAttribute("style", "display: flex; flex-direction:column")
  //populate divs with data
  uiDiv.appendChild(uiText)
  oWidthDiv.appendChild(oWidthText)
  nWidthDiv.appendChild(nWidthText)
  gradeDiv.appendChild(gradeText)
  runDiv.appendChild(runText)
  //populate divs inside box
  left.appendChild(uiDiv)
  left.appendChild(gradeDiv)
  left.appendChild(runDiv)
  right.appendChild(oWidthDiv)
  right.appendChild(nWidthDiv)
  //populate box
  box.appendChild(left)
  box.appendChild(right)
  //add box and buttons to orderDiv
  orderDiv.appendChild(box)
  buttonDiv.appendChild(copyButton)
  buttonDiv.appendChild(delButton)
  orderDiv.appendChild(buttonDiv)
  //add orderDiv to orders
  orders.appendChild(orderDiv)
  //set up function to delete div when button clicked
  delButton.addEventListener("click", ()=>{
    let toDel = delButton.getAttribute("data-reelNo")
    let delObj = document.querySelector(`.divorder[data-reelno = "${toDel}"`)
    orders.removeChild(delObj)
  })
  // set up function to copy UI when button clicked
  copyButton.addEventListener("click", ()=>{
    let toCopy = copyButton.getAttribute("data-reelno")
    navigator.clipboard.writeText(reelsData[toCopy])
    alert("UI:" + reelsData[toCopy] +" copied to clipboard")
  })
  // clear inputs and count up reels
  reels++
  const inputs = document.querySelectorAll(".backgroundAdd input")
  inputs.forEach(input => {
    input.value = ""
  })
}

function loadReels(){
  load = true
  loadString = localStorage.getItem("reels")
  loadNum = localStorage.getItem("num")
  loadSplit = loadString.split(",")
  console.log(loadSplit)
}

