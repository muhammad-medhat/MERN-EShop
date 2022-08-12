import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import products from '../../products';
import Product from '../product/product';
import { ListProducts } from '../../actions/productActions';
import Loader from '../loader';
import Message from '../message';



const HomeScreen = () => {
    const dispatch=useDispatch();
    const productList = useSelector(state => state.productList)
    console.log(productList);
    const{loading, products, error} = productList;
    console.log(loading, products, error);

    // const [products, setProducts] = useState([]);
    useEffect(() => {
        // fetch('/api/products')
        //     .then(res => res.json())
        //     .then(data => setProducts(data))
        //     .catch(err => console.log(err));
        dispatch(ListProducts());

    }
    , [dispatch])
console.log(error);
    return ( 
        <>   
        {
            loading 
            ? <Loader text="Loading products..." /> 
            : error
            ? <Message variant="danger" text={error} />
            : (<>
                <h2>Latest Products</h2>
                <Row>
                    {products.map(product => (
                    
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            {/* <Product key={product._id} {...product} /> */}
                            <Product  product={product} />
                    </Col>
                    ))}
                </Row>    
                </>            
            )
        }
        </>
     );
}
 
export default HomeScreen;