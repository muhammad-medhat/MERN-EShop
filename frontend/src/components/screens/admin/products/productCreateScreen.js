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
import ProductForm from "./productForm";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const productList = useSelector((state) => state.productList);
  // const { loading, products, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    message: messageCreate
  } = productCreate;
  // debugger
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  /* State variables */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState();
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  // temp variables
  // const [imgName, setImgName] = useState("");
  const [tempImage, setTempImage] = useState("");
  /** End state variables */
  const uploadHandler = async(file)=> {
    debugger
    // const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    console.log(formData);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
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
  function submitAdd(e) {
    e.preventDefault();    
    debugger;
    uploadHandler(file)
    dispatch(
      createProduct({
        name,
        description,
        price,
        category,
        brand,
        countInStock,
        image,
      })
    );
  }
  function upload(e) {
    e.preventDefault();
    debugger;
    // const temp = URL.createObjectURL(e.target.files[0]);
    // setTempImage(temp);
    // setImgName(e.target.files[0].name);
    setImage(e.target.value.files[0].name);
    setImagePath(e.target.value);
  }
  function showPreview(e){
    if(e.target.files.length > 0){
      debugger
      setImage(e.target.files[0].name)
      setFile(e.target.files[0])
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("pImage");
      preview.src = src;
      // preview.style.display = "block";
    }
  }
  useEffect(() => {
    if (!(userInfo && userInfo.isAdmin)) {
      nav("/login");
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });

      debugger;
      nav("/admin/products");
    }
    console.log(errorCreate);
  }, [dispatch, successCreate, errorCreate, userInfo, nav]);
  return (
    <>
      {loadingCreate ? (
        <Loader />
      ) : (
        <>
          <Link to="/admin/products" className="p-3">
            <span>
              <i className="fa fa-arrow-left p-2 mb-2" aria-hidden="true"></i>
            </span>

            <span>Back to product list</span>
          </Link>

          {errorCreate ? <Message variant="danger">{errorCreate}</Message> : ""}
          {messageCreate ? (
            <Message variant="danger">{messageCreate}</Message>
          ) : (
            ""
          )}

          <ProductForm
            action="create"
            title="creating new product"
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
            setImagePath={setImagePath}
            setUploading={setUploading}
          />
        </>
      )}
    </>
  );
};

export default ProductCreate;
