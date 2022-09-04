import React from 'react';
import {
    Row,
    Col,
    Button,
    Form,
    ListGroup,
    ListGroupItem,
  } from "react-bootstrap";
  import Image from "react-bootstrap/Image";
  import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";


const ProductRow = ({item, updateCartItem, removeFromCart}) => {
    const dispatch = useDispatch();

    const removeFromCart1 = (id) => {
        console.log(`remove ${id}`);
        dispatch(removeFromCart(id));
      };
    
    return ( 
        <Row className="cart-product">
        {/* { JSON.stringify(item)} */}
        <Col>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col className="p-title">
          <Link 
            to={`/products/${item.product}`} 
            title={item.name}>
            {item.name}
          </Link>
        </Col>
        <Col>
          <Form.Control
            as="select"
            value={item.qty}
            onChange={(e) => {
              //calling update cart
              dispatch(
                updateCartItem(item.product, Number(e.target.value))
              );
            }}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col>$ {item.price}</Col>
        <Col>
          <Button
            type="button"
            className="danger"
            onClick={() => removeFromCart1(item.product)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
     );
}
 

export default ProductRow;