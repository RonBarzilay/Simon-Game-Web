var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(300)
    .fadeIn(300);
  playSound(randomChosenColour);
  // Increase game level by 1
  level += 1;
  // Update h1 title to its new game level
  updateTitle("Level " + level);
}

// On first game keypress, start the game with nextSequence()
// and update h1 title to level 0
$(document).on("keydown", function () {
  // Check if game not started yet
  if (!gamePattern.length) {
    nextSequence();
    updateTitle("Level 1");
  }
});

$(".container .btn").on("click", function (event) {
  // Here I get the user choice color (button id)
  var userChosenColour = event.target.id;
  // I add the colour to the user array of clicks (pattern)
  userClickedPattern.push(userChosenColour);
  // Play sound on button pressed
  playSound(userChosenColour);
  // Animate button pressed
  animatePress(userChosenColour);
  // Check user answer
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  // Remove pressed class (shadow and background-color) after 100ms
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function updateTitle(title) {
  $("#level-title").text(title);
}

function checkAnswer(index) {
  // Is same answer?
  if (userClickedPattern[index] == gamePattern[index]) {
    console.log("success");
  } else {
    // return false so Do Not continue to Is level done check
    wrongAnswer();
    return false;
  }
  // Is level done?
  if (index == gamePattern.length - 1) {
    correctAnswer();
  }
}

function correctAnswer() {
  console.log("Ready for next level?");
  setTimeout(() => {
    // Reset the userClickedPattern array to start a new level pattern
    userClickedPattern = [];
    nextSequence();
  }, 1000);
}

// Let user know he's wrong and call startOver function
function wrongAnswer() {
  console.log("wrong");
  playSound("wrong");
  startOver();
}

// Flash effect when game is over
function gameOverAnimation() {
  $("body").addClass("game-over");
  // Remove game-over class (opacity and background-color) after 200ms
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  gameOverAnimation();

  // Update h1 title to Game Over...
  updateTitle("Game Over, Press Any Key to Restart");

  // Reset the gamePattern array to start a new game
  // and enable any key to restart
  gamePattern = [];

  // Reset level
  level = 0;

  // Reset the userClickedPattern array to start a new game
  userClickedPattern = [];
}
