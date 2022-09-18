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
// import FormContainer from "../../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../loader";
import Message from "../../../message";
import { LinkContainer } from "react-router-bootstrap";
import { listOrders } from "../../../../actions/orderActions";
// import { PRODUCT_INIT_RESET } from "../../../const/productConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  console.log(orderList);
  const { loading, success, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else nav("/login");
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th> date</th>
              <th>total price</th>
              <th>paid</th>
              <th>delivered</th>
              <td>...</td>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times danger"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times danger"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                  <LinkContainer
                    to={`/admin/orders/${order._id}`}
                  >
                    <Button variant="primary">
                      details...
                    </Button>
                  </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderList;
