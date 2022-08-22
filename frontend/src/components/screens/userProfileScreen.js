import React, { useState, useEffect } from "react";
import { Form, Row, Col, FormControl, FormGroup } from "react-bootstrap";
import FormContainer from "../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserDetails } from "../../actions/userActions";
import Loader from "../loader";
import Message from "../message";

const UserProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, message } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userlogin", userLogin);

  
  const userDetailsUpdate = useSelector((state) => state.userDetailsUpdate);
  const { success } = userDetailsUpdate;

  const nav = useNavigate();

  // console.log("userDetails", userDetails);
  const updateProfile = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMsg("Password and Confirm Password do not match");
    } else {debugger
      dispatch(updateUserDetails({name, email, password}));
    }
  };


  useEffect(() => {
    if (!userInfo) {
      nav("/login");
    } else {
      console.log("useEffect()... userInfo is set", userInfo);
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user]);
  return (
    <>
      <h1>profile</h1>
      {error && <Message variant="danger">error: {error}</Message>}
      {msg && <Message variant="danger">msg: {msg}</Message>}
      {success && <Message variant="success">Profile updated</Message>}
      {loading && <Loader text="Loading product..." />}
      {user && (
        <Row>
          <Col md={3}>
            <Form onSubmit={updateProfile}>
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
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="rememberMe">
                <Form.Check type="checkbox" label="Remember me" />
              </FormGroup>
              <FormGroup>
                <Form.Control variant='primary' type="submit" value="Update" />
              </FormGroup>
            </Form>
          </Col>

          <Col md={9}>
            <h2>orders</h2>
            ...orders list
          </Col>
        </Row>
      )}
    </>
  );
};

export default UserProfileScreen;
