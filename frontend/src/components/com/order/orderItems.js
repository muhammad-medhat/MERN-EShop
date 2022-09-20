import React from "react";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../message";
const OrderItems = ({ order }) => {
  return (
    <>
      <h3> order items</h3>
      {order.isDelivered ? (
        <Message variant="success">Delivered</Message>
      ) : (
        <Message variant="danger">not Delivered</Message>
      )}
      {order.orderItems.length == 0 ? (
        <Message>Empty Order</Message>
      ) : (
        <>
          {order.orderItems.map((item) => {
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
        </>
      )}






    </>
  );
};
OrderItems.defaultProps = {
  color: "#ffc107",
};

export default OrderItems;
