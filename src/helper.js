import { cloneDeep, isEqual } from 'lodash';

import { TileModule } from './Tile';

export const generateNewBoard = (size, numOfMines) => {
    const board = [];

    // Generate empty board
    for (let i = 0; i < size; i ++) {
        board[i] = [];
        for (let j = 0; j < size; j ++) {
            board[i][j] = new TileModule(i, j);
        }
    }

    // Randomly generate mines on empty board 
    let counter = 0;
    while (counter < numOfMines) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        if (!board[x][y].isMine) {
            board[x][y].isMine = true;
            counter ++;
        }
    }

    // Calculate the value of all non-mine tiles
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            if (!board[i][j].isMine) {
                for (let x = -1; x < 2; x ++) {
                    for (let y = -1; y < 2; y ++) {
                        const row = i + x;
                        const col = j + y;
                        if (row < 0 || col < 0 || row > size - 1 || col > size - 1) continue;

                        if (board[row][col].isMine) board[i][j].value ++;
                    }
                }
            }
        }
    }

    return board;
};

export const flood = (board, tile) => {
    const newBoard = cloneDeep(board);

    const visited = [];
    const stack = [];

    const {row, col} = tile.position;
    stack.push(newBoard[row][col]);

    const size = newBoard.length;
    
    while (stack.length > 0) {
        const curr = stack.pop();

        curr.isRevealed = true;
        visited.push(curr);

        if (curr.value > 0 || curr.isMine || curr.isFlag) continue;

        const { row: currRow, col: currCol } = curr.position;

        const tileAbove   = currRow > 0        && newBoard[currRow - 1][currCol];
        const tileBeneath = currRow < size - 1 && newBoard[currRow + 1][currCol];
        const tileLeft    = currCol > 0        && newBoard[currRow][currCol - 1];
        const tileRight   = currCol < size - 1 && newBoard[currRow][currCol + 1];

        [tileAbove, tileBeneath, tileLeft, tileRight].forEach(tile => {
            if (tile && !visited.includes(tile)) stack.push(tile);
        });
    }

    return newBoard;
};

export const revealAllMines = board => {
    const newBoard = cloneDeep(board);
    const size = board.length;

    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            const tile = newBoard[i][j];
            if (tile.isMine) tile.isRevealed = true;
        }
    }

    return newBoard;
};

export const isGameover = (board, numOfMines) => {
    const size = board.length;
    let numOfUnrevealedTiles = 0;
    
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            if (!board[i][j].isRevealed) numOfUnrevealedTiles ++;
        }
    }

    if (numOfUnrevealedTiles === numOfMines) return true;

    return false;
};