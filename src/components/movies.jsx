import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movie.like;
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the db.</p>;
    return (
      <React.Fragment>
        <p>Showing {count} movies in the db.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                onDelete={() => this.handleDelete(movie)}
                onLike={() => this.handleLike(movie)}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
