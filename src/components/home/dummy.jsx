import React, { Component } from "react";
class Dummy extends Component {
  render() {
    const { name } = this.props;
    return <p>{name}</p>;
  }
}

export default Dummy;
