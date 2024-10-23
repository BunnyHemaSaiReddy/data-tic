const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCellIndex = e.target.getAttribute('data-index');

    if (boardState[clickedCellIndex] || !isGameActive) return;

    boardState[clickedCellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (boardState.every(cell => cell)) {
        statusDisplay.textContent = `It's a draw!`;
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const checkWinner = () => {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
};

const restartGame = () => {
    currentPlayer = 'X';
    boardState = Array(9).fill(null);
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
