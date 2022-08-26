import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { DetailsProduct } from "../../actions/productActions";
import Loader from "../loader";
import Message from "../message";
import CheckoutSteps from "../partials/checkoutSteps";

import Rating from "../rating";
const PlaceOrderScreen = () => {
  const cart = useSelector((s) => s.cart);
  console.log("cart", cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  //summery
  const tax = 0.15;
  debugger;
  const itemsSum = Number(
    cartItems.reduce((acc, i) => i.price + acc, 0).toFixed(2)
  );
  console.log("itemsSum typeof", typeof itemsSum);
  const taxSum = Number(
    cartItems.reduce((acc, i) => i.price * tax + acc, 0).toFixed(2)
  );
  const shipping = Number((Number(itemsSum) >= 100 ? 0 : 20).toFixed(2));
  const totalSum = Number(itemsSum + taxSum + shipping).toFixed(2);

  const handlePlaceOrder = () => {};

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
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>order summery</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{itemsSum}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxes</Col>
                  <Col>{taxSum}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>{shipping}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>order total</Col>
                  <Col>{totalSum}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
              <Form.Control
                type="submit"
                value="continue"
                className="btn-block"
                disabled={cartItems.length === 0}
              />
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
