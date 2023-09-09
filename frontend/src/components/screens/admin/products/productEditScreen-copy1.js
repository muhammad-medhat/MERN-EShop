import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../loader";
import Message from "../../../message";
import {
  DetailsProduct,
  updateProduct,
} from "../../../../actions/productActions";
import {
  PRODUCTS_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../../../const/productConstants";
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

  function submitUpdate(e, uploadFile) {
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
    debugger;
    uploadHandler(e);
    dispatch({ type: PRODUCTS_DETAILS_RESET });
  }
  function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("pImage");
      preview.src = src;
      // preview.style.display = "block";
    }
  }
  useEffect(() => {
    if (!(userInfo && userInfo.isAdmin)) {
      nav("/login");
    }
    debugger;
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
  }, [dispatch, userInfo, successUpdate, successDetails, details, pid]);
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
            actionCb={(e) => submitUpdate(e, file)}
            name={name}
            price={price}
            description={description}
            image={image}
            countInStock={countInStock}
            brand={brand}
            category={category}
            uploading={uploading}
            // file={file}
            setFile={setFile}
            setName={setName}
            setPrice={setPrice}
            setDescription={setDescription}
            setCountInStock={setCountInStock}
            setBrand={setBrand}
            setCategory={setCategory}
            setImage={setImage}
            setUploading={setUploading}
          />
        </>
      )}
    </>
  );
};

export default ProductEdit;
