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
import ProductForm from "./productForm";


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

  function submitUpdate(e) {
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
          <ProductForm
            action="edit"
            title={name}           
            actionCb={submitUpdate}
            name={name}
            price={price}
            description={description}
            image={image}
            countInStock={countInStock}
            brand={brand}
            category={category}
            uploading={uploading}

            setName={setName}
            setPrice={setPrice}
            setDescription={setDescription}
            setCountInStock={setCountInStock}
            setBrand={setBrand}
            setCategory={setCategory}
            setImage={setImage}
            // setImagePath={setImagePath}
            setUploading={setUploading}
          />
        </>
      )}
    </>
  );
};

export default ProductEdit;
