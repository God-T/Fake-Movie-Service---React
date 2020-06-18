import React, { Component } from "react";
import Movies from "./components/movies";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <main className="container">
        <h1>A Fake Movie Service</h1>
        <Movies />
      </main>
    );
  }
}

export default App;
