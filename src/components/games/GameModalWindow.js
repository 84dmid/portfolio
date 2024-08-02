import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Col, Row, Button } from 'react-bootstrap';

const GameModalWindow = ({ show, setShow, initGame }) => {
    const modalRef = useRef(null);
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: null, height: null });

    useEffect(() => {
        initGame();
    }, [initGame]);

    useEffect(() => {
        const handleResize = () => {
            if (modalRef.current && canvasRef.current) {
                const delta =
                    modalRef.current.scrollHeight - modalRef.current.clientHeight;
                if (delta > 0) {
                    const coefficient =
                        (canvasRef.current.clientHeight - delta) /
                        canvasRef.current.clientHeight;
                    setCanvasSize({
                        height: canvasRef.current.clientHeight - delta,
                        width: canvasRef.current.clientWidth * coefficient,
                    });
                }
            }
        };

        const observer = new ResizeObserver(handleResize);
        if (modalRef.current) observer.observe(modalRef.current);
        if (canvasRef.current) observer.observe(canvasRef.current);

        return () => {
            observer.disconnect();
        };
    }, [show]);

    return (
        <Modal
            centered
            fullscreen="lg-down"
            size="lg"
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Body className="bg-light p-0 m-0 d-flex flex-column" ref={modalRef}>
                <div className="d-flex justify-content-center">
                    <canvas
                        id="canvas"
                        className="d-block mb-2"
                        style={
                            canvasSize.height
                                ? {
                                      height: `${canvasSize.height}px`,
                                      width: `${canvasSize.width}px`,
                                  }
                                : { width: '100%' }
                        }
                        ref={canvasRef}
                    />
                </div>
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
                    className="flex-grow-1 d-flex flex-column justify-content-center pb-2"
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
                                    ↑
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
                                    ←
                                </Button>
                            </Col>
                            <Col className="p-0" xs={4}></Col>
                            <Col className="p-0 text-center" xs={4}>
                                <Button
                                    id="rightButton"
                                    size="lg"
                                    style={{ width: 100, height: 60 }}
                                >
                                    →
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
                                    ↓
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
