import React from "react"
import { Spinner } from "react-bootstrap";

const Loader = (props) => {
  const { color, text } = props;
  return (
    <>
    
      <Spinner animation="border" variant="primary" role="status">
        <span className="sr-only">{text}</span>
      </Spinner>
    </>
  );
};
Loader.defaultProps = {
  color: "#ffc107",
};

export default Loader;
