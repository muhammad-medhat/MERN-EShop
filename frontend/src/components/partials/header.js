import React from 'react';
import { Container, Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
    return ( 
        <>
             <Navbar bg="light" expand="lg">
                <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                    <i className="fas fa-home"></i> MERN Shop
                    </Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <LinkContainer to="/cart">
                        <Nav.Link>
                            <i className="fas fa-shopping-cart"></i>cart
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Nav.Link><i className="fas fa-user"></i>login</Nav.Link>
                    </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
     );
}
 
export default Header;