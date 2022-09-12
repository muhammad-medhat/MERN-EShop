import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  FormControl,
  FormGroup,
  Button,
} from "react-bootstrap";
import FormContainer from "../../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import Message from "../../message";
import { LinkContainer } from "react-router-bootstrap";
import { createProduct } from "../../../actions/productActions";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const productList = useSelector((state) => state.productList);
  // const { loading, products, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    errorCreate,
  } = productCreate;
  // debugger
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  function submitAdd(e) {
    debugger
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        description,
        price,
        category,
        brand,
        image,
      })
    );
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
    } else nav("/login");
  }, [dispatch, successCreate, userInfo]);
  return (
    <>
      {loadingCreate ? (
        <Loader />
      ) : errorCreate ? (
        <Message variant="danger">{errorCreate}</Message>
      ) : (
        <>
          <FormContainer>
            <Form onSubmit={(e) => submitAdd}>
              <FormGroup controlId="name">
                <Form.Label>Name</Form.Label>
                <FormControl
                  type="text"
                  placeholder="product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="description">
                <Form.Label>description</Form.Label>
                <FormControl
                  as="textarea"
                  placeholder="product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="price">
                <Form.Label>price</Form.Label>
                <FormControl
                  type="Number"
                  placeholder="product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="category">
                <Form.Label>category</Form.Label>
                <FormControl
                  type="Number"
                  placeholder="product category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="image">
                <Form.Label>image</Form.Label>
                <FormControl
                  type="Number"
                  placeholder="product image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="brand">
                <Form.Label>brand</Form.Label>
                <FormControl
                  type="Number"
                  placeholder="product brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="countInStock">
                <Form.Label>countInStock</Form.Label>
                <FormControl
                  type="Number"
                  placeholder="product countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label>add product</Form.Label>

                <Form.Control variant="primary" type="submit" value="create" />
              </FormGroup>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default ProductCreate;
