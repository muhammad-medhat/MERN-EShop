import React, { useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummery = (props) => {
  console.log("summery", props);
  const { shippingPrice, totalPrice, taxPrice, itemsPrice } = props;
  const cart = useSelector((s) => s.cart);
  const nav = useNavigate();

  // debugger;

  // useEffect(() => {}, [props]);

  return (
    <>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>order summery com</h2>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Items sum</Col>
              <Col>{itemsPrice}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Taxes 15%</Col>
              <Col>{taxPrice}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>shipping</Col>
              <Col>{shippingPrice}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>order total</Col>
              <Col>{totalPrice}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup.Item>
          <ListGroup.Item>
            {/* {error && <Message variant="danger">{error}</Message>} */}
          </ListGroup.Item>
        </ListGroup.Item>
      </Card>
    </>
  );
};

export default OrderSummery;
