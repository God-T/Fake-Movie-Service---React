import React, { Component } from "react";
import NavBarHome from "./home/navBarHome";
import Movies from "./movie/movies";
import Dummy from "./home/dummy";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./notFound";
import MovieForm from "./movie/movieForm";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBarHome />
        <div className="content">
          <Switch>
            {/* switch order with: most specific one --> generate one*/}

            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
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
