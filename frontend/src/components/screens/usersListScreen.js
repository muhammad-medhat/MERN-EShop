import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  FormControl,
  FormGroup,
  Button,
} from "react-bootstrap";
import FormContainer from "../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserDetails } from "../../actions/userActions";
import Loader from "../loader";
import Message from "../message";
import { userList, deleteUser } from "../../actions/userActions.js";
import { LinkContainer } from "react-router-bootstrap";

const UsersList = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const usersList = useSelector((state) => state.userList);
  const { loading, users, error } = usersList;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingD, success: successD, errorD } = userDelete;
  // debugger
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(usersList);

  function deleteHandler(id) {
    dispatch(deleteUser(id));
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userList());
    } else nav("/login");
  }, [dispatch, successD, userInfo]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h2>user list</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th> Name</th>
                <th>email</th>
                <th>Admin</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`users/${user._id}/edit`}>
                        <Button variant="primary">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default UsersList;
