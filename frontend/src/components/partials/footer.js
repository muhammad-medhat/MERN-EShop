import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
const Footer = () => {
    return ( 
        <>
            <Container>
                <Row>
                    <Col className='text-center  border'>
                        Copyright &copy; 2022 MERN Shop
                    </Col>
                </Row>
                </Container>
        </>
     );
}
 
export default Footer;