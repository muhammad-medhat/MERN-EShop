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
import { getOrderDetails, payOrder,payReset } from "../../../../actions/orderActions";
import Loader from "../../../loader";
import Message from "../../../message";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../../../const/orderConstants";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetailsSelector = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetailsSelector;

  const orderPaySelector = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPaySelector;

  const [sdkReady, setSdkReady] = useState(false);
  // debugger;
  useEffect(() => {
    debugger;
    console.log("useEffect...");
    const addPaypalScript = async (req, res) => {
      const response = await fetch("/api/config/paypal");
      const clientId = await response.text();
      console.log(clientId);
      const paypalUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      const script = document.createElement("script");
      script.src = paypalUrl;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order||successPay) {
      // dispatch(payReset())
      dispatch(getOrderDetails(id));
      dispatch({
        type: ORDER_PAY_RESET
      })
    } else if(!order.isPaid){
      if(!window.paypal){
        addPaypalScript()
      } else{
        setSdkReady(true)
      }
    }
  }, [dispatch, id, successPay, order]);

  function paymentSuccess() {

  }

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
                      {JSON.stringify(order)}
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
                  {!order.isPaid && (
                    <ListGroup>
                      <ListGroup.Item>
                        {sdkReady && (
                          <PayPalButton 
                            amount={order.totalPrice}
                            onSuccess={paymentSuccess} />
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
