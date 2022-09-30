import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";

import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const SearchBox = (props) => {
  const [keyword, setKeyword] = useState("");
  const nav = useNavigate();

  function searchSubmit(e) {
    e.preventDefault();
    const url = keyword.trim() === "" ? "/" : `/search/${keyword.trim()}`;
    nav(url);
  }
  useEffect(() => {}, [keyword]);
  return (
    <>
      <Form onSubmit={searchSubmit} className="d-flex1 border1 px-2">
        <Row className=" py-1">
          <Col className="">
            <Form.Control
              type="text"
              name="q"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className=""
              placeholder="search..."
            />
          </Col>
          <Col>
            <Button type="submit" variant="outline-success" className="p-2">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SearchBox;
