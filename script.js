var quoteElement = document.getElementById("quote");
var inputElement = document.getElementById("input");
var timeDisplay = document.getElementById("time");
var wpmDisplay = document.getElementById("wpm");
var accuracyDisplay = document.getElementById("accuracy");
var startBtn = document.getElementById("startBtn");
var restartBtn = document.getElementById("restartBtn");
var timer;
var timeLeft = 60;
var texts = [
    "The quick brown fox jumps over the lazy dog",
    "Typing practice improves your speed and accuracy",
    "JavaScript and TypeScript are powerful languages",
    "Practice coding daily to improve your problem solving skills",
    "Consistency is the key to becoming a great developer",
    "Frontend and backend skills together make you a full stack developer"
];
function getRandomText() {
    var randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}
function loadQuote() {
    var text = getRandomText();
    quoteElement.innerHTML = "";
    text.split("").forEach(function (char) {
        var span = document.createElement("span");
        span.innerText = char;
        quoteElement.appendChild(span);
    });
}
function startTest() {
    inputElement.disabled = false;
    inputElement.focus();
    inputElement.value = "";
    clearInterval(timer);
    timeLeft = 60;
    timer = window.setInterval(updateTimer, 1000);
}
function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft.toString();
    calculateStats();
    if (timeLeft === 0) {
        clearInterval(timer);
        inputElement.disabled = true;
    }
}
function calculateStats() {
    var quoteChars = quoteElement.querySelectorAll("span");
    var inputChars = inputElement.value.split("");
    var correct = 0;
    quoteChars.forEach(function (charSpan, index) {
        var typedChar = inputChars[index];
        if (typedChar == null) {
            charSpan.classList.remove("correct", "incorrect");
        }
        else if (typedChar === charSpan.innerText) {
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
            correct++;
        }
        else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct");
        }
    });
    var accuracy = Math.round((correct / inputChars.length) * 100);
    accuracyDisplay.textContent = isNaN(accuracy) ? "100" : accuracy.toString();
    var characters = inputElement.value.length;
    var words = characters / 5;
    var minutes = (60 - timeLeft) / 60;
    var wpm = Math.round(words / minutes);
    wpmDisplay.textContent = isNaN(wpm) ? "0" : wpm.toString();
}
function restartTest() {
    clearInterval(timer);
    timeLeft = 60;
    timeDisplay.textContent = "60";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    inputElement.value = "";
    inputElement.disabled = true;
    loadQuote();
}
startBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", restartTest);
inputElement.addEventListener("input", calculateStats);
loadQuote();
