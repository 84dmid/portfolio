import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import SnakeCard from '../components/games/snake/SnakeCard';
import PacManCard from '../components/games/pacMan/PacManCard';

const Games = () => {
    const games = [<SnakeCard />, <PacManCard />];

    return (
        <Container>
            <Row>
                {games.map((game, index) => (
                    <Col sm={12} md={6} lg={4} key={index + '_game'} className="mb-3">
                        {game}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Games;
