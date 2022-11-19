import React, { useState } from "react";
import { Form, Col, FormGroup } from "react-bootstrap";
import FormContainer from "../../formContainer";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addPaymentMethod } from "../../../actions/cartActions";
import CheckoutSteps from "../../partials/checkoutSteps";
// usf

const PaymentSuccessScreen = () => {
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
    // console.log(e);
    dispatch(addPaymentMethod(paymentMethod));
    nav('/placeorder')
  };
  return (
    <FormContainer>
thank you
<Link to="/" className="p-3">
            <span>
              <i className="fa fa-arrow-left p-2 mb-2" aria-hidden="true"></i>
            </span>

            <span>go to products</span>
          </Link>
    </FormContainer>
  );
};

export default PaymentSuccessScreen;
