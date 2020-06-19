import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
class MovieTable extends Component {
  headers = [
    { path: "title", label: "Title" },
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
    const {
      movies,
      onDelete,
      onLikeChange,
      onSort,
      currSortColumn,
    } = this.props;
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
