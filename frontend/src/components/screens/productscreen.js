import React, {  useEffect } from "react";
import { Card, Row, Col, Image, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DetailsProduct } from "../../actions/productActions";
import Loader from "../loader";
import Message from "../message";


import Rating from "../rating";
const ProductScreen = () => {
  const pid = useParams().id;
  const url = `/api/products/${pid}`;

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { product, loading, error } = productDetails;
  console.log('product details',productDetails)

  useEffect(() => {

    dispatch(DetailsProduct(pid))

  }, [dispatch, pid]);
  // console.log(product);

  return (
    <>

    
    {
      loading 
      ? <Loader text="Loading product..." /> 
      : error 
      ? <Message variant="danger" text={error} /> 
      : (
    <>
      <Link to="/" className="p-3">
        <span>
          <i className="fa fa-arrow-left p-2 mb-2" aria-hidden="true"></i>
        </span>

        <span>Back to products</span>
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`Average: ${product.rating} from ${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>${product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <button
                  className="btn btn-primary"
                  disabled={product.countInStock <= 0}
                >
                  Add to Cart
                </button>
              </ListGroup.Item>
              <ListGroup.Item>
                <>{product.countInStock > 0 ? "" : "Out of Stock"}</>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
    )}
    </>
  );
};

export default ProductScreen;
