let blockSize = 25;
let total_row = 17; // total row number
let total_col = 17; // total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let appleImg = new Image();
appleImg.src = "apple.png";


let speedX = 0;  // speed of snake in x direction
let speedY = 0;  // speed of snake in y direction

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let score = 0;
window.onload = function () {
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 300); // 100 ms = 10 FPS
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "#d2b48c";
    context.fillRect(0, 0, board.width, board.height);

    // Draw food as an orange circle (or apple-like color)
   context.drawImage(appleImg, foodX, foodY, blockSize, blockSize);



    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        score++;  // Increment score
    document.getElementById("score").innerText = score;
     // Update score display
    
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    context.fillStyle = "#00FF00"; // light green for head
    context.beginPath();
    context.arc(snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = "#00FF00"; // darker green for body
    for (let i = 0; i < snakeBody.length; i++) {
    context.beginPath();
    context.arc(snakeBody[i][0] + blockSize / 2, snakeBody[i][1] + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
    context.fill();
}


    if (
        snakeX < 0 || snakeX >= total_col * blockSize ||
        snakeY < 0 || snakeY >= total_row * blockSize
    ) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && speedY !== 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code === "ArrowDown" && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code === "ArrowLeft" && speedX !== 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code === "ArrowRight" && speedX !== -1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}
document.getElementById("restartBtn").addEventListener("click", () => {
    // Reset snake position and speed
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;

    // Clear snake body
    snakeBody = [];

    // Place new food
    placeFood();

    // Reset game over flag
    gameOver = false;
});