// Erick Huerta 10/20/2023

const numOfButtons = 5;
//let arrayOfButtons = [];
// should only have one correct answer per game


let player_score = 0;
let attempts = 0;

let num1, num2, answer;


$(document).ready(function () {
  randomNumButtons();
});

function initializeEquation() {
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;
  answer = num1 * num2;
  document.getElementById('equation').innerHTML = num1 + " * " + num2;
}

// function to generate a random number between 0 and 50 for the random numbers for the buttons
function generateRandomNum() {
  return Math.floor(Math.random() * 50) + 1;
}

// Function to sort the array and add the correct answer
function sortArray() {

  const array = [];
  array.push(answer);

  while (array.length < numOfButtons) {
    const randomNum = generateRandomNum();
    if (!array.includes(randomNum)) {
      array.push(randomNum);
    }
  }
  array.sort(function (a, b) {
    return a - b;
  }); // Sorting the array in ascending order

  return array;
}

function randomNumButtons(product) {

  // initialize the equation and answer
  initializeEquation();

  // call the function to return an array with the final number being included
  const options = sortArray();

  $('#button-container').empty();

  for (let i = 0; i < numOfButtons; i++) {

    const button = $('<button>').text(options[i]).addClass("btn btn-primary");
    // append the button to the container
    button.click(function () {
      gameScore(options[i]);
      randomNumButtons();
    });
    $('#button-container').append(button).append(" ");
  }

}

// function to restart the game
$('#reset').click(function () {
  resetScore();
  resetGame();
});


function resetGame() {


  $('#feedbackCorrect').empty();
  $('#feedbackIncorrect').empty();
  //player_score = 0;
  //attempts = 0;
  // regenerate a new function
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;
  answer = num1 * num2;

  document.getElementById('equation').innerHTML = num1 + " * " + num2;

  randomNumButtons();

  // reset the counters for score and attempts
  //document.getElementById('Score').innerHTML = "Score " + player_score + '/' + attempts;

}

// seperate function to handle resetting the score and the success/wrong messages
function resetScore() {
  player_score = 0;
  attempts = 0;
  $('#feedbackCorrect').empty();
  $('#feedbackIncorrect').empty();
  //document.getElementById('equation').innerHTML = num1 + " * " + num2;

  document.getElementById('Score').innerHTML = "Score " + player_score + '/' + attempts;
}

// function to keep track of a game score
function gameScore(selected) {


  // set the score back to 0/0 and
  if (answer === selected) {
    player_score++;
    $('#feedbackIncorrect').empty();
    $('#feedbackCorrect').append('<h2></h2>').text("Correct!").addClass("text-success");
  } else if (answer !== selected) {
    // add a document query selector (feedback) to say
    // if the answer was right or wrong.
    $('#feedbackCorrect').empty();
    $('#feedbackIncorrect').append('<h2></h2>').text("Wrong. " + num1 + ' * ' + num2 + ' = ' + answer).addClass("text-danger");

  }

  attempts++;

  document.getElementById('Score').innerHTML = "Score" + player_score + " " + '/' + " " + attempts;
  document.getElementById('Score').innerHTML = "Score " + player_score + " / " + attempts;


}



