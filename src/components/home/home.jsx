import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBarHome from "./navBarHome";
import Movies from "../movie/movies";
import NotFound from "../notFound";
import MovieForm from "../movie/movieForm";
import LoginForm from "./../loginForm";
import RegisterForm from "./../registerForm";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <NavBarHome />
        </header>
        <div className="container">
          <Switch>
            {/* switch order with: most specific one --> generate one*/}
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route exact path="/movies" component={Movies} />
            <Route path="/customers" render={() => <p>Customers</p>} />
            <Route path="/rentals" render={() => <p>Rentals</p>} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
