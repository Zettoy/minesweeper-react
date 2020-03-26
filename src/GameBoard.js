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
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Board = styled.div`
    margin: 20px 0;

    outline: 1px solid black;

    height: ${({size}) => size * 50}px;
    width: ${({size}) => size * 50}px;

    display: grid;
    grid-template-columns: repeat(${({size}) => size}, 1fr);
`;

const GameBoard = () => {
    const [size, setSize] = useState(8);
    const [numOfMines, setNumOfMines] = useState(10);

    const [gameover, setGameover] = useState(false);
    const [board, setBoard] = useState(generateEmptyBoard(size));
    const [isFirstClick, setIsFirstClick] = useState(true);

    const newGame = () => {
        setGameover(false);
        setBoard(generateEmptyBoard(size));
        setIsFirstClick(true);
    };

    const handleClick = (event, tile) => {
        event.preventDefault();

        if (tile.isRevealed || gameover) return;

        const newBoard = cloneDeep(board);

        if (event.type === 'contextmenu') {
            flagAndUnflag(newBoard, tile);

        } else {
            if (tile.isFlag) return;
            if (tile.isMine) {
                revealAllMines(newBoard)
                setBoard(newBoard);
                setGameover(true);
                return;
            }

            if (isFirstClick) {
                generateMinesOnBoard(newBoard, numOfMines, tile.position)
                setIsFirstClick(false);
            }

            flood(newBoard, tile);
        }

        setBoard(newBoard);
        setGameover(isGameover(newBoard));
    };

    return (
        <Container>
            <div>
                <label>Size:</label>
                <input onChange={event => setSize(event.target.value)}/>
                <label>Mines:</label>
                <input onChange={event => setNumOfMines(event.target.value)}/>
                <button onClick={newGame}>New Game</button>
            </div>
            <Board size={board.length}>
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