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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import Message from "../../message";
import { LinkContainer } from "react-router-bootstrap";

import { DetailsProduct, updateProduct } from "../../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../../const/productConstants";

const ProductEdit = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id: pid } = useParams();
  //selectors
  //////////////////////////////////////////////////////////////////////
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: loadingDetails,
    success: successDetails,
    error: errorDetails,
    product: details,
  } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  ///////////////////////////////////////////////////////////////////
  // debugger

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  function submitAdd(e) {
    debugger;
    // debugger;
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: pid,
        name,
        price,
        description,
        image,
        countInStock,
        brand,
        category,
      })
    );
  }
  useEffect(() => {
    if (successUpdate) {
      console.log("Updated successful ly ");
      dispatch({ type: PRODUCT_UPDATE_RESET });
      nav("/admin/products");
    } else {
      // if (!userInfo || !userInfo.isAdmin) {
      //   nav("/login");
      // } else {debugger
      dispatch(DetailsProduct(pid));
      setName(details.name);
      setPrice(details.price);
      setDescription(details.description);
      setImage(details.image);
      setCountInStock(details.countInStock);
      setBrand(details.brand);
      setCategory(details.category);
      // }
    }
  }, [dispatch, userInfo, successUpdate]);
  return (
    <>
      {loadingDetails ? (
        <Loader />
      ) : loadingDetails ? (
        <Message variant="danger">{loadingDetails}</Message>
      ) : (
        <>
          <Link to="/admin/products" className="p-3">
            <span>
              <i className="fa fa-arrow-left p-2 mb-2" aria-hidden="true"></i>
            </span>

            <span>Back to product list</span>
          </Link>
          <FormContainer>
            <Form onSubmit={submitAdd}>
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
                  type="text"
                  placeholder="product category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="image">
                <Form.Label>image</Form.Label>
                <FormControl
                  type="text"
                  placeholder="product image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="brand">
                <Form.Label>brand</Form.Label>
                <FormControl
                  type="text"
                  placeholder="product brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="countInStock">
                <Form.Label>countInStock</Form.Label>
                <FormControl
                  type="number"
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

export default ProductEdit;
