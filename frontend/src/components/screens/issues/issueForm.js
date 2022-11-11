import React, { useState, useEffect } from "react";
import { Form, FormControl, FormGroup, Image } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import Loader from "../../../loader";
// import Message from "../../../message";
// import { LinkContainer } from "react-router-bootstrap";
// import { createIssue } from "../../../../actions/issueActions";
// import { PRODUCT_CREATE_RESET } from "../../../../const/issueConstants";
import "./issueStyle.css";
import FormContainer from "../../formContainer";
const IssueForm = (props) => {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState(0);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const issueList = useSelector((state) => state.issueList);
  // const { loading, issues, error } = issueList;

  function showPreview(e) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }
  const submitHandler = () => {
    
  };
  useEffect(() => {
    // debugger;
    if (!file) {
      setPreview(undefined);
      return;
    } else {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      // setImage(file.name);

      // free memory when ever this component is unmounted
      // return () => URL.revokeObjectURL(objectUrl)
    }
  }, [dispatch, file]);
  return (
    <>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="title">
          <Form.Label>Name</Form.Label>
          <FormControl
            type="text"
            placeholder="issue title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="description">
          <Form.Label>description</Form.Label>
          <FormControl
            as="textarea"
            placeholder="issue description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="severity">
          <Form.Label>severity</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option>Open this select menu</option>
            <option value="l">low</option>
            <option value="m">medium</option>
            <option value="h">high</option>
          </Form.Select>
        </FormGroup>

        <FormGroup controlId="email">
          <Form.Label>email</Form.Label>
          <FormControl
            type="text"
            placeholder="add email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="py-3">
          <Form.Control variant="primary" type="submit" value={"add issue"} />
        </FormGroup>
      </Form>
    </>
  );
};

export default IssueForm;
