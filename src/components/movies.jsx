import React, { Component } from "react";
import Movie from "./movie";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../uilts/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currPage: 1,
    currGenre: "",
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "All", _id: null }, ...getGenres()],
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  handleNext = (page) => {
    this.setState({ currPage: page + 1 });
  };
  handlePrev = (page) => {
    this.setState({ currPage: page - 1 });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movie.like;
    this.setState({ movies });
  };

  handleListGroupSelect = (group) => {
    this.setState({ currGenre: group, currPage: 1 });
  };

  render() {
    const { pageSize, currPage, movies, currGenre, genres } = this.state;
    console.log(currGenre);
    let { length: moviesCount } = movies;
    if (moviesCount === 0) return <p>There are no movies in the db.</p>;
    let moviesToDisplay =
      currGenre && currGenre._id
        ? movies.filter((movie) => movie.genre.name === currGenre.name)
        : movies;
    console.log(moviesToDisplay);
    moviesCount = moviesToDisplay.length;
    moviesToDisplay = paginate(moviesToDisplay, currPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            textProperty="name"
            valueProperty="_id"
            selectedGroupTextProperty={currGenre.name}
            onSelect={this.handleListGroupSelect}
          />
        </div>
        <div className="col">
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
              {moviesToDisplay.map((movie) => (
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
            itemsCount={moviesCount}
            pageSize={pageSize}
            currPage={currPage}
            onPageChange={this.handlePageChange}
            onNextPage={this.handleNext}
            onPrevPage={this.handlePrev}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
