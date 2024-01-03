// Select all elements with the class "box"
let boxes = document.querySelectorAll(".box");

// Initialize game variables
let turn = "X"; // Current player's turn
let isGameOver = false; // Flag to check if the game is over

// Event listener for each box element
boxes.forEach((e) => {
  // Clear the initial content of each box
  e.innerHTML = "";

  // Add click event listener to each box
  e.addEventListener("click", () => {
    // Check if the game is not over and the clicked box is empty
    if (!isGameOver && e.innerHTML === "") {
      // Set the content of the clicked box to the current player's turn
      e.innerHTML = turn;

      // Check for a win or draw
      checkWin();
      checkDraw();

      // Switch to the next player's turn
      changeTurn();
    }
  });
});

// Function to switch the turn to the next player
function changeTurn() {
  // Switch between "X" and "O"
  if (turn === "X") {
    turn = "O";
    document.querySelector(".bg").style.left = "85px"; // Move indicator to "O"
  } else {
    turn = "X";
    document.querySelector(".bg").style.left = "0"; // Move indicator to "X"
  }
}

// Function to check for a win
function checkWin() {
  // Array of winning combinations (indices)
  let winningProbability = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Iterate through each winning combination
  for (let i = 0; i < winningProbability.length; i++) {
    // Get the values in the current combination
    let v0 = boxes[winningProbability[i][0]].innerHTML;
    let v1 = boxes[winningProbability[i][1]].innerHTML;
    let v2 = boxes[winningProbability[i][2]].innerHTML;

    // Check if all values are the same and not empty
    if (v0 != "" && v0 === v1 && v0 === v2) {
      // Mark the game as over
      isGameOver = true;

      // Display the winner
      document.querySelector("#results").innerHTML = turn + " wins";

      // Display the "Play Again" button
      document.querySelector("#play-again").style.display = "inline";

      // Highlight the winning combination
      for (j = 0; j < 3; j++) {
        boxes[winningProbability[i][j]].style.backgroundColor = "#08D9D6";
        boxes[winningProbability[i][j]].style.color = "#000";
      }
    }
  }
}

// Function to check for a draw
function checkDraw() {
  if (!isGameOver) {
    let isDraw = true;

    // Check if any box is still empty
    boxes.forEach((e) => {
      if (e.innerHTML === "") isDraw = false;
    });

    // If all boxes are filled and no winner, mark the game as a draw
    if (isDraw) {
      isGameOver = true;
      document.querySelector("#results").innerHTML = "Draw";
      document.querySelector("#play-again").style.display = "inline";
    }
  }
}

// Event listener for the "Play Again" button
document.querySelector("#play-again").addEventListener("click", () => {
  // Reset game variables
  isGameOver = false;
  turn = "X";
  document.querySelector(".bg").style.left = "0";
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#play-again").style.display = "none";

  // Reset each box's content and styling
  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "#fff";
  });
});
