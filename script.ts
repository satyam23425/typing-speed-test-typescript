const quoteElement = document.getElementById("quote") as HTMLElement
const inputElement = document.getElementById("input") as HTMLTextAreaElement

const timeDisplay = document.getElementById("time") as HTMLElement
const wpmDisplay = document.getElementById("wpm") as HTMLElement
const accuracyDisplay = document.getElementById("accuracy") as HTMLElement

const startBtn = document.getElementById("startBtn") as HTMLButtonElement
const restartBtn = document.getElementById("restartBtn") as HTMLButtonElement

let timer:number
let timeLeft = 60

const texts = [

"The quick brown fox jumps over the lazy dog",

"Typing practice improves your speed and accuracy",

"JavaScript and TypeScript are powerful languages",

"Practice coding daily to improve your problem solving skills",

"Consistency is the key to becoming a great developer",

"Frontend and backend skills together make you a full stack developer"

]

function getRandomText(){

const randomIndex = Math.floor(Math.random()*texts.length)

return texts[randomIndex]

}

function loadQuote(){

const text = getRandomText()

quoteElement.innerHTML = ""

text.split("").forEach(char =>{

const span = document.createElement("span")

span.innerText = char

quoteElement.appendChild(span)

})

}

function startTest(){

inputElement.disabled = false

inputElement.focus()

inputElement.value = ""

clearInterval(timer)

timeLeft = 60

timer = window.setInterval(updateTimer,1000)

}

function updateTimer(){

timeLeft--

timeDisplay.textContent = timeLeft.toString()

calculateStats()

if(timeLeft === 0){

clearInterval(timer)

inputElement.disabled = true

}

}

function calculateStats(){

const quoteChars = quoteElement.querySelectorAll("span")

const inputChars = inputElement.value.split("")

let correct = 0

quoteChars.forEach((charSpan,index)=>{

const typedChar = inputChars[index]

if(typedChar == null){

charSpan.classList.remove("correct","incorrect")

}

else if(typedChar === charSpan.innerText){

charSpan.classList.add("correct")

charSpan.classList.remove("incorrect")

correct++

}

else{

charSpan.classList.add("incorrect")

charSpan.classList.remove("correct")

}

})

const accuracy = Math.round((correct / inputChars.length) * 100)

accuracyDisplay.textContent = isNaN(accuracy) ? "100" : accuracy.toString()

const characters = inputElement.value.length

const words = characters / 5

const minutes = (60 - timeLeft) / 60

const wpm = Math.round(words / minutes)

wpmDisplay.textContent = isNaN(wpm) ? "0" : wpm.toString()

}

function restartTest(){

clearInterval(timer)

timeLeft = 60

timeDisplay.textContent = "60"

wpmDisplay.textContent = "0"

accuracyDisplay.textContent = "100"

inputElement.value = ""

inputElement.disabled = true

loadQuote()

}

startBtn.addEventListener("click",startTest)

restartBtn.addEventListener("click",restartTest)

inputElement.addEventListener("input",calculateStats)

loadQuote()