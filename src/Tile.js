import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    height: 48px;
    width: 48px;
    border: 1px solid black;

    line-height: 50px;
    text-align: center;
    font-size: 24px;

    position: relative;
`;

const Cover = styled.span`
    height: 48px;
    width: 48px;
    background-color: lightgrey;
    
    position: absolute;
    top: 0;
    left: 0;

    opacity: ${({isRevealed}) => isRevealed ? 0 : 1};
`;

const Tile = ({tile: {value, isMine, isFlag, isRevealed}, onClick}) => {
    let output;
    if (isMine) {
        output = 'M';
    } else if (isFlag) {
        output = 'F';
    } else {
        output = value !== 0 && value;
    }

    return (
        <Div onClick={event => onClick(event)} onContextMenu={event => onClick(event)}>
            {output}
            <Cover isRevealed={isRevealed}>{isFlag && 'F'}</Cover>
            <Cover isRevealed={true}/>
        </Div>
    )
};

export default Tile;

export class TileModule {
    constructor(row, col) {
        this._value = 0;
        this._isMine = false;
        this._isFlag = false;
        this._isRevealed = false;
        this._position = { row, col };
    }

    get value() {
        return this._value;
    }

    get isMine() {
        return this._isMine;
    }

    get isFlag() {
        return this._isFlag;
    }

    get isRevealed() {
        return this._isRevealed;
    }

    get position() {
        return this._position;
    }

    set value(value) {
        this._value = value;
    }

    set isMine(isMine) {
        this._isMine = isMine;
    }

    set isFlag(isFlag) {
        this._isFlag = isFlag;
    }

    set isRevealed(isRevealed) {
        this._isRevealed = isRevealed;
    }
}