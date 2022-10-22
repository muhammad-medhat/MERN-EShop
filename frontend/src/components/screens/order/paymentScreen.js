import React, { useState } from "react";
import { Form, Col, FormGroup } from "react-bootstrap";
import FormContainer from "../../formContainer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addPaymentMethod } from "../../../actions/cartActions";
import CheckoutSteps from "../../partials/checkoutSteps";
// usf

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  // useSelector
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  //destruction
  const { shippingAddress } = cart;
  const { userInfo } = userLogin; //checked in header

  const nav = useNavigate();

  if (!shippingAddress) {
    nav("/shipping");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    dispatch(addPaymentMethod(paymentMethod));
    nav('/placeorder')
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>payment method</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">select method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="paypal or credit card"
              id="paypal"
              value="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              id="stripe"
              label="stripe"
              value="stripe"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <FormGroup>
          <Form.Control type="submit" value="continue" />
        </FormGroup>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
