import React, { useEffect, useState } from "react";
import {
  FormControl, FormGroup, Image
} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../../formContainer";
import Loader from "../../../loader";
import Message from "../../../message";

import { DetailsProduct, updateProduct } from "../../../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../../../const/productConstants";


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

  const uploadHandler = async()=> {
    // debugger
    const imgFileControl = document.getElementById('image-file')
    const file = imgFileControl.files[0]
    const formData = new FormData()
    formData.append('image', file)
    console.log(formData);
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    setUploading(true)
    try {
      const config = {
        headers:{
          'Content-Type': 'multipart/form-data', 
        }, 
        method:'post',
        body: file
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

  function submitAdd(e) {
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
    uploadHandler(e)

  }
  function showPreview(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("pImage");
      preview.src = src;
      // preview.style.display = "block";
    }
  }
  useEffect(() => {
    // debugger
    // console.log('productDetails', productDetails);
    // console.log('productDetails', successDetails);
    if (successUpdate) {
      console.log("Updated successful ly ");
      dispatch({ type: PRODUCT_UPDATE_RESET });
      nav("/admin/products");
    } else {
      if (successDetails) {
        setName(details?.name);
        setPrice(details?.price);
        setDescription(details?.description);
        setImage(details?.image);
        setCountInStock(details?.countInStock);
        setBrand(details?.brand);
        setCategory(details?.category);
      } else {
        dispatch(DetailsProduct(pid));
      }

    }
  }, [
    dispatch,
    userInfo,
    successUpdate,
    successDetails,
    details,pid,
    // name,
    // price,
    // description,
    // image,
    // countInStock,
    // brand,
    // category,
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
          <Message>
            <ul>
              <li>{name}</li>
              <li>{image}</li>
            </ul>
          </Message>
          <FormContainer>
            <form
              action="/api/upload"
              encType="multipart/form-data"
              method="POST"
              onSubmit={submitAdd}
            >
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
                  onChange={(e) => showPreview(e)}
                  label="select image"
                  // custom
                />
                {uploading && <Loader />}
                <Image
                  id="pImage"
                  src={image}
                  rounded
                  style={{ width: "200px", height: "200px" }}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label>add product</Form.Label>

                <FormControl variant="primary" type="submit" value="Create" />
              </FormGroup>
            </form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default ProductEdit;
