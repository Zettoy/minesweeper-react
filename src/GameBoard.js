import React, { useState } from 'react';
import styled from 'styled-components';

import Tile from './Tile';
import { generateNewBoard } from './helper';

const Container = styled.div`
    height: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Board = styled.div`
    outline: 2px solid black;

    height: ${({size}) => size * 50}px;
    width: ${({size}) => size * 50}px;

    display: grid;
    grid-template-columns: repeat(${({size}) => size}, 1fr);
`;

const GameBoard = () => {
    const size = 8;
    const numOfMines = 10;

    const [board, setBoard] = useState(generateNewBoard(size, numOfMines));

    return (
        <Container>
            <Board size={size}>
                {board.map((row, keyRow) => (
                    row.map((tile, keyCol) => (
                        <Tile tile={tile} key={`${keyRow}${keyCol}`}></Tile>
                    ))
                ))}
            </Board>
        </Container>
    );
};

export default GameBoard;