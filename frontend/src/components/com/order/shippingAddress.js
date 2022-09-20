import React from "react";
import{ListGroup, Row} from 'react-bootstrap'
const ShippingAddress = ({ order }) => {
  return (
    <>
      <h3>shipping address</h3>
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <p>name: {order.user.name}</p>
            <p>email: {order.user.email}</p>
            <span>
              {order.shippingAddress.address},{order.shippingAddress.city},
              {order.shippingAddress.postalCode},{order.shippingAddress.country}
              ,
            </span>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};
ShippingAddress.defaultProps = {
  color: "#ffc107",
};

export default ShippingAddress;
