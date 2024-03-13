'use strict';

// selecting whole player area section elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// selecting total score box elements of each player section
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

// selecting current score box elements of each player section
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
    gameStatus = true;

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

        // 2. if score is greater than 10, current player wins
        if (scores[activePlayer] >= 100) {
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

newBtnEl.addEventListener('click', init);


// covered edge cases 

/*

**** core functionality ****

1. A game should start with initial scores which is 0 and with player 1. 

2. A dice image with random value should appear everytime whenever player clicks on "roll dice" button.

3. As player roles dice, the current score should get updated with dice value, and if in case the dice value turns out to be 1, it should switch to second player. 

4. A player should lose the all current score that he got added if dice value i.e 1 and wont add anything to player's total score unless he presses hold button before the dice value turns out to be i.e 1. 

5. Player current score should be added to total score if he presses hold button. if the score > 10 the current active player wins or else should switch back to different player. 

6. If any player wins, the hold and role dice button shouldnt be working unless he goes for a new game. 

7. On clicking new game, the game should reset back to initial scores i.e 0 and all buttons should be working as usual and should start with player 1 again. 

**** dynamic style chaning functionality ****

1. A white transparent background color should appear on every current active player area, should get removed if gets switch to second player. 

2. If the current player wins, the players area background color should get filled with different unique color. 

3. On reseting game, the white transparent background color should appear on player 1 again. 
*/
