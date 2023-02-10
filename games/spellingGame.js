// Code is assisted by a tutorial on freeCodeCamp found here https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/
// toastr is a JavaScript library that uses non-blocking notifications.
// CSS library Animate.css has nice board animations for a wordle type game.

import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

// Function finds matching image for word
function setImage() {
    let image = document.getElementsByClassName("word-image")[0];
    image.style.backgroundImage = `url('./wordImages/${rightGuessString}.jpg')`;
}

// Creates guess board
function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}

// Event listener for keyboard
document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return;
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter") {
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});

// Event listener for created keyboard
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    }

    if (key === "New Game") {
        restart();
    }

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
});

// Function adds letter into letter square on guess board
function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

// Function deletes last added letter in current guess row
function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter - 1];
    animateCSS(box, "pulse");
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

// Function to check if guess matches word
function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = '';
    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString.length != 5) {
        toastr.error("Not enough letters!");
        return;
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!");
        return;
    }

    
    for (let i = 0; i < 5; i++) {
        let letterColor = '';
        let box = row.children[i];
        let letter = currentGuess[i];
        
        let letterPosition = rightGuess.indexOf(currentGuess[i]);
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey';
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                // shade green (Correct spot and letter)
                letterColor = 'green';
            } else {
                // shade box yellow (Correct letter NOT spot)
                letterColor = 'yellow';
            }

            rightGuess[letterPosition] = "#";
        }

        let delay = 250 * i;
        setTimeout(()=> {
            //flip box
            animateCSS(box, 'flipInX')
            //shade box
            box.style.backgroundColor = letterColor;
            shadeKeyBoard(letter, letterColor);
        }, delay)
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!");
        guessesRemaining = 0;
        return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!");
            toastr.info(`The right word was: "${rightGuessString}"`);
        }
    }
}

// Function updates keyboard when letters have been guessed
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor;
            if (oldColor === 'green') {
                return;
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return;
            }

            elem.style.backgroundColor = color;
            break;
        }
    }
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

// Function for starting a new round
function restart() {
    location.reload();
}

setImage();
initBoard();