let selectedWord = "";
let wordHint = "";
let guessedLetters = [];
let wrongGuesses = 0;
let maxAttempts = 7;

const hangmanImage = document.getElementById("hangman-img");
const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");
const hintDisplay = document.getElementById("word-hint");
const attemptsDisplay = document.getElementById("attempts-left");

// Select a random word with its hint
function getRandomWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Initialize the game
function initGame() {
    guessedLetters = [];
    wrongGuesses = 0;
    hangmanImage.src = "images/hangman0.png";
    
    let wordObj = getRandomWord();
    selectedWord = wordObj.word.toUpperCase();
    wordHint = wordObj.hint;

    hintDisplay.innerText = wordHint;
    attemptsDisplay.innerText = maxAttempts;

    displayWord();
    generateKeyboard();
    message.innerText = "";
}

// Display the word with guessed letters
function displayWord() {
    wordDisplay.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

// Generate the keyboard buttons
function generateKeyboard() {
    keyboard.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i);
        let button = document.createElement("button");
        button.innerText = letter;
        button.addEventListener("click", () => handleGuess(letter));
        keyboard.appendChild(button);
    }
}

// Handle letter guess
function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        displayWord();
        if (!wordDisplay.innerText.includes("_")) {
            message.innerText = "🎉 You Won!";
            disableKeyboard();
        }
    } else {
        wrongGuesses++;
        attemptsDisplay.innerText = maxAttempts - wrongGuesses;
        updateHangmanImage();
        if (wrongGuesses === maxAttempts) {
            message.innerText = `☠️ Game Over! The word was: ${selectedWord}`;
            disableKeyboard();
        }
    }
}

// Update Hangman image based on wrong guesses
function updateHangmanImage() {
    hangmanImage.src = `images/hangman${wrongGuesses}.png`;
}

// Disable keyboard after game ends
function disableKeyboard() {
    document.querySelectorAll(".keyboard button").forEach(button => {
        button.disabled = true;
    });
}

// Restart Game
restartBtn.addEventListener("click", initGame);

// Start the game when the page loads
initGame();
