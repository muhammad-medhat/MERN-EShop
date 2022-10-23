import React, { useState } from "react";
import { ListGroup, Row, Col, Image, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../../../actions/orderActions";
import { Link } from "react-router-dom";
import Loader from "../../loader";
const OrderSummery = ({ order }) => {
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);
  function paymentSuccess(paymentRes) {
    console.log('pp res', paymentRes);
    debugger
    dispatch(payOrder(order._id, paymentRes));
  }

  return (
    <>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>order summery</h2>
          </ListGroup.Item>
          <ListGroup.Item>{/* {JSON.stringify(order)} */}</ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Items total</Col>
              <Col>{order.itemsPrice}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>shipping</Col>
              <Col>{order.shippingPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Taxes</Col>
              <Col>{order.taxPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Total Price</Col>
              <Col>{order.totalPrice}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        {!order.isPaid && (
          <ListGroup>
            <ListGroup.Item>
              {sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={paymentSuccess}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
        )}
      </Card>
    </>
  );
};
OrderSummery.defaultProps = {
  color: "#ffc107",
};

export default OrderSummery;
