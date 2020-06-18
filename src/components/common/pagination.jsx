import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  moviesCount,
  pageSize,
  onPageChange,
  currPage,
  onNextPage,
  onPrevPage,
}) => {
  const pagesCount = Math.ceil(moviesCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        <li className={currPage === 1 ? "page-item disabled" : "page-item"}>
          <a className="page-link" onClick={() => onPrevPage(currPage)}>
            Prev
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currPage === pagesCount ? "page-item disabled" : "page-item"
          }
        >
          <a className="page-link" onClick={() => onNextPage(currPage)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

//for reuseable component
Pagination.propTypes = {
  moviesCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currPage: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
};

export default Pagination;
