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
import { PayPalButton } from "react-paypal-button-v2";

import {
  getOrderDetails,
  payOrder,
  payReset,
} from "../../../actions/orderActions";
import Loader from "../../loader";
import Message from "../../message";
import { ORDER_PAY_RESET } from "../../../const/orderConstants";
import ShippingAddress from "../../com/order/shippingAddress";
import PaymentMethod from "../../com/order/paymentMethod";
import OrderItems from "../../com/order/orderItems";
import OrderSummery from "../../com/order/orderSummery";

const OrderScreen = () => {debugger
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetailsSelector = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetailsSelector;

  const orderPaySelector = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPaySelector;

  const [sdkReady, setSdkReady] = useState(false);
  function paymentSuccess(paymentRes) {
    console.log("pp res", paymentRes);
    debugger;
    dispatch(payOrder(order._id, paymentRes));
  }

  useEffect(() => {
    const addPaypalScript = async (req, res) => {
      const response = await fetch("/api/config/paypal");
      const clientId = await response.text();
      // console.log(clientId);
      const paypalUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      const script = document.createElement("script");
      script.src = paypalUrl;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || id !== order._id) {
      dispatch({ type: ORDER_PAY_RESET });

      //if the order is not loaded, or reload the order after payment
      dispatch(getOrderDetails(id));
      console.log("ods", orderDetailsSelector);
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, order]);

  return (
    <>
      {loading ? (
        <Loader text="Loading products..." />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        order && (
          <>
            {/* <h2> {order._id}</h2>
            <h2> {id}</h2> */}
            {/* {JSON.stringify(order)} */}
            <Link to="/profile">back to my profile</Link>
            <h2> order details</h2>
            <h3>
              {order.isDelivered ? (
                <>
                  <p>
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                    &nbsp;delivered on {order.deliveredAt.substring(0, 10)}
                  </p>
                </>
              ) : (
                <p>
                  <i
                    className="fas fa-times danger"
                    style={{ color: "red" }}
                  ></i>
                  &nbsp; not delivered
                </p>
              )}
            </h3>

            <Row>
              <Col md={8}>
                <ListGroup>
                  <ListGroup.Item>
                    <ShippingAddress order={order} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <PaymentMethod order={order} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <OrderItems order={order} />
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                {/* <OrderSummery order={order} /> */}
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
                  {!order.isPaid && (
                    <ListGroup>
                      <ListGroup.Item>
                        {!sdkReady ? (
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
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default OrderScreen;
