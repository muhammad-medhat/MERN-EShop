import React, { useState, useEffect } from "react";
import { Card, Form, FormControl, FormGroup, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import Loader from "../../../loader";
// import Message from "../../../message";
// import { LinkContainer } from "react-router-bootstrap";
// import { PRODUCT_CREATE_RESET } from "../../../../const/issueConstants";
import "./issueStyle.css";
import FormContainer from "../../formContainer";
import { createIssue } from "../../../actions/issueActions";
import { ISSUE_CREATE_RESET } from "../../../const/issueConstants";
const IssueItem = (props) => {
  const { title, severity, description, email } = props.issue;

  const severityClasses = {
    l: "info",
    m: "warning",
    h: "danger",
  };

  return (
    <>
      <Card>
        <Card.Body >
          <Card.Title className={severityClasses[severity]}>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{email}</Card.Text>
        </Card.Body>
      </Card>{" "}
    </>
  );
};

export default IssueItem;
