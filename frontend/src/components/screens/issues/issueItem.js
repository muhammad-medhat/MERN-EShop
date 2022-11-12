import React, {  } from "react";
import { Card } from "react-bootstrap";
// import Loader from "../../../loader";
// import Message from "../../../message";
// import { LinkContainer } from "react-router-bootstrap";
// import { PRODUCT_CREATE_RESET } from "../../../../const/issueConstants";
// import "./issueStyle.css";
const IssueItem = (props) => {
  const { title, severity, description, email } = props.issue;

  const severityClasses = {
    l: {class: "info", title: "low"},
    m: {class: "warning", title: "medium"},
    h: {class: "danger", title: "high"}
  };

  return (
    <>
      <Card className="bug">
        <Card.Body>
          <Card.Title
            className={`bg-${severityClasses[severity].class} p-1 rounded`}
          >
            <span className="severity m-1">
              [{severityClasses[severity].title}]
            </span>

            {title}
          </Card.Title>
          <Card.Text>
            <div className="bug-info">
              <p>{description}</p>
              {email ? <p className="email">{email} </p> : ""}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>{" "}
    </>
  );
};

export default IssueItem;
