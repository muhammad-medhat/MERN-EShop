import React, { useEffect } from "react";
import { Form, Row, Col, FormControl, FormGroup } from "react-bootstrap";
import FormContainer from "../formContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../loader";
import Message from "../message";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  console.log("user login", userLogin);
  
  const { loading, userInfo, error, message } = userLogin;
  console.log("userInfo", userInfo);
  const nav = useNavigate();

  const l= useLocation();
  console.log('loc', l);
//   const qty = search ? Number(search.split("=")[1]) : 1
  
  const submitLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo && userInfo.id) {
      console.log("userInfo", userInfo);
      // localStorage.setItem('userInfo', JSON.stringify(userInfo));
      nav("/profile");
    }
  }, [dispatch, userInfo]);
  return (
    <FormContainer>
      <h1>Login to your account</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader text="Loading product..." />}
      <Form onSubmit={submitLogin}>
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
        <FormGroup controlId="rememberMe">
          <Form.Check type="checkbox" label="Remember me" />
        </FormGroup>
        <FormGroup>
          <Form.Control variant="primary" type="submit" value="Login" />
        </FormGroup>
      </Form>
      <Row className="py-3">
        <Col>
          <Form.Label>Don't have an account?</Form.Label>
          <Link to={"/register"}> Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
