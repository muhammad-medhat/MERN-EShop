import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../../products';
import Product from '../product';
const HomeScreen = () => {
    return ( 
        <>   
        <Row>
            {products.map(product => (
             
                <Col key={product._id} sm={12} md={6} xl={4}>
                    <Product key={product._id} {...product} />
               </Col>
            ))}
        </Row>

        </>
     );
}
 
export default HomeScreen;