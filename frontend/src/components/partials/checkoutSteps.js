import React, { useEffect, useState } from "react";
import { Form, Row, Col, FormControl, FormGroup, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../formContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../loader";
import Message from "../message";
import { addShippingAddress } from "../../actions/cartActions";
// usf

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Row className="prog d-flex justify-content-center">
      <Col>
        {step1 ? (
            <Link to="/login">login</Link>
        ) : (
          <>login</>
        )}
      </Col>

      <Col>
        {step2 ? (
            <Link to="/shipping">Shipping</Link>
        ) : (
          <>Shipping</>
        )}
      </Col>
      <Col>
        {step3 ? (
            <Link to="/payment">payment</Link>
        ) : (
          <>payment</>
        )}
      </Col>
      <Col>
        {step4 ? (
            <Link to="/placeorder">place order</Link>
        ) : (
          <>place order</>
        )}
      </Col>
    </Row>
  );
};

export default CheckoutSteps;
