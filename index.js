const readline = require("readline");

// Configuration
const blockSize = 1;
const total_row = 17;
const total_col = 17;
let speedX = 0;
let speedY = 0;
let gameOver = false;
let interval;

let snakeX = 5;
let snakeY = 5;
let snakeBody = [];
let foodX, foodY;

// Initialize terminal
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
console.clear();

// Handle key inputs
process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") {
        process.exit();
    }

    changeDirection(key.name);
});

function changeDirection(key) {
    if (key === "up" && speedY !== 1) {
        speedX = 0;
        speedY = -1;
    } else if (key === "down" && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    } else if (key === "left" && speedX !== 1) {
        speedX = -1;
        speedY = 0;
    } else if (key === "right" && speedX !== -1) {
        speedX = 1;
        speedY = 0;
    }
}

// Place food at a random location
function placeFood() {
    foodX = Math.floor(Math.random() * total_col);
    foodY = Math.floor(Math.random() * total_row);
}

// Update game state
function update() {
    if (gameOver) {
        clearInterval(interval);
        console.log("\nGame Over!");
        process.exit();
    }

    // Move snake
    snakeX += speedX;
    snakeY += speedY;

    // Check boundaries
    if (snakeX < 0 || snakeX >= total_col || snakeY < 0 || snakeY >= total_row) {
        gameOver = true;
    }

    // Check self-collision
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
        }
    }

    // Eat food
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // Move body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    drawBoard();
}

// Render board to terminal
function drawBoard() {
    console.clear();
    for (let y = 0; y < total_row; y++) {
        let row = "";
        for (let x = 0; x < total_col; x++) {
            if (x === snakeX && y === snakeY) {
                row += "S"; // Snake head
            } else if (x === foodX && y === foodY) {
                row += "F"; // Food
            } else if (snakeBody.some(b => b[0] === x && b[1] === y)) {
                row += "o"; // Snake body
            } else {
                row += ".";
            }
        }
        console.log(row);
    }
}

// Start the game
function startGame() {
    placeFood();
    drawBoard();
    interval = setInterval(update, 100);
}

startGame();
