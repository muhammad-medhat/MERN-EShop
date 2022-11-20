import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  FormControl,
  FormGroup,
  Button,
} from "react-bootstrap";
import FormContainer from "../../formContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../actions/userActions";
import Loader from "../../loader";
import Message from "../../message";
import { addShippingAddress } from "../../../actions/cartActions";
import CheckoutSteps from "../../partials/checkoutSteps";
import useLocalStorage from "../../../hooks/useLocalStorage";

const ShippingScreen = () => {
  // debugger
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  // const { shippingAddress } = cart;
  const [shippingAddress, setShippingAddress] = useLocalStorage(
    "shippingAddress",
    {}
  );

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const nav = useNavigate();

  const { userInfo } = userLogin;

  useEffect(() => {
    if (shippingAddress) {
      //  debugger
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setCountry(shippingAddress.country);
    } else {
    }
  }, [shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShippingAddress({ address, city, postalCode, country });

    if (!userInfo) {
      nav("/login");
    } else {
      // dispatch(
      //   addShippingAddress({
      //     address, city, postalCode, country,
      //   })
      // );

      if (shippingAddress) nav("/payment");
    }
  };
  return (
    shippingAddress && (
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h2>shipping address</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="address">
            <Form.Label>address</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="city">
            <Form.Label>city</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="postalCode">
            <Form.Label>postal code</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="country">
            <Form.Label>country</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter country"
              value={
                country
                  ? country
                  : shippingAddress
                  ? shippingAddress.country
                  : ""
              }
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" variant="primary">
            continue
          </Button>
        </Form>
      </FormContainer>
    )
  );
};

export default ShippingScreen;
