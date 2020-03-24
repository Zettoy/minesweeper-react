import { TileModule } from './Tile';

export const generateNewBoard = (size, numOfMines) => {
    const board = [];

    // Generate empty board
    for (let i = 0; i < size; i ++) {
        board[i] = [];
        for (let j = 0; j < size; j ++) {
            board[i][j] = new TileModule();
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

    // Calculate the value for all non-mine tiles
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
}