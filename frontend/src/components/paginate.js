import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer, Link } from "react-router-bootstrap";

const Paginate = ({ pages, page, keyword, isAdmin=false, obj='' }) => {
  console.group('pagination props')
  console.log(" pages", pages);
  console.log(" page", page);
  console.log("keyword", keyword);
  console.log("admin", isAdmin);
  console.groupEnd()
  return (
    pages > 1 && (
      <Pagination>
        {[
          [...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/${obj}/page/${x + 1}`
              }
            >
              <Pagination.Item active={page === x + 1}>{x + 1}</Pagination.Item>
            </LinkContainer>
          )),
        ]}
      </Pagination>
    )
  );
};
Paginate.defaultProps = {
  color: "#ffc107",
};

export default Paginate;
