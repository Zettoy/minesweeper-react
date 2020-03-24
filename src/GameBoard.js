import React, { useState } from 'react';
import styled from 'styled-components';

import Tile from './Tile';
import {
    generateNewBoard,
    flood,
    revealAllMines,
    isGameover
} from './helper';

const Container = styled.div`
    height: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Board = styled.div`
    outline: 1px solid black;

    height: ${({size}) => size * 50}px;
    width: ${({size}) => size * 50}px;

    display: grid;
    grid-template-columns: repeat(${({size}) => size}, 1fr);
`;

const GameBoard = () => {
    const size = 8;
    const numOfMines = 10;

    const [gameover, setGameover] = useState(false);
    const [board, setBoard] = useState(generateNewBoard(size, numOfMines));

    const handleClick = (event, tile) => {
        event.preventDefault();

        if (event.type === 'contextmenu') {
            // TODO: flag
            return;
        }

        if (tile.isRevealed || tile.isFlag || gameover) return;

        if (tile.isMine) {
            setGameover(true);
            setBoard(revealAllMines(board));

        } else {
            const newBoard = flood(board, tile);
            setBoard(newBoard);
            setGameover(isGameover(newBoard, numOfMines));
        }
    }

    return (
        <Container>
            <Board size={size}>
                {board.map((row, keyRow) => (
                    row.map((tile, keyCol) => (
                        <Tile
                            tile={tile}
                            key={`${keyRow}${keyCol}`}
                            onClick={event => handleClick(event, tile)}
                        />
                    ))
                ))}
            </Board>
        </Container>
    );
};

export default GameBoard;