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
import Image from "react-bootstrap/Image";
import FormContainer from "../../formContainer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import Message from "../../message";
import { LinkContainer } from "react-router-bootstrap";
import {
  ListProducts,
  deleteProduct,
  initProduct,
  createProduct,
} from "../../../actions/productActions"; 
import { PRODUCT_INIT_RESET } from "../../../const/productConstants";
import Paginate from '../../paginate';


const ProductList = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {page=1} = useParams()
  //Selectors
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    errorCreate,
  } = productCreate;

  const productInit = useSelector((state) => state.productInit);
  const {
    loading: loadingInit,
    success: successInit,
    errorInit,
    product: initializedProduct,
  } = productInit;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  // debugger

  function deleteHandler(id) {
    //delete product
    dispatch(deleteProduct(id));
  }

  function addHandler(e) {
    e.preventDefault();
      dispatch(initProduct());
      // debugger    
      if (successInit) {
        // nav(`/admin/products/${productInit._id}/edit`);
      }
  }
  function logInfo(){
      
    console.group("Selectors");
    console.log("List", productList);
    console.log("Delete", productDelete);
    console.log("Create", productCreate);
    console.log("Init", productInit);
    console.groupEnd();
  }

  useEffect(() => {
    dispatch({type: PRODUCT_INIT_RESET})
    if (!userInfo || !userInfo.isAdmin) {
      nav("/login");
      // 
    }  
    if(successInit){
      nav(`/admin/products/${initializedProduct._id}/edit`);
    } else {
      dispatch(ListProducts('', page));
    }
    logInfo()
  }, [dispatch, successDelete, successInit, userInfo, page]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h2>products</h2>
          <Row className="align-items-center">
            <Col className="text-right">
              <Button onClick={addHandler} className="my-3">
                <i className="fas fa-plus"></i> add product
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                {/* <td>image</td> */}
                <th> Name</th>
                <th>price</th>
                <th>category</th>
                <th>brand</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    {/* <td><Image src={product.image} alt={product.name} fluid rounded /></td> */}
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.category} </td>
                    <td>{product.brand} </td>
                    <td>
                      <Row className="align-items-center">
                        <Col>
                          <LinkContainer
                            to={`/admin/products/${product._id}/edit`}
                          >
                            <Button variant="primary">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                        </Col>
                        <Col>
                          {" "}
                          <Button
                            variant="danger"
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
            <Paginate 
              pages={pages}
              page={page}
              isAdmin
              obj="products"
               />
        </>
      )}
    </>
  );
};

export default ProductList;
