import React from "react";
import { ListGroup, Row } from "react-bootstrap";
import Message from "../../message";
const PaymentMethod = ({ order }) => {
  return (
    <>
      <ListGroup>
        <h3>payment method</h3>
        <ListGroup.Item>{order.paymentMethod}</ListGroup.Item>
        {order.isPaid ? (
          <Message variant="success">paid</Message>
        ) : (
          <Message variant="danger">not paid</Message>
        )}
      </ListGroup>
    </>
  );
};
PaymentMethod.defaultProps = {
  color: "#ffc107",
};

export default PaymentMethod;
