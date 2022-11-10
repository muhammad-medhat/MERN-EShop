import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  Image,
} from "react-bootstrap";
import FormContainer from "../../../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../loader";
import Message from "../../../message";
// import { LinkContainer } from "react-router-bootstrap";
import { createProduct } from "../../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../../const/productConstants";
import './productStyle.css'
const ProductForm = (props) => {
  const {
    title,
    action,
    actionCb,
    name,
    price,
    description,
    image,
    countInStock,
    brand,
    category,
    uploading,
    setName,
    setPrice,
    setDescription,
    setCountInStock,
    setBrand,
    setCategory,
    setImage,
    setImagePath,
    setUploading,
  } = props
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const productList = useSelector((state) => state.productList);
  // const { loading, products, error } = productList;

  const uploadHandler = async (e) => {
    // debugger;
    // const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log('formData', formData);
    for (var key of formData.entries()) {
      console.log('entry', key[0] + ": " + key[1]);
    }
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        body: formData,
      };
      console.log(config);
      // const {data} = await axios.post('/api/upload', formData, config)
      const res = await fetch("/api/upload", config);
      const data = await res.text();
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  // function submitAdd(e) {
  //   e.preventDefault();
  //   // debugger;
  //   uploadHandler(e);
  //   dispatch(
  //     createProduct({
  //       name,
  //       description,
  //       price,
  //       category,
  //       brand,
  //       countInStock,
  //       image,
  //     })
  //   );
  // }
  function showPreview(e) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }
  useEffect(() => {
      // debugger;
      if (!file) {
        setPreview(undefined);
        return;
      } else {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setImage(file.name);

        // free memory when ever this component is unmounted
        // return () => URL.revokeObjectURL(objectUrl)
      }


  }, [dispatch, file]);
  return (
    <FormContainer>
      <h1>{title}</h1>

      {
        //JSON.stringify(props)
      }
      <Form onSubmit={actionCb} encType='multipart/form-data'>
        <FormGroup controlId="name">
          <Form.Label>Name</Form.Label>
          <FormControl
            type="text"
            placeholder="product name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="description">
          <Form.Label>description</Form.Label>
          <FormControl
            as="textarea"
            placeholder="product description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="price">
          <Form.Label>price</Form.Label>
          <FormControl
            type="Number"
            placeholder="product price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="category">
          <Form.Label>category</Form.Label>
          <FormControl
            type="text"
            placeholder="product category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="brand">
          <Form.Label>brand</Form.Label>
          <FormControl
            type="text"
            placeholder="product brand"
            required
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

        <FormGroup controlId="image">
          <Form.Label>image</Form.Label>
          <FormControl
            type="file"
            placeholder="product image"
            name="image"
            // value={image}
            // required
            onChange={(e) => showPreview(e)}
          />
          {uploading && <Loader />}
          <div className="preview">
            <Image
              id="pImage"
              src={preview}
              rounded
              // style={{
              //   maxHeight: "500px",
              //   minWidth: "500px",
              //   objectFit: "contain",
              // }}
            />
            {/* {imgName} */}
          </div>
        </FormGroup>

        <FormGroup>
          <Form.Label>{title}</Form.Label>
          <Form.Control variant="primary" type="submit" value={action} />
        </FormGroup>
      </Form>
    </FormContainer>
  );
};

export default ProductForm;
