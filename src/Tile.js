import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    height: 50px;
    width: 50px;
    outline: 1px solid black;

    line-height: 50px;
    text-align: center;
    font-size: 24px;
`;

const Tile = ({tile: {value, isMine, isFlag}}) => {
    let output;
    if (isMine) {
        output = 'M';
    } else if (isFlag) {
        output = 'F';
    } else {
        output = value !== 0 && value;
    }

    return (
        <Div>{output}</Div>
    )
};

export default Tile;

export class TileModule {
    constructor() {
        this._value = 0;
        this._isMine = false;
        this._isFlag = false;
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

    set value(value) {
        this._value = value;
    }

    set isMine(isMine) {
        this._isMine = isMine;
    }

    set isFlag(isFlag) {
        this._isFlag = isFlag;
    }
}