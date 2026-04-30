// Canvas
const { body } = document;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const width = 500;
const height = 700;
const screenWidth = window.screen.width;
const canvasPosition = screenWidth / 2 - width / 2;
const isMobile = window.matchMedia('(max-width: 600px)');
const gameOverEl = document.createElement('div');

// Paddle
const paddleHeight = 10;
const paddleWidth = 50;
const paddleDiff = 25;
let paddleBottomX = 225;
let paddleTopX = 225;
let playerMoved = false;
let paddleContact = false;

// Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 5;

// Speed
let speedY;
let speedX;
let trajectoryX;
let computerSpeed;

// Change Mobile Settings
if (isMobile.matches) {
  speedY = -2;
  speedX = speedY;
  computerSpeed = 4;
} else {
  speedY = -1;
  speedX = speedY;
  computerSpeed = 3;
}

// Score
let playerScore = 0;
let computerScore = 0;
const winningScore = 7;
// let isGameOver = true;
// let isNewGame = true;

// Render Everything on Canvas
function renderCanvas() {
  // Canvas Background
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  // Paddle Color
  context.fillStyle = 'white';

  // Player Paddle (Bottom)
  context.fillRect(paddleBottomX, height - 20, paddleWidth, paddleHeight);

  // Computer Paddle (Top)
  context.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

  // Dashed Center Line
  context.beginPath();
  context.setLineDash([4]);  // 4 pixels per dash
  context.moveTo(0, 350);   // starting point
  context.lineTo(500, 350);   // go to
  context.strokeStyle = 'grey';
  context.stroke();

  // Ball
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false); // 2*Math.PI = startAngle
  context.fillStyle = 'white';
  context.fill();  // using this instead of context.stroke() because we want it to be a solid color

  // Score
  context.font = '32px Courier New';
  context.fillText(playerScore, 20, canvas.height / 2 + 50); // last 2 values are x & y positions
  context.fillText(computerScore, 20, canvas.height / 2 - 30);
}

// Create Canvas Element
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.appendChild(canvas);
  renderCanvas();
}

// Reset Ball to Center
function ballReset() {
  ballX = width / 2;
  ballY = height / 2;
  speedY = -3;
  paddleContact = false;
}

// Adjust Ball Movement
function ballMove() {
  // Vertical Speed
  ballY += -speedY;
  // Horizontal Speed
  if (playerMoved && paddleContact) {
    ballX += speedX;
  }
}

// Determine What Ball Bounces Off, Score Points, Reset Ball
function ballBoundaries() {
  // Bounce off Left Wall
  if (ballX < 0 && speedX < 0) {
    speedX = -speedX;
  }
  // Bounce off Right Wall
  if (ballX > width && speedX > 0) {
    speedX = -speedX;
  }
  // Bounce off player paddle (bottom)
  if (ballY > height - paddleDiff) {
    if (ballX > paddleBottomX && ballX < paddleBottomX + paddleWidth) {
      paddleContact = true;
      // Add Speed on Hit
      if (playerMoved) {
        speedY -= 1;
        // Max Speed
        if (speedY < -5) {
          speedY = -5;
          computerSpeed = 6;
        }
      }
      speedY = -speedY;
      trajectoryX = ballX - (paddleBottomX + paddleDiff);
      speedX = trajectoryX * 0.3;
    } else if (ballY > height) {
      // Reset Ball, add to Computer Score
      ballReset();
      computerScore++;
    }
  }
  // Bounce off computer paddle (top)
  if (ballY < paddleDiff) {
    if (ballX > paddleTopX && ballX < paddleTopX + paddleWidth) {
      // Add Speed on Hit
      if (playerMoved) {
        speedY += 1;
        // Max Speed
        if (speedY > 5) {
          speedY = 5;
        }
      }
      speedY = -speedY;
    } else if (ballY < 0) {
      // Reset Ball, add to Player Score
      ballReset();
      playerScore++;
    }
  }
}

// Computer Movement
function computerAI() {
  if (playerMoved) {
    if (paddleTopX + paddleDiff < ballX) {
      paddleTopX += computerSpeed;
    } else {
      paddleTopX -= computerSpeed;
    }
  }
}

function showGameOverEl(winner) {
  // Hide Canvas

  // // Container
  // gameOverEl.textContent = '';
  // gameOverEl.classList.add('game-over-container');
  // // Title
  // const title = document.createElement('h1');
  // title.textContent = `${winner} Wins!`;
  // // Button
  // const playAgainBtn = document.createElement('button');
  // playAgainBtn.setAttribute('onclick', 'startGame()');
  // playAgainBtn.textContent = 'Play Again';
  // // Append

  
}

// Check If One Player Has Winning Score, If They Do, End Game
function gameOver() {
  // if (playerScore === winningScore || computerScore === winningScore) {
  //   isGameOver = ;
  //   // Set Winner
  //   let winner = ;
  //   showGameOverEl(winner);
  // }
}

// Called Every Frame
function animate() {
  // all these below are going to be called in every frame
  renderCanvas();
  ballMove();   // controls speed. overtimes, speed increases until a max value. changes the x & y values to increase or decrease them, depending on the direction that the ball is currently moving 
  ballBoundaries();  // for the ball to bounce off and change directions. also, if the ball crosses the bottom (y-700) or touched the top (y-0), it means the ball has passed someone's paddle and it increments the score. this is done by this func.
  computerAI(); // computer moves its paddle. but its paddle moves more slowly than the ball (to allow user to beat the computer)
  window.requestAnimationFrame(animate); // going to keep calling itself over and over again in a loop
}

// Start Game, Reset Everything
function startGame() {
  // if (isGameOver && !isNewGame) {


  // }
  // isGameOver = ;
  // isNewGame = ;
  playerScore = 0;
  computerScore = 0;
  ballReset();  // puts the ball in the center and resets its speed
  createCanvas();
  animate();
  // setInterval(animate, 1000/60); // animate() runs 60 times per second (60 frames/s). but use requestAnimationFrame() to make animation smoother
  canvas.addEventListener('mousemove', (e) => {
    // console.log(e.clientX);
    playerMoved = true;  // going to use to only have the computer react if the player made the first move
    // Compensate for canvas being centered
    paddleBottomX = e.clientX - canvasPosition - paddleDiff;
    if (paddleBottomX < paddleDiff) {
      paddleBottomX = 0;
    }
    if (paddleBottomX > width - paddleWidth) {
      paddleBottomX = width - paddleWidth;
    }
    // Hide Cursor
    canvas.style.cursor = 'none';
  });
}

// On Load
startGame();
