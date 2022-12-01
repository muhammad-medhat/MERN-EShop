import React, { useState, useEffect } from "react";
import { Form, Row, Col, FormControl, FormGroup } from "react-bootstrap";
import FormContainer from "../formContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../actions/userActions";
import Loader from "../loader";
import Message from "../message";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  debugger;
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  console.log("userInfo", userInfo);
  const { message } = userInfo;

  const submitRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMsg("Password and Confirm Password do not match");
    } else {
      debugger;
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      console.log("userInfo", userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [dispatch, userInfo, name, email, password, confirmPassword]);
  return (
    <FormContainer>
      <h1>register your account</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {msg && <Message variant="danger">{msg}</Message>}
      {loading && <Loader text="Loading product..." />}
      <Form onSubmit={submitRegister}>
        <FormGroup controlId="name">
          <Form.Label>Name</Form.Label>
          <FormControl
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="email">
          <Form.Label>Email address</Form.Label>
          <FormControl
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="password">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            type="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Control type="submit" value="Register" />
        </FormGroup>
      </Form>
      <Row className="py-3">
        <Col>
          <Form.Label>Have an account?</Form.Label>
          <Link to={"/login"}> login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
