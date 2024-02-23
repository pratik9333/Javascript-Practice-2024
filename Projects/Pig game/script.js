'use strict';

// selecting whole player area section elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// selecting total score box of each player section
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

// selecting current score box of each player section
const currentEl0 = document.getElementById("current--0");
const currentEl1 = document.getElementById("current--1");

// selecting button elements available in game 
const diceEl = document.querySelector(".dice");
const rollingDiceBtn = document.querySelector(".btn--roll");
const newBtnEl = document.querySelector(".btn--new");
const btnHoldEl = document.querySelector(".btn--hold");

let gameStatus, currentScore, activePlayer, scores;

// Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();


const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

// rolling dice functionality 
rollingDiceBtn.addEventListener("click", function () {

    if (gameStatus) {
        // 1. generating a random dice roll
        const randomNumber = Math.trunc(Math.random() * 6) + 1;

        // 2. display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${randomNumber}.png`;

        // 3. check for the rolled 1
        if (randomNumber !== 1) {
            // add dice to current score 
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // switch to next player
            switchPlayer();
        }
    }
})

btnHoldEl.addEventListener("click", () => {
    if (gameStatus) {
        // 1. adding current score to total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. if score is greater than 100, current player wins
        if (scores[activePlayer] >= 10) {
            // finish the game
            diceEl.classList.remove("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            gameStatus = false;
        }
        else {
            // 3. or else we switch the player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);


// newBtnEl.addEventListener("click", () => {
//     currentScore = 0;
//     activePlayer = 0;
//     currentEl0.textContent = 0;
//     currentEl1.textContent = 0;
// })
