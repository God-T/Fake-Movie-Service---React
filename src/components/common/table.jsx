import React from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = ({ headers, currSortColumn, onSort, bodyData }) => {
  return (
    <table className="table">
      <TableHead
        tableHeaders={headers}
        currSortColumn={currSortColumn}
        onSort={onSort}
      />
      <TableBody bodyData={bodyData} columnNames={headers} />
    </table>
  );
};

export default Table;
