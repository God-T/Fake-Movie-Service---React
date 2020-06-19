import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../uilts/paginate";
import ListGroup from "./common/listGroup";
import MovieTable from "./movieTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currPage: 1,
    currGenre: "",
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

  render() {
    //object distructing
    const {
      pageSize,
      currPage,
      movies,
      currGenre,
      genres,
      currSortColumn,
    } = this.state;

    let { length: moviesCount } = movies;
    if (moviesCount === 0) return <p>There are no movies in the db.</p>;

    //filter
    let moviesToDisplay =
      currGenre && currGenre._id
        ? movies.filter((movie) => movie.genre.name === currGenre.name)
        : movies;
    //count after filter
    moviesCount = moviesToDisplay.length;
    //sort
    moviesToDisplay = _.orderBy(
      moviesToDisplay,
      [currSortColumn.path],
      [currSortColumn.order]
    );
    //pagindate
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
        </div>
      </div>
    );
  }
}

export default Movies;
