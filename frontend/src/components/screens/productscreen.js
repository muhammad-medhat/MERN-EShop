import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useHistory,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { DetailsProduct, reviewProduct } from "../../actions/productActions";

import Loader from "../loader";
import Message from "../message";

import Rating from "../com/rating.js";
const ProductScreen = () => {
  const pid = useParams().id;
  const url = `/api/products/${pid}`;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = productReviewCreate;

  const nav = useNavigate();

  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(product.price);

  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  function submitHandler(e) {
    e.preventDefault();
    dispatch(
      reviewProduct(pid, {
        rating,
        content,
        title,
      })
    );
  }

  useEffect(() => {
    dispatch(DetailsProduct(pid));
    setQty(qty);
    setTotal(total);
  }, [dispatch, pid, successReview]);

  const handleAddToCart = () => {
    // setQty(qty);
    // setTotal(qty * product.price);
    // console.log(`Add to cart ${qty} of ${product.id} for ${total}`);
    nav(`/cart/${product._id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader text="Loading product..." />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
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
              {product.reviews.length === 0 ? (
                <Message variant="info">No reviews</Message>
              ) : (
                <ListGroup>
                  <Row>
                    <Col>
                      {product.reviews.map((r) => (
                        <ListGroup.Item key={r._id}>
                        <p>frbom</p>
                          <p>reviewed at: {r.createdAt.substring(0, 10)}</p>
                          <strong>{r.title}</strong>
                          <p>{r.content}</p>
                          <p>
                            <Rating rvalue={r.rating} />
                          </p>
                        </ListGroup.Item>
                      ))}
                    </Col>
                  </Row>
                </ListGroup>
              )}
              {userInfo && (
                <>
                  <h2> write a review</h2>
                  {loadingReview ? (
                    <Loader />
                  ) : errorReview ? (
                    <Message variant="danger">{errorReview}</Message>
                  ) : successReview ? (
                    <Message variant="success">you reviewed this item</Message>
                  ) : (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="review">
                        <Form.Label>rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </FormGroup>

                      <FormGroup controlId="title">
                        <Form.Label>title</Form.Label>
                        <Form.Control
                          as="input"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                      </FormGroup>

                      <FormGroup controlId="content">
                        <Form.Label>comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          onChange={(e) => setContent(e.target.value)}
                          value={content}
                        />
                      </FormGroup>
                      <Button type="submit" variant="primary">
                        submit
                      </Button>
                    </Form>
                  )}
                </>
              )}
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h3>{product.name}</h3>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Rating
                        value={product.rating}
                        text={`Average: ${product.rating} from ${product.numReviews} reviews`}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>

            {/* add to cart */}

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col xs={12} className="text-center font-bold">
                        Add to cart
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <>
                      {/* Bug: price not accurate */}
                      <ListGroup.Item>
                        <Row>
                          <Col>Price</Col>
                          <Col>$ {product.price}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => {
                                setQty(e.target.value);
                                setTotal(e.target.value * product.price);
                              }}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <button
                              className="btn btn-primary"
                              disabled={product.countInStock <= 0}
                              onClick={handleAddToCart}
                            >
                              Add to Cart
                            </button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}

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
