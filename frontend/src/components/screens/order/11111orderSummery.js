import React, { useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummery = (props) => {
console.log('summery', props);
const {shipping, totalSum, taxSum, itemsSum}=props
  const cart = useSelector((s) => s.cart);
  const nav = useNavigate();

  //summery
  const tax = 0.15;
  // debugger;
  
  useEffect(() => {

  }, [props]);

  return (
    <>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>order summery</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{itemsSum}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxes</Col>
                  <Col>{taxSum}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>{shipping}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>order total</Col>
                  <Col>{totalSum}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            
            <ListGroup.Item>
              <ListGroup.Item>
                {/* {error && <Message variant="danger">{error}</Message>} */}
              </ListGroup.Item>
            </ListGroup.Item>
            

          </Card>

    </>
  );
};

export default OrderSummery;
