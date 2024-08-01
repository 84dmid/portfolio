import React from 'react';
import gameScreen from './gameScreen.jpg';
import GameCard from '../GameCard.js';

const SnakeCard = () => {
    const initGame = () => {
        import('./main.js').then((module) => {
            module.initGame();
        });
    };

    return <GameCard title="Snake" gameScreen={gameScreen} initGame={initGame} />;
};

export default SnakeCard;
