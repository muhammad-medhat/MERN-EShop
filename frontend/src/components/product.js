import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Rating from "./rating";
// import './product.css'
// import './product.css'

const Product = (props) => {
  const { _id, name, description,image, price, rating,numReviews, countInStock } = props;
  return (
    <>
      <Card className="product-card">
        <Card.Img variant="top" src={image} alt={name}/>

        <Card.Body>

          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>
            <small className="text-muted">Price: {price}</small>
          </Card.Text>
          <Card.Text as="div">
              Rating:{rating} <Rating 
                value={rating} 
                text={`Avarage: ${rating} from ${numReviews} reviews`}
                />
          </Card.Text>

          <Card.Text>
            <small className="text-muted">Count In Stock: {countInStock}</small>
          </Card.Text>
        </Card.Body>
      </Card>

    </>
  );
};

export default Product;
