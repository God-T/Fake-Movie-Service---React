import React, { Component } from "react";

//input:
//currSortColumn onsort headers
//
class TableHead extends Component {
  sorting = (path) => {
    const currSortColumn = { ...this.props.currSortColumn };
    if (currSortColumn.path === path) {
      currSortColumn.order = currSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      currSortColumn.path = path;
      currSortColumn.order = "asc";
    }
    this.props.onSort(currSortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.tableHeaders.map((header) => (
            <th
              key={header.path || header.key}
              onClick={() => this.sorting(header.path)}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
