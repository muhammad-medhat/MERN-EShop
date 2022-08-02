import React from "react";
import {  Card } from "react-bootstrap";
import Rating from "../rating";
import './product.css'

const Product = (props) => {
  const { product } = props;
  return (
    <>
      <Card className="product-card my-3 p-3 rounded">
        <Card.Img variant="top" src={product.image} alt={product.name}/>

        <Card.Body>

          <Card.Title as='div' className="font-weight-bold">{product.name}</Card.Title>
          {/* <Card.Text>{product.description}</Card.Text> */}
          
          <Card.Text as="div">
              <Rating 
                value={product.rating} 
                text={`Avarage: ${product.rating} from ${product.numReviews} reviews`}
                />
          </Card.Text>

          <Card.Text as="div">
            <small className="text-muted">Count In Stock: {product.countInStock}</small>
          </Card.Text>
          <Card.Text as="h3">
            <small className="text-muted"> ${product.price}</small>
          </Card.Text>
        </Card.Body>
      </Card>

    </>
  );
};

export default Product;
