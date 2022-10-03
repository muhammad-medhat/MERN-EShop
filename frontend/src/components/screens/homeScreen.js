import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../com/product/product";
import { ListProducts } from "../../actions/productActions";
import Loader from "../loader";
import Paginate from '../paginate';
import Message from "../message";
import { useParams } from "react-router-dom";

const HomeScreen = () => {

  const { keyword, page = 1 } = useParams();
  console.log(keyword);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages } = productList;
  // console.log(loading, products, error);

  useEffect(() => {
    dispatch(ListProducts(keyword, page));
    console.log(productList);
  }, [dispatch, page, keyword]);
  // console.log(error);
  return (
    <>
      {loading ? (
        <Loader text="Loading products..." />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <>
          <h2>Latest Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}

          </Row>            
            <Paginate 
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
               />
          
     
        </>
      )}
    </>
  );
};

export default HomeScreen;
