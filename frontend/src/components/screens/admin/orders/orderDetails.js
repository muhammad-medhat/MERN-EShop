import React, { useEffect, useState } from "react";
import {
  Button,
  Card, Col,
  Image,
  ListGroup, Row
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails,  deliverOrder} from "../../../../actions/orderActions";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../../../../const/orderConstants";
import Loader from "../../../loader";
import Message from "../../../message";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  /**
   * Selectors
   * ####################################
   */
  const orderDetailsSelector = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetailsSelector;

  const orderPaySelector = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPaySelector;

  const orderDeliverSelector = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } =
    orderDeliverSelector;
  /**
   * End Selectors
   * ####################################
   */

  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    // debugger;
    console.log("useEffect...");
    console.log("order", order);

    if (!order || successDeliver || id !== order._id) {
      // dispatch(payReset())
      dispatch(getOrderDetails(id));
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
    } 
  }, [dispatch, id, successDeliver, order]);

  function paymentSuccess() {

  }
  function handleDelivery(){
    dispatch(deliverOrder(order))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        order && (
          <>
            <Link to="/admin/orders">back to orders</Link>

            {/* <h2> order {order._id}</h2> */}
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
                          <p>name: {order.user.name}</p>
                          <p>email: {order.user.email}</p>
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
                      {/* {JSON.stringify(order)} */}
                    </ListGroup.Item>
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
                  {!order.isDelivered && (
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <Button
                              className="btn btn-block"
                              onClick={handleDelivery}
                            >
                              Mark as out for delivery
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  )}

                  {!order.isPaid && (
                    <ListGroup>
                      <ListGroup.Item>
                        {sdkReady && (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={paymentSuccess}
                          />
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  )}
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default AdminOrderDetails;
