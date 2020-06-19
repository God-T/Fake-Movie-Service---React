import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCol = (colName, item) => {
    if (colName.content) {
      return colName.content(item);
    }
    return _.get(item, colName.path);
  };

  generateKey = (item, colName) => {
    return item._id + (colName.path || colName.key);
  };

  render() {
    const { bodyData, columnNames, moviesCount } = this.props;
    return (
      <tbody>
        {bodyData.map((item) => (
          <tr key={item._id}>
            {columnNames.map((colName) => (
              <td key={this.generateKey(item, colName)}>
                {this.renderCol(colName, item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
