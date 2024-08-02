import React from 'react';

import gameScreen from './gameScreen.jpg';
import GameCard from '../GameCard.js';

const PacManCard = () => {
    const initGame = async () => {
        const module = await import('./main.js');
        return module.initGame();
    };

    return <GameCard title="PacMan" gameScreen={gameScreen} initGame={initGame} />;
};

export default PacManCard;
