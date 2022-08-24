import React, { useEffect, useState } from "react";
import { Form, Row, Col, FormControl, FormGroup } from "react-bootstrap";
import FormContainer from "../formContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../loader";
import Message from "../message";
import { addShippingAddress } from "../../actions/cartActions";
// usf

const PaymentScreen = () => {



  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  
  const userLogin = useSelector((state) => state.userLogin);
  const nav = useNavigate()

  //   const qty = search ? Number(search.split("=")[1]) : 1

  useEffect(() => {
    // check login
    dispatch(addShippingAddress({
      address, city, postalCode, country
    }))
    nav('/payment')
  }, [dispatch]);
  const handleSubmit = () => {};
  return (
    <FormContainer>
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
