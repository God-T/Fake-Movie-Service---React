import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import Pagination from "../common/pagination";
import { paginate } from "../../uilts/paginate";
import ListGroup from "../common/listGroup";
import MovieTable from "./movieTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currPage: 1,
    currGenre: { name: "All", _id: null },
    currSortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "All", _id: null }, ...getGenres()],
    });
  }

  handleDelete = ({ movie, moviesCount }) => {
    //if its the last movie in the curr page then jump to prev page
    if (moviesCount === 1) this.handlePageChange(this.state.currPage - 1);
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

  handleSort = (currSortColumn) => {
    this.setState({ currSortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currPage,
      movies,
      currGenre,
      currSortColumn,
    } = this.state;

    //filter
    let moviesToDisplay =
      currGenre && currGenre._id
        ? movies.filter((movie) => movie.genre.name === currGenre.name)
        : movies;
    //count after filter
    const moviesCount = moviesToDisplay.length;
    //sort
    moviesToDisplay = _.orderBy(
      moviesToDisplay,
      [currSortColumn.path],
      [currSortColumn.order]
    );
    //pagindate
    moviesToDisplay = paginate(moviesToDisplay, currPage, pageSize);
    return { moviesToDisplay, moviesCount };
  };

  displayingData = ({ moviesToDisplay, moviesCount }) => {
    const { pageSize, currPage, currSortColumn } = this.state;
    return moviesCount === 0 ? (
      <p>Showing {moviesCount} movies in the db.</p>
    ) : (
      <React.Fragment>
        <p>Showing {moviesCount} movies in the db.</p>
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
          onNextPage={this.handleNext}
          onPrevPage={this.handlePrev}
        />
      </React.Fragment>
    );
  };

  render() {
    //object distructing
    const { currGenre, genres } = this.state;

    let { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the db.</p>;

    const dataToDisplay = this.getPagedData();

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
        <div className="col">{this.displayingData(dataToDisplay)}</div>
      </div>
    );
  }
}

export default Movies;
