//? Admin component
import React, { useState, useEffect } from "react";
import { Form, FormControl, FormGroup, FormCheck } from "react-bootstrap";
import FormContainer from "../../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUser } from "../../../actions/userActions";
import Loader from "../../loader";
import Message from "../../message";
import { useParams } from "react-router-dom";
import { USER_UPDATE_RESET } from "../../../const/userConstants";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
//Selectors
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error, message } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading:loadingD, error:errorD, user } = userDetails;

  const userUpdate = useSelector((state) =>state.userUpdate)
  const { loading: loadingU,success: successU, error:errorU, user:userU } = userUpdate;

  // console.log("userInfo", userInfo);
  const nav = useNavigate()
  const { id} = useParams()

  const submitEdit = (e) => {
    e.preventDefault();
    console.log('Edit...');
    dispatch(updateUser({_id:id, name, email, isAdmin}))

  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      debugger 
      if(successU){
        dispatch({type: USER_UPDATE_RESET})
        console.log(userUpdate);
        nav('/admin/users')
      }
        if(!user.name || user._id !== id){
          // console.log('userEdit', user);
          dispatch(getUserDetails(id))
        } else {
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin) 
        }
    } else{
      nav('/login')
    }
  }, [dispatch, user]);
  return (
    <>
      <Link to="/admin/users" className="p-3">
        <span>
          <i className="fa fa-arrow-left p-2 mb-2" aria-hidden="true"></i>
        </span>

        <span>Back to user list</span>
      </Link>
      <FormContainer>
        <h1>edit user</h1>
        {error && <Message variant="danger">{error}</Message>}
        {msg && <Message variant="danger">{msg}</Message>}
        {loading && <Loader text="Loading product..." />}
        <Form onSubmit={(e)=>submitEdit(e)}>
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

          <FormGroup controlId="isAdmin">
            <Form.Label>Is Admin</Form.Label>
            <FormCheck
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </FormGroup>



          <FormGroup>
            <Form.Control type="submit" value="Edit" />
          </FormGroup>
        </Form>

      </FormContainer>      
    </>

  );
};

export default UserEditScreen;
