import { TileModule } from './Tile';

export const generateEmptyBoard = size => {
    const board = [];

    for (let i = 0; i < size; i ++) {
        board[i] = [];
        for (let j = 0; j < size; j ++) {
            board[i][j] = new TileModule(i, j);
        }
    }

    return board;
};

export const generateMinesOnBoard = (board, numOfMines, clickPosition) => {
    const size = board.length;

    // Randomly generate mines on empty board
    let counter = 0;
    while (counter < numOfMines) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);

        if (clickPosition.row === y && clickPosition.col === x) continue;

        if (!board[y][x].isMine) {
            board[y][x].isMine = true;
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
};

export const flood = (board, tile) => {
    const visited = [];
    const stack = [];

    const { row, col } = tile.position;
    stack.push(board[row][col]);

    const size = board.length;
    
    while (stack.length > 0) {
        const curr = stack.pop();
        visited.push(curr);

        curr.isRevealed = true;
        curr.isFlag = false;

        if (curr.value > 0) continue;

        const { row: currRow, col: currCol } = curr.position;

        const tileAbove   = currRow > 0        && board[currRow - 1][currCol];
        const tileBeneath = currRow < size - 1 && board[currRow + 1][currCol];
        const tileLeft    = currCol > 0        && board[currRow][currCol - 1];
        const tileRight   = currCol < size - 1 && board[currRow][currCol + 1];

        [tileAbove, tileBeneath, tileLeft, tileRight].forEach(tile => {
            if (tile && !visited.includes(tile)) stack.push(tile);
        });
    }
};

export const revealAllMines = board => {
    const size = board.length;

    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            const tile = board[i][j];
            if (tile.isMine) tile.isRevealed = true;
        }
    }
};

export const flagAndUnflag = (board, tile) => {
    const { row, col } = tile.position;
    board[row][col].isFlag = !board[row][col].isFlag;
};

export const isGameover = (board, numOfMines) => {
    const size = board.length;
    let numOfUnrevealedTiles = 0;
    let numOfFlags = 0;
    
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            if (!board[i][j].isRevealed) numOfUnrevealedTiles ++;
            if (board[i][j].isFlag) numOfFlags ++;
        }
    }

    if (numOfUnrevealedTiles === numOfMines && numOfMines === numOfFlags) return true;

    return false;
};