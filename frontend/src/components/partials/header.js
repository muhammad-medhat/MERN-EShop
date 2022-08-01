import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
const Header = () => {
    return ( 
        <>
             <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Mern Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#link"><i className="fas fa-shopping-cart"></i>cart</Nav.Link>
                        <Nav.Link href="#home"><i className="fas fa-user"></i>login</Nav.Link>

                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
     );
}
 
export default Header;