import React, { useEffect } from "react";
import { Form, Row, Col, FormControl, FormGroup } from "react-bootstrap";
import FormContainer from "../../formContainer";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../actions/userActions";
import Loader from "../../loader";
import Message from "../../message";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  debugger;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  // console.log("user login", userLogin);

  const { loading, userInfo, error } = userLogin;
  // console.log("userInfo", userInfo);
  const nav = useNavigate();

  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  // const redirect = location.search ? location.search.split('=')[1] : '/'
  const redirect = [...searchParams].length > 0 ? [...searchParams][0][1] : "/";

  // console.log("loc", loc);

  const submitLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo && userInfo.id) {
      // console.log("userInfo", userInfo);
      console.log("redirect", redirect);
      nav("/");
    }
  }, [dispatch, userInfo]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? <Message variant="danger">{error}</Message> : <></>}
          <FormContainer>
            <h1>Login to your account</h1>
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
        </>
      )}
    </>
  );
};

export default LoginScreen;
