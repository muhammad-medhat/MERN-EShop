import React, { useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { addToCart, removeFromCart, updateCartItem } from "../../actions/cartActions";
import Message from "../message";
import "./cartScreen.css";
const CartScreen = () => {
  const pid = useParams().id;
  const nav = useNavigate()

  const location = useLocation();
  // console.log("location", location);
  // const qty = new URLSearchParams(location.search).get('qty');

  const { search } = useLocation();
  const qty = search ? Number(search.split("=")[1]) : 1;
  // console.log("qty", qty);

  const dispatch = useDispatch();
  // debugger
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (pid) {
      dispatch(addToCart(pid, qty));
    }
  }, [dispatch, pid, qty]);
  // console.log(cartItems);

  const removeFromCart1 = (id) => {
    console.log(`remove ${id}`);
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = (e) => {
    e.preventDefault()
    nav('/shipping')
    console.log(`checkoutHandler `);
  };
  
  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Empty Cart <Link to="/">Home</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <Row key={item.product} className="cart-product">
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
            })}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col xs={12} className="text-center font-bold">
                    <h2>order summery</h2>
                </Col>
                <Col>
                  subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </Col>
              </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Col className="font-bold">
              total $
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}            </Col>
          </ListGroup.Item>
          <ListGroup.Item>
            <Col md={12} className="text-center">
              <Button
                className="btn-block"
                type="button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                proceed to checkout
              </Button>
            </Col>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
