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
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import Message from "../../message";
import { LinkContainer } from "react-router-bootstrap";
import { ListProducts, deleteProduct } from "../../../actions/productActions";

const ProductList = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingD, success: successD, errorD } = userDelete;
  // debugger
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(productList);

  function deleteHandler(id) {
    //delete product
    dispatch(deleteProduct(id));
  }

  function addHandler(id) {
    //delete product
    // dispatch(deleteUser(id));
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(ListProducts());
    } else nav("/login");
  }, [dispatch, successD, userInfo]);
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
        </>
      )}
    </>
  );
};

export default ProductList;
