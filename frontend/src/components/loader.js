import React from "react"
// import { Spinner } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';


const Loader = (props) => {
  const { color, text } = props;
  return (
    <>
      <Spinner
        animation="border"
        variant="primary"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
        }}
        role="status"
      >
        <span className="sr-only">{text}</span>
      </Spinner>
    </>
  );
};
// Loader.defaultProps = {
//   color: "#ffc107",
// };

export default Loader;
