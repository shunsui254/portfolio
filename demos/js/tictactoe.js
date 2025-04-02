// Game state variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 board
let gameActive = true;

// Create and render game board
function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = gameBoard.map((cell, index) => `
        <button class="cell" onclick="makeMove(${index})">${cell}</button>
    `).join('');
}

// Handle player moves
function makeMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        createBoard();

        if (checkWin()) {
            document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            document.getElementById('status').textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check for winning combinations
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

// Reset game to initial state
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

// Initialize game on load
createBoard();