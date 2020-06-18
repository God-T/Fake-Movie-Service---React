import React from "react";
import _ from "lodash";

const Pagination = ({ moviesCount, pageSize, onPageChange, currPage }) => {
  const pagesCount = Math.ceil(moviesCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        <li className={currPage === 1 ? "page-item disabled" : "page-item"}>
          <a className="page-link">Prev</a>
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
          <a className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
