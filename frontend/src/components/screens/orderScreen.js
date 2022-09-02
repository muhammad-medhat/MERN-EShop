import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { getOrderDetails } from "../../actions/orderActions";
import Loader from "../loader";
import Message from "../message";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const orderDetailsSelector = useSelector((state) => state.orderDetails);
  // console.log("orderderails", orderDetailsSelector);
  const { loading, order, error } = orderDetailsSelector;
  const { id } = useParams();

  if(order){
    // debugger
   
  }
    // const {
    //   // shippingAddress,
    //   //order.orderItems,
    //   // paymentMethod,
    //   // shippingPrice,
    //   totalPrice,
    //   taxPrice,
    // } = order;
    // console.log(order); 
  // debugger;
  useEffect(() => {
      console.log(order); 

    dispatch(getOrderDetails(id));
  }, []);

  return (
    <>
      {loading ? (
        <Loader text="Loading products..." />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        order && (
          <>
            <h2> order {order._id}</h2>
            {/* {JSON.stringify(order)} */}
            <h2> order details</h2>

            <Row>
              <Col md={8}>
                <ListGroup>
                  <ListGroup.Item>
                    <h3>shipping address</h3>
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <p>
                            name: {order.user.name}
                          </p>
                          <p>
                            email: {order.user.email}
                          </p>
                          <span>
                            {order.shippingAddress.address},{" "}
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.postalCode},{" "}
                            {order.shippingAddress.country},{" "}
                          </span>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h3>payment method</h3>
                    <ListGroup.Item>{order.paymentMethod}</ListGroup.Item>
                    {order.isPaid ? (
                      <Message variant="success">paid</Message>
                    ) : (
                      <Message variant="danger">not paid</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h3> order items</h3>
                    {order.orderItems.length == 0 ? (
                      <Message>Empty Order</Message>
                    ) : (
                      <>
                        {order.orderItems.map((item) => {
                          return (
                            <Row key={item.product} className="cart-product">
                              <Col md={2}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col className="p-title">
                                <Link
                                  to={`/products/${item.product}`}
                                  title={item.name}
                                >
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
                        <Col>Items total</Col>
                        <Col>{order.totalPrice}</Col>
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
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default OrderScreen;
