import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import {
  getMovies,
  deleteMovie,
  changeLikeMovie,
} from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import Pagination from "../common/pagination";
import { paginate } from "../../uilts/paginate";
import ListGroup from "../common/listGroup";
import MovieTable from "./movieTable";
import SearchBar from "../common/searchBar";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 20,
    currPage: 1,
    currGenre: { name: "All", _id: null },
    currSortColumn: { path: "title", order: "asc" },
    currSearchQuery: "",
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "All", _id: null }, ...getGenres()],
    });
  }

  handleDelete = ({ movie, moviesCount }) => {
    deleteMovie(movie._id); //delete "db"
    //if its the last movie in the curr page then jump to prev page
    if (moviesCount === 1) this.handlePageChange(this.state.currPage - 1);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movie.like;
    this.setState({ movies });
    changeLikeMovie(movie._id); //change "db"
  };

  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  handleGenreSelect = (group) => {
    this.setState({ currGenre: group, currPage: 1 });
  };

  handleSort = (currSortColumn) => {
    this.setState({ currSortColumn });
  };

  handleSearch = (currSearchQuery) => {
    this.setState({ currSearchQuery });
  };

  getPagedData = () => {
    const {
      pageSize,
      currPage,
      movies,
      currGenre,
      currSortColumn,
      currSearchQuery,
    } = this.state;
    //filt by genre:
    let moviesToDisplay =
      currGenre && currGenre._id
        ? movies.filter((movie) => movie.genre.name === currGenre.name)
        : movies;
    //filt by searchQuery:
    moviesToDisplay = moviesToDisplay.filter((movie) =>
      movie.title.toLowerCase().includes(currSearchQuery)
    );
    //count after filter:
    const moviesCount = moviesToDisplay.length;
    //sort:
    moviesToDisplay = _.orderBy(
      moviesToDisplay,
      [currSortColumn.path],
      [currSortColumn.order]
    );
    //pagindate:
    moviesToDisplay = paginate(moviesToDisplay, currPage, pageSize);
    return { moviesToDisplay, moviesCount };
  };

  render() {
    //object distructing
    const { currGenre, genres } = this.state;
    const dataToDisplay = this.getPagedData();
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            textProperty="name"
            valueProperty="_id"
            selectedGroupTextProperty={currGenre.name}
            onSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">{this.displayingData(dataToDisplay)}</div>
      </div>
    );
  }

  movieTableFuncs() {
    return (
      <React.Fragment>
        <Link to="/movies/new">
          <button className="btn btn-primary btn-sm">+ New Movie</button>
        </Link>
        <SearchBar
          value={this.state.currSearchQuery}
          onChange={this.handleSearch}
        />
      </React.Fragment>
    );
  }

  displayingData = ({ moviesToDisplay, moviesCount }) => {
    const { pageSize, currPage, currSortColumn } = this.state;
    return moviesCount === 0 ? (
      <React.Fragment>
        <p style={{ marginRight: "20px", display: "inline-block" }}>
          There are no movies in the db.
        </p>
        {this.movieTableFuncs()}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <p style={{ marginRight: "20px", display: "inline-block" }}>
          Showing {moviesCount} movies in the db.
        </p>
        {this.movieTableFuncs()}
        <MovieTable
          movies={moviesToDisplay}
          onDelete={this.handleDelete}
          onLikeChange={this.handleLike}
          onSort={this.handleSort}
          currSortColumn={currSortColumn}
          moviesCount={moviesToDisplay.length}
        />
        <Pagination
          itemsCount={moviesCount}
          pageSize={pageSize}
          currPage={currPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  };
}

export default Movies;
