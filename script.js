const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const progress = document.getElementById("progress");

// List of words for the game
const words = [
"Aizen",  
"Tense",  
"Airplane",  
"Ball",  
"Singhariya",  
"Juice",  
"Warlike",  
"SoulSociety",  
"Sukuna",  
"Dependent",  
"Steer",  
"Silver",  
"Highfalutin",  
"Superficial",  
"Quince",  
"Gorakhpur",  
"Feeble",  
"Admit",  
"Gojo",  
"Loving",
"Asus",
"Alright",
"Thermodynamics",
"Misunderstanding",
"Uncharacteristically",
"Pseudopseudohypoparathyroidism",





];

let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

let timeInterval;

// Get a random word from the array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add a random word to the DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Update the score
function updateScore() {
  score++;
  scoreElement.innerText = score;
}

// Update the timer and progress bar
function updateTime() {
  time--;
  timeElement.innerText = time + "s";
  progress.style.width = `${(time / 10) * 100}%`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// End the game
function gameOver() {
  endgameElement.innerHTML = `
    <h1>Game Over!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;
  endgameElement.style.display = "flex";
}

// Event listener for typing input
text.addEventListener("input", (e) => {
  const insertedText = e.target.value.trim(); 
  if (insertedText === randomWord) {
    e.target.value = ""; 
    addWordToDom(); 
    updateScore(); 

    // difficulty
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5;

    updateTime(); // update the timer
  }
});

// toggle settings visibility
settingsButton.addEventListener("click", () =>
  settings.classList.toggle("hide")
);

// update difficulty setting
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Initialize the game
function init() {
  difficultySelect.value = difficulty;
  addWordToDom();
  text.focus();
  timeInterval = setInterval(updateTime, 1000);
}

// Start the game
init();