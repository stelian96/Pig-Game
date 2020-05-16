/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var activePlayer, score, roundScore, gameIsActive, lastDice;
init();
function init() {
  gameIsActive = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gameIsActive) {
    //Roll Dice
    let dice = Math.floor(Math.random() * 6) + 1;

    //Display Result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // Update result only if dice was NOT 1 and if not two six in a row
    if (dice === 6 && lastDice === 6) {
      //Player loses his GLOBAL score
      scores[activePlayer] += roundScore;
      document.getElementById("score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    }
    lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gameIsActive) {
    //Add CURRENT score to GLOBAL Score
    scores[activePlayer] += roundScore;

    //Update UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;
    // Undefined, 0 , null, or "" are COERCED to false
    //Anything else is true
    if (input) {
      var winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check if the player won
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gameIsActive = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);
