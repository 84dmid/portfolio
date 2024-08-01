import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Col, Row, Button } from 'react-bootstrap';

const GameModalWindow = ({ title, show, setShow, initGame }) => {
    useEffect(() => {
        initGame();
    }, [initGame]);
    return (
        <Modal fullscreen="lg-down" size="md" show={show} onHide={() => setShow(false)}>
            <Modal.Header
                closeVariant="white"
                closeButton
                className="bg-dark text-light border-dark"
            >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light p-0">
                <canvas id="canvas" className="w-100 d-block mx-auto mb-2" />
                <div className="d-flex justify-content-between m-2 mb-5">
                    <Button variant="secondary" size="sm" id="startButton">
                        Start / Restart
                    </Button>
                    <Button id="pauseButton" variant="secondary" size="sm">
                        Pause
                    </Button>
                    <Button id="continueButton" variant="secondary" size="sm">
                        Continue
                    </Button>
                </div>
                <div
                    className="d-flex justify-content-center mx-auto mb-5"
                    style={{ width: 135 }}
                >
                    <Row>
                        <Col className="p-0 text-center" xs={4}></Col>
                        <Col className="p-0 text-center" xs={4}>
                            <Button id="upButton" size="lg">
                                🡹
                            </Button>
                        </Col>
                        <Col className="p-0 text-center" xs={4}></Col>
                        <Col className="p-0 text-center" xs={4}>
                            <Button id="leftButton" size="lg">
                                🡸
                            </Button>
                        </Col>
                        <Col className="p-0" xs={4}></Col>
                        <Col className="p-0 text-center" xs={4}>
                            <Button id="rightButton" size="lg">
                                🡺
                            </Button>
                        </Col>
                        <Col className="p-0 text-center" xs={4}></Col>
                        <Col className="p-0 text-center" xs={4}>
                            <Button id="downButton" size="lg">
                                🡻
                            </Button>
                        </Col>
                        <Col className="p-0 text-center" xs={4}></Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default GameModalWindow;
