import React, { useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../../../actions/cartActions";
import Message from "../../message";
import "./cartScreen.css";
import ProductRow from "../../com/productRow";
import FormContainer from "../../formContainer";
const CartScreen = () => {
  // debugger
  const { id: pid } = useParams();
  const nav = useNavigate();

  const { search } = useLocation();
  const qty = search ? Number(search.split("=")[1]) : 1;
  console.log("search", search);

  const dispatch = useDispatch();
  // debugger
  const cart = useSelector((state) => state.cart);
  const { cartItems=[]} = cart; //default to an empty array

  useEffect(() => {
    if (pid) {
      dispatch(addToCart(pid, qty));
    }
    console.log("cartItems", cartItems);
  }, [dispatch, pid, qty]);
  console.log(cartItems);

  const checkoutHandler = (e) => {
    e.preventDefault();
    nav("/shipping");
    // console.log(`checkoutHandler `);
  };
  // return(
  //   <>{JSON.stringify(cartItems)}</>
  // )
  return cartItems?.length === 0 ? (
    <Row>
      <Col>
      <FormContainer>
        <Message>
          <h3>Empty Cart</h3>
          <Link to="/">browse products</Link>
        </Message>        
      </FormContainer>

      </Col>
    </Row>
  ) : (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          {cartItems && cartItems.map((item) => {
            return (
              <ProductRow
                key={item.product}
                item={item}
                updateCartItem={updateCartItem}
                removeFromCart={removeFromCart}
              />
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
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{" "}
            </Col>
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
