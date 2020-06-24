import React, { Component } from "react";
import Home from "./components/home";
import Movies from "./components/movie/movies";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Home />
      </main>
    );
  }
}

export default App;
