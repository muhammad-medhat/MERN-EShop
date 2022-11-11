import React, { useEffect } from "react";
// import Image from "react-bootstrap/Image";
// import FormContainer from "../../../formContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import Message from "../../message";
import { ListIssues } from "../../../actions/issueActions";
import IssueItem from "./issueItem";
import { Col, Container, Stack } from "react-bootstrap";

// import Paginate from '../../../paginate';

const IssueList = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { page = 1 } = useParams();
  //Selectors
  const issueList = useSelector((state) => state.issueList);
  const { loading, issues, error, pages } = issueList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // debugger

  useEffect(() => {
    // debugger
    dispatch(ListIssues());
  }, [dispatch, userInfo, page]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <h2>issues</h2>
          <Stack direction="vertical" gap={3}>
            {issues &&
              issues.map((issue, index) => (
                <Col key={index}>
                  <IssueItem issue={issue} />
                </Col>
              ))}
          </Stack>
        </Container>
      )}
    </>
  );
};

export default IssueList;
