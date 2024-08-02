import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

import GameModalWindow from './GameModalWindow';

const GameCard = ({ title, gameScreen, initGame }) => {
    const [isShowingGame, setShowingGame] = useState(false);

    return (
        <Card bg="light" text="dark">
            {isShowingGame && (
                <GameModalWindow
                    initGame={initGame}
                    show={isShowingGame}
                    setShow={setShowingGame}
                    title={title}
                />
            )}
            <Card.Header>
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
                <Card.Img
                    src={gameScreen}
                    alt="Game Screen"
                    style={{ height: '420px', objectFit: 'cover' }}
                />
            </Card.Body>
            <Card.Footer className="text-center">
                <Button onClick={() => setShowingGame(true)}>Play</Button>
            </Card.Footer>
        </Card>
    );
};

export default GameCard;
