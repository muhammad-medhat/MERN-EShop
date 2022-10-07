import React from "react";
import {Helmet} from "react-helmet";
const Meta = (props) => {
  const { title, description} = props;
  return (

    <Helmet>
        <title>Mern shop | {title}</title>
        <meta name="description" content={description} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "Mern shop ",
  description: "we sell products",
};

export default Meta;
