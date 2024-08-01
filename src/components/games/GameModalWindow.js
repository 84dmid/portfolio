import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Col, Row, Button } from 'react-bootstrap';

const GameModalWindow = ({ show, setShow, initGame }) => {
    useEffect(() => {
        initGame();
    }, [initGame]);
    return (
        <Modal fullscreen="lg-down" size="md" show={show} onHide={() => setShow(false)}>
            <Modal.Body className="bg-light p-0 m-0 d-flex flex-column">
                <canvas
                    id="canvas"
                    className="w-100 d-block mb-2"
                    style={{ maxHeight: '55vh', objectFit: 'contain' }}
                />
                <div className="d-flex justify-content-between m-2 mb-4">
                    <Button variant="secondary" size="sm" id="startButton">
                        Start / Restart
                    </Button>
                    <Button id="pauseButton" variant="secondary" size="sm">
                        Pause
                    </Button>
                    <Button id="continueButton" variant="secondary" size="sm">
                        Continue
                    </Button>
                    <Button
                        id="exitButton"
                        variant="secondary"
                        size="sm"
                        onClick={() => setShow(false)}
                    >
                        Exit
                    </Button>
                </div>
                <div
                    id="place"
                    className="flex-grow-1 d-flex flex-column justify-content-center"
                >
                    <div id="buttonBlock" style={{ padding: '0 1em' }}>
                        <Row>
                            <Col className="p-0 text-center" xs={4}></Col>
                            <Col className="p-0 text-center" xs={4}>
                                <Button
                                    id="upButton"
                                    size="lg"
                                    style={{ width: 75, height: 75 }}
                                >
                                    🡹
                                </Button>
                            </Col>
                            <Col className="p-0 text-center" xs={4}></Col>
                        </Row>
                        <Row>
                            <Col className="p-0 text-center" xs={4}>
                                <Button
                                    id="leftButton"
                                    size="lg"
                                    style={{ width: 100, height: 60 }}
                                >
                                    🡸
                                </Button>
                            </Col>
                            <Col className="p-0" xs={4}></Col>
                            <Col className="p-0 text-center" xs={4}>
                                <Button
                                    id="rightButton"
                                    size="lg"
                                    style={{ width: 100, height: 60 }}
                                >
                                    🡺
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="p-0 text-center" xs={4}></Col>
                            <Col className="p-0 text-center" xs={4}>
                                <Button
                                    id="downButton"
                                    size="lg"
                                    style={{ width: 75, height: 75 }}
                                >
                                    🡻
                                </Button>
                            </Col>
                            <Col className="p-0 text-center" xs={4}></Col>
                        </Row>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default GameModalWindow;
