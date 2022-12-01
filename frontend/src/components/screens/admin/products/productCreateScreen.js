import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../loader";
import Message from "../../../message";
import { createProduct } from "../../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../../const/productConstants";
import ProductForm from "./productForm";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  // debugger;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    message: messageCreate,
  } = productCreate;
  // debugger;
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
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);

  /** End state variables */
  const uploadHandler = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const config = {
        method: "post",
        body: formData,
      };
      fetch("/api/upload", config)
        .then((res) => res.text())
        .then((data) => setImage(data));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  function submitAdd(e, uploadFile) {
    e.preventDefault();
    uploadHandler(uploadFile);
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

  useEffect(() => {
    if (!(userInfo && userInfo.isAdmin)) {
      nav("/login");
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });

      // debugger;
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

          {errorCreate ? (
            <Message variant="danger">err{errorCreate}</Message>
          ) : (
            ""
          )}
          {messageCreate ? (
            <Message variant="danger">msg{messageCreate}</Message>
          ) : (
            ""
          )}

          <ProductForm
            action="create"
            title="creating new product"
            actionCb={(e) => submitAdd(e, file)}
            name={name}
            price={price}
            description={description}
            image={image}
            countInStock={countInStock}
            brand={brand}
            category={category}
            uploading={uploading}
            file={file}
            setFile={setFile}
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

export default ProductCreate;
