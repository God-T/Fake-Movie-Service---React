import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleSumbit = (e) => {
    e.preventDefault();
    //call the server
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>login</h1>
        <form onSubmit={this.handleSumbit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              //   ref={this.username}
              autoFocus
              type="text"
              className="form-control"
              id="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="save ps" />
            <label className="form-check-label" htmlFor="save ps">
              Save the passwords
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
