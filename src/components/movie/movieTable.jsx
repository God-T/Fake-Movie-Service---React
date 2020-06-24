import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";
import { Link } from "react-router-dom";
class MovieTable extends Component {
  headers = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.like}
          movie={movie}
          onLikeChange={this.props.onLikeChange}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() =>
            this.props.onDelete({
              movie,
              moviesCount: this.props.moviesCount,
            })
          }
          className="btn btn-danger btn-sm"
        >
          X
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, currSortColumn } = this.props;
    return (
      <Table
        headers={this.headers}
        currSortColumn={currSortColumn}
        onSort={onSort}
        bodyData={movies}
      />
    );
  }
}

export default MovieTable;
