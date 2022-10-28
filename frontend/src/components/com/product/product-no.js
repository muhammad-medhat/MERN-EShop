import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../rating.js";
import { Link } from "react-router-dom";
import "./product.css";

const Product = ({product}) => {
  return (
    <>
      <article className="product-card my-3 p-3 rounded">
        <Link to={`/products/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        <div className="card-body">
          <Link to={`/products/${product._id}`}>
            <Card.Title as="div" className="font-weight-bold">
              {product.name}
            </Card.Title>
          </Link>

          <div>
            <Rating
              value={product.rating}
              text={`Avarage: ${Number(product.rating).toFixed(2)} from ${product.numReviews} reviews`}
            />
          </div>

          <div>
            <small className="text-muted">
              Count In Stock: {product.countInStock}
            </small>
          </div>
          <h3>
            <small className="text-muted"> ${product.price}</small>
          </h3>
        </div> {/* card-body*/}
      </article>
    </>
  );
};

export default Product;
