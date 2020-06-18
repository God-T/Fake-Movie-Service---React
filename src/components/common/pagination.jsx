import React from "react";
import _ from "lodash";

const Pagination = ({ moviesCount, pageSize, onPageChange }) => {
  const pagesCount = Math.ceil(moviesCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
