import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar variant="dark" bg="dark" className="mb-3 p-2">
            <Container>
                <div className="w-100 d-flex flex-column flex-sm-row">
                    <Navbar.Brand href="/">Дмитрий Ерёмин</Navbar.Brand>
                    <Nav className="w-100 d-flex flex-column flex-sm-row justify-content-end">
                        <Link to="/" className="nav-link">
                            Игры
                        </Link>
                        <Link to="/ees-calculator" className="nav-link">
                            Расчёты ИЭИ
                        </Link>
                        <Link to="/unfinished" className="nav-link">
                            Незавершенное
                        </Link>

                        <Link to="/about-me" className="nav-link">
                            О себе
                        </Link>
                    </Nav>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavBar;
