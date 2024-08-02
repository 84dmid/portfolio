import React from 'react';
import gameScreen from './gameScreen.jpg';
import GameCard from '../GameCard.js';

const SnakeCard = () => {
    const initGame = async () => {
        const module = await import('./main.js');
        return module.initGame();
    };

    return <GameCard title="Snake" gameScreen={gameScreen} initGame={initGame} />;
};

export default SnakeCard;
