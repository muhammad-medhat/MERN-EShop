import React, { useEffect } from "react";
import { Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import OrderSummery from "../com/order/orderSummery";
import Message from "../message";
import CheckoutSteps from "../partials/checkoutSteps";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const cart = useSelector((s) => s.cart);
  const nav = useNavigate();

  const { shippingAddress, paymentMethod, cartItems } = cart;
  //summery
  const tax = 0.15;
  const itemsPrice = Number(
    cartItems.reduce((acc, i) => i.price * i.qty + acc, 0).toFixed(2)
  );
  const taxPrice = Number(
    cartItems.reduce((acc, i) => i.price * tax + acc, 0).toFixed(2)
  );
  const shippingPrice = Number(( itemsPrice >= 100 ? 20 : 50).toFixed(2));
  const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));
  const summery = { shippingPrice, totalPrice, taxPrice, itemsPrice };
  useEffect(() => {
    //debugger;
    // if (order && !(Object.keys(order).length === 0)) {
    if(success){
      nav(`/order/${order._id}`);
      // eslint-disable-next-line
    }
  }, [dispatch, orderCreate, order]);


  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // debugger;
    const orderObject = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      ...summery,
    };

    dispatch(
      createOrder({
        ...orderObject,
      })
    );

  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <h2>place order </h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h3>shipping address</h3>
              <ListGroup>
                <span>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country},{" "}
                </span>
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>payment method</h3>
              <ListGroup.Item>{paymentMethod}</ListGroup.Item>
              {/* {order.isPaid? <Message variant='success'>Paid</Message>:
              <Message variant='danger'>not Paid yet</Message>} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3> order items</h3>

              {cartItems.map((item) => {
                return (
                  <Row key={item.product} className="cart-product">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col className="p-title">
                      <Link to={`/products/${item.product}`} title={item.name}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} X {item.price}
                    </Col>
                    <Col md={2}>$ {item.qty * item.price}</Col>
                  </Row>
                );
              })}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <OrderSummery {...summery} />
          <ListGroup.Item>
            <Form.Control
              type="submit"
              value="create order"
              className="btn-block"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              title="proceed to payment"
            />
            {error && <Message variant='danger'>{error}</Message>}
          </ListGroup.Item>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
