import React, { useState } from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';

import Tile from './Tile';
import {
    generateEmptyBoard,
    generateMinesOnBoard,
    flood,
    revealAllMines,
    flagAndUnflag,
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
    const [board, setBoard] = useState(generateEmptyBoard(size));
    const [isFirstClick, setIsFirstClick] = useState(true);

    const handleClick = (event, tile) => {
        event.preventDefault();

        if (tile.isRevealed || gameover) return;

        const newBoard = cloneDeep(board);

        if (event.type === 'contextmenu') {
            flagAndUnflag(newBoard, tile);

        } else {
            if (tile.isFlag) return;

            if (isFirstClick) {
                generateMinesOnBoard(newBoard, numOfMines, tile.position)
                setIsFirstClick(false);
            }

            if (tile.isMine) {
                setGameover(true);
                revealAllMines(newBoard)

            } else {
                flood(newBoard, tile);
            }

        }

        setGameover(isGameover(newBoard, numOfMines));
        setBoard(newBoard);
    };

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