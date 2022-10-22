import React, { useState, useEffect } from "react";
import { Row, Col, FormControl, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../../formContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import Message from "../../message";
import { listMyOrders } from "../../../actions/orderActions";

import Form from "react-bootstrap/Form";
import e from "cors";

const UserOrders = (props) => {
  const { user } = props;

  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const myOrders = useSelector((state) => state.orderListMy);
  const { loading, success, error, orders } = myOrders;

  const [isDelivered, setIsDelivered] = useState(true);
  const [isPaid, setIsPaid] = useState(true);

  const switchDeliveredOrders = () => {
    setIsDelivered(!isDelivered);
  };
  const switchPaidOrders = () => {
    setIsPaid(!isPaid);
  };

  useEffect(
    () => {
      dispatch(listMyOrders());
      // console.log('my orders', myOrders);
      // console.log("orders", orders);
    },
    [dispatch, user]
    // myOrders
  );
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !orders.length ? (
        <Message variant={"danger"}>No Orders</Message>
      ) : (
        <>
          <FormContainer>
            <Form>
              <Row>
                <Col>
                  <Form.Check
                    type="switch"
                    id="showPaid"
                    onChange={switchPaidOrders}
                    value={isPaid}
                    label="Paid"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="switch"
                    id="showDelivered"
                    onChange={switchDeliveredOrders}
                    value={isDelivered}
                    label="Delivered"
                  />
                </Col>
              </Row>
            </Form>
          </FormContainer>

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
                  o.isPaid === isPaid &&
                  o.isDelivered === isDelivered && (
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
                          <>
                            <i
                              className="fas fa-check"
                              style={{ color: "green" }}
                            ></i>
                            {o.paidAt.substring(0, 10)}
                          </>
                        ) : (
                          <i
                            className="fas fa-times"
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
                  )
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default UserOrders;
