const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "images/game-ground.png";

const foodImg = new Image();
foodImg.src = "images/cherry-food.png";

const snakesHead = new Image();
snakesHead.src = "images/logo.png";
const snakesBody = new Image();
snakesBody.src = "images/snakes-body.png";

isPaused = false;
isGameOver = false;

let box = 32;
let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};
let bodySegments = [];

document.addEventListener("keydown", direction);

let dir;
function direction(event) {
  if (event.keyCode == 37 && dir != "right") dir = "left";
  else if (event.keyCode == 38 && dir != "down") dir = "up";
  else if (event.keyCode == 39 && dir != "left") dir = "right";
  else if (event.keyCode == 40 && dir != "up") dir = "down";
  else if (event.keyCode == 32 && isGameOver == false) {
    if (isPaused) {
      isPaused = false;
      game = setInterval(drawGame, 70);
    } else {
      isPaused = true;
      clearInterval(game);
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.fillStyle = "yellow";
      ctx.lineWidth = "1";
      ctx.rect(5 * box, 9 * box, 9 * box, 3 * box);
      ctx.fill();
      ctx.stroke();
      ctx.font = "50px Roboto Red";
      ctx.fillStyle = "red";
      ctx.fillText("Pause", 7.8 * box, 11 * box);
    }
  }
}
function gameOverItx() {
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.fillStyle = "yellow";
  ctx.lineWidth = "1";
  ctx.rect(3 * box, 8 * box, 13 * box, 5 * box);
  ctx.fill();
  ctx.stroke();
  ctx.font = "40px Roboto Red";
  ctx.fillStyle = "red";
  ctx.fillText("Game Over!", 6.8 * box, 9.5 * box);
  ctx.font = "30px Roboto Red";
  ctx.fillText(`Your finalscore: ${score};`, 6 * box, 12 * box);
}

function youWin() {
  if (score == 50) {
    clearInterval(game);
    alert(
      `Congratulations! You win! You got ${score} score; Press f5 to play again`
    );
  }
}

function eatBody(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      gameOverItx();
      isGameOver = true;
    }
  }
}

function drawGame() {
  if (!isPaused) {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
      ctx.drawImage(
        i == 0 ? snakesHead : snakesBody,
        snake[i].x,
        snake[i].y,
        box,
        box
      );
    }
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "50px Roboto";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //score counter
    if (snakeX == food.x && snakeY == food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
    } else {
      snake.pop();
    }

    if (
      snakeX < box ||
      snakeX > box * 17 ||
      snakeY < 3 * box ||
      snakeY > box * 17
    ) {
      clearInterval(game);
      gameOverItx();
      isGameOver = true;
    }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;
    if (dir == "space") {
      clearInterval(drawGame);
      pausedSnakeHead = { x: snakeX, y: snakeY };
      pausedSnakeBody = bodySegments.slice();
    }

    let newBody = {
      x: snakeX,
      y: snakeY,
    };

    eatBody(newBody, snake);
    youWin();

    snake.unshift(newBody);
    bodySegments.unshift({ x: snakeX, y: snakeY });
  }
}

let game = setInterval(drawGame, 70);
