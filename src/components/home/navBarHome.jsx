import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom"; //prevent full page reload

const NavBarHome = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link class="navbar-brand" to="/">
        Fake Movie Service
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarHome;
