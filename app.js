const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restartBtn");
const alertBox = document.querySelector(".alertBox");

//making variables
let currentPlayer = "X";
let nextPlayer = "O";
let playerTurn = currentPlayer;

player1.textContent = `player 1: ${currentPlayer}`;
player2.textContent = `player 2: ${nextPlayer}`;

//function to start your game
const startGame = () => {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
};
const handleClick = (e) => {
  if (e.target.textContent === "") {
    e.target.textContent = playerTurn;
    if (checkWin()) {
      // console.log(`${playerTurn} is a w/inner!`);
      showAlert(`${playerTurn} is a winner!`);
      disableCells();
    } else if (checkTie()) {
      // console.log("it' s a Tie!");

      showAlert("it' s a Tie!");
      disableCells();
    } else {
      changePlayerTurn();
      showAlert(` Turn for player: ${playerTurn} `);
      //  changePlayerTurn();
    }
  }
};

//function to change player turn
const changePlayerTurn = () => {
  // if(playerTurn === currentPlayer){
  //     playerTurn = nextPlayer;
  // }
  // else{
  //     playerTurn = currentPlayer;
  // }
  playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
};
// function to check win
const checkWin = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningConditions.length; i++) {
    const [pos1, pos2, pos3] = winningConditions[i];

    if (
      gameCells[pos1].textContent !== "" &&
      gameCells[pos1].textContent === gameCells[pos2].textContent &&
      gameCells[pos2].textContent === gameCells[pos3].textContent
    ) {
      return true;
    }
    // console.log(`${pos1} ${pos2} ${pos3}`);
  }
  return false;
};
// function to check for s tie
const checkTie = () => {
  let emptyCellsCount = 0;
  gameCells.forEach((cell) => {
    if (cell.textContent == "") {
      emptyCellsCount++;
    }
  });
  return emptyCellsCount === 0 && !checkWin();
};
// function to desable game board cells after a win or a tie
const disableCells = () => {
  gameCells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
    cell.classList.add("disabled");
  });
};

//function to restart game
const restartGame = () => {
  gameCells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });
  startGame();
};

//function to show alert
// alertBox.textContent = msg;

const showAlert = (msg) => {
  alertBox.textContent = msg;

  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 6000);
};
// adding event listener to restart button
restartBtn.addEventListener("click", restartGame);

// calling start game functon
startGame();
