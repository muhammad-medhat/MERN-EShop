import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../com/product/product";
import { ListProducts } from "../../actions/productActions";
import Loader from "../loader";
import Paginate from "../paginate";
import Message from "../message";
import { useParams } from "react-router-dom";
import ProductCarousel from "../com/product/productCarousel";
import Meta from "../com/Meta";
import IssueForm from "./issues/issueForm";
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import FormContainer from "../formContainer";


const IssueTrackerScreen = () => {
    const [open, setOpen] = useState(false);
    const [className, setClassName] = useState('fa-caret-down');
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages } = productList;
  // console.log(loading, products, error);
  const changeState=()=>{
    setOpen(!open)
    if (open) {
      setClassName('fa-caret-down')
    } else{
      setClassName('fa-caret-up')

    }
  }

  useEffect(() => {
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader text="Loading products..." />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h2>issue tracker</h2>

          <FormContainer>
            <div className="container-fluid">
              <div className="row">
                <span className="col-xs-5">
                  <hr />
                </span>
                <span className="col-xs-2">
                  <i className={`fa-solid ${className}`}></i>
                  <span
                    onClick={changeState}
                    aria-controls="form"
                    aria-expanded={open}                    
                    className="px-2"
                    style={{fontSize: 'larger'}}

                  >
                    add issue
                  </span>
                </span>
                <span className="col-xs-5">
                  <hr />
                </span>
              </div>
            </div>

            <Collapse in={open}>
              <div id="form">
                <IssueForm />
              </div>
            </Collapse>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default IssueTrackerScreen;
