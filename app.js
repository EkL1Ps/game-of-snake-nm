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
  else if (event.keyCode == 32) dir = "space";
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
      alert(`Game Over! Your finalscore: ${score}; Press f5 to restart`);
    }
  }
}

function drawGame() {
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
  for (let i = 1; i < snake.length; i++) {
    bodySegments.push({ x: snake[i].x, y: snake[i].y });
  }
  function drawBody() {
    for (let i = 0; i < bodySegments.length; i++) {
      ctx.drawImage(snakesBody, bodySegments[i].x, bodySegments[i].y, box, box);
    }
  }

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
    alert(`Game Over! Your finalscore: ${score}; Press f5 to restart`);
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;
  if (dir == "space") {
    clearInterval(drawGame);
    clearInterval(drawBody);
  }

  let newBody = {
    x: snakeX,
    y: snakeY,
  };

  eatBody(newBody, snake);
  youWin();

  snake.unshift(newBody);
}

let game = setInterval(drawGame, 70);
