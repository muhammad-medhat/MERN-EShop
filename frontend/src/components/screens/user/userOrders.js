import React, { useState, useEffect } from "react";
import { Form, Row, Col, FormControl, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import Message from "../../message";
import { listMyOrders } from "../../../actions/orderActions";

const UserOrders = (props) => {
  const { user } = props;

  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const myOrders = useSelector((state) => state.orderListMy);
  const { loading, success, error, orders } = myOrders;

  useEffect(
    () => {
      dispatch(listMyOrders());
      // console.log('my orders', myOrders);
      console.log("orders", orders);
    },
    [dispatch, user],
    myOrders
  );
  return (
    <>
      {/* {JSON.stringify(props)} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          striped
          bordered
          responsive
          hover
          className="text-center table-sm"
        >
          <thead>
            <tr>
              <th>order id</th>
              <th>Date</th>
              <th>total</th>
              <th>paid</th>
              <th>delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              return (
                <tr key={o._id}>
                  <td>
                    <Link to={`/order/${o._id}`} title="show order">
                      {o._id}
                    </Link>
                  </td>
                  <td>{o.createdAt.substring(0, 10)}</td>
                  <td>{o.totalPrice}</td>
                  <td>
                    {o.isPaid ? (
                      o.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times danger"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {o.isDelivered ? (
                      o.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times danger"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserOrders;
