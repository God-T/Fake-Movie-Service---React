import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 3,
    currpage: 1,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log(page);
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movie.like;
    this.setState({ movies });
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    if (moviesCount === 0) return <p>There are no movies in the db.</p>;
    return (
      <React.Fragment>
        <p>Showing {moviesCount} movies in the db.</p>
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
                onLikeChange={() => this.handleLike(movie)}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          moviesCount={moviesCount}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
