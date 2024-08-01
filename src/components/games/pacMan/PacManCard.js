import React from 'react';

import gameScreen from './gameScreen.jpg';
import GameCard from '../GameCard.js';

const PacManCard = () => {
    const initGame = () => {
        import('./main.js').then((module) => {
            module.initGame();
        });
    };

    return <GameCard title="PacMan" gameScreen={gameScreen} initGame={initGame} />;
};

export default PacManCard;
