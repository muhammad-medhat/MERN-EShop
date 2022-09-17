import React, { useState, useEffect } from "react";
import {
  Table,
  // Form,
  Row,
  Col,
  FormControl,
  FormFile,
  FormGroup,
  Button,
} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


import FormContainer from "../../formContainer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import Message from "../../message";
import { LinkContainer } from "react-router-bootstrap";

import { DetailsProduct, updateProduct } from "../../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../../const/productConstants";

import axios from 'axios'

const ProductEdit = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id: pid } = useParams();
  /**
   * Selectors 
   * */

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const productDetails = useSelector((state) => state.productDetails);
   const {
     loading: loadingDetails,
     success: successDetails,
     error: errorDetails,
     product: details,
   } = productDetails;

   const productUpdate = useSelector((state) => state.productUpdate);
   const {
     loading: loadingUpdate,
     success: successUpdate,
     error: errorUpdate,
   } = productUpdate;
/***   
 * End Selectors             
 *  */ 
/**
 * State variables */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  /** End state variables */

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

  const uploadHandler = async(e)=> {
    debugger
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    // console.log(formData);
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    setUploading(true)
    try {
      const config = {
        headers:{
          'Content-Type': 'multipart/form-data'
        }, 
        method:'post',
        body: formData
      }
      // const {data} = await axios.post('/api/upload', formData, config)
      const res = await fetch('/api/upload', config)
      const data = await res.text()
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error);
      setUploading(false)
    }
  }
  useEffect(() => {
    // console.log('productDetails', productDetails);
    // console.log('productDetails', successDetails);
    if (successUpdate) {
      console.log("Updated successful ly ");
      dispatch({ type: PRODUCT_UPDATE_RESET });
      nav("/admin/products");
    } else {
      dispatch(DetailsProduct(pid));
      setName(details.name);
      setPrice(details.price);
      setDescription(details.description);
      setImage(details.image);
      setCountInStock(details.countInStock);
      setBrand(details.brand);
      setCategory(details.category);
    }
  }, [
    dispatch,
    userInfo,
    successUpdate,
    successDetails,
    name,
    price,
    description,
    image,
    countInStock,
    brand,
    category,
  ]);
  return (
    <>
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger">{errorDetails}</Message>
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
                {/* <FormControl
                  type="text"
                  placeholder="product image"
                  value={image}
                  disabled
                  onChange={(e) => setImage(e.target.value)}
                /> */}
                <FormControl 
                  type="file"
                  // id='image-file' 
                  label='select image' 
                  // custom
                  onChange={uploadHandler}
                  />
                  {uploading && <Loader />}

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

                <FormControl variant="primary" type="submit" value="create" />
              </FormGroup>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default ProductEdit;
