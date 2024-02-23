'use strict';

// DOM - > connection point between html docs and javascript code, it is automatically created by the browser as soon as the html page loads. 

let secretNumber = null;
let currentScore = 20;
let currentHighScore = 0;
let currentGameStatus = 1; // 1 -> in progress, 0 -> finished

const scoreBox = document.querySelector('.score');
const messageBox = document.querySelector(".message");
const numberBox = document.querySelector(".number");
const highScoreBox = document.querySelector(".highscore");


// displays message to browser
const displayMessage = (message) => messageBox.textContent = message;

// set new secretNumber 
const setSecretNumber = () => secretNumber = Math.trunc(Math.random() * 20) + 1;

// setting page styles
const setPageStyle = (color, width) => {
    document.querySelector("body").style.backgroundColor = color
    numberBox.style.width = width;
}

// invoking function intially
setSecretNumber();

document.querySelector(".check").addEventListener("click", () => {
    const guess = Number(document.querySelector(".guess").value);


    if (!guess || !currentGameStatus) {
        !guess ? displayMessage("No Number") : displayMessage("Game is finished, click on again button to restart game");
    }
    else if (guess === secretNumber) {
        numberBox.textContent = secretNumber;
        displayMessage("Congrats, you have won the game");
        setPageStyle('#60b347', '30rem');
        currentGameStatus = 0;
        if (currentScore > currentHighScore) {
            highScoreBox.textContent = currentScore;
            currentHighScore = currentScore;
        }
    }
    else if (guess !== secretNumber || currentScore > 1) {
        displayMessage(guess > secretNumber ? "Number is too high" :
            "Number is too low");
        currentScore--;
        scoreBox.textContent = currentScore;
    }
    else {
        displayMessage("You have lost the game");
        scoreBox.textContent = 0;
        currentGameStatus = 0;
    }
});



document.querySelector(".again").addEventListener("click", () => {
    currentGameStatus = 1;
    currentScore = 20;
    setSecretNumber();
    displayMessage("Start guessing...")
    numberBox.textContent = "?";
    scoreBox.textContent = currentScore;
    document.querySelector(".guess").value = '';
    setPageStyle('#222', '15rem');
})


// old code 

// else if (guess > secretNumber) {
//     if (currentScore > 1) {
//         messageBox.textContent = "Number is too high";
//         currentScore--;
//         scoreBox.textContent = currentScore;
//     }
//     else {
//         messageBox.textContent = "You have lost the game";
//         scoreBox.textContent = 0;
//         currentGameStatus = 0;
//     }
// }
// else if (guess < secretNumber) {
//     if (currentScore > 1) {
//         messageBox.textContent = "Number is too low";
//         currentScore--;
//         scoreBox.textContent = currentScore;
//     }
//     else {
//         messageBox.textContent = "You have lost the game";
//         scoreBox.textContent = 0;
//         currentGameStatus = 0;
//     }
// }