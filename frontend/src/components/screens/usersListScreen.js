import React, { useState, useEffect } from "react";
import { Table, Form, Row, Col, FormControl, FormGroup } from "react-bootstrap";
import FormContainer from "../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserDetails } from "../../actions/userActions";
import Loader from "../loader";
import Message from "../message";

const UsersList = () => {
    const dispatch=useDispatch();
    const userList = useSelector(state => state.userList)
    const{loading, users, error} = userList;
    return ( 
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>email</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                </tr>
            ))}


            </tbody>
            
    </Table>

     );
}
 
export default UsersList;