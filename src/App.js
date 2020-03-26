import React from 'react';
import styled from 'styled-components';

import GameBoard from './GameBoard';

const Title = styled.div`
    margin: 50px 0;
    text-align: center;
`;



const App = () => (
    <React.Fragment>
        <Title><h1>MineSweeper</h1></Title>
        <GameBoard/>
    </React.Fragment>
);

export default App;