import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../rating.js";
import { Link } from "react-router-dom";
import "./product.css";

const Product = ({product}) => {
  return (
    <>
      <Card className="product-card my-3 p-3 rounded">
        <Link to={`/products/${product._id}`}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
        </Link>

        <Card.Body>
          <Link to={`/products/${product._id}`}>
            <Card.Title as="div" className="font-weight-bold">
              {product.name}
            </Card.Title>
          </Link>

          {/* <Card.Text>{product.description}</Card.Text> */}

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`Avarage: ${Number(product.rating).toFixed(2)} from ${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as="div">
            <small className="text-muted">
              Count In Stock: {product.countInStock}
            </small>
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
