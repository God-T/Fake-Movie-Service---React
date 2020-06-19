import React, { Component } from "react";
import Like from "./common/like";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";
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
      <table className="table">
        <TableHead
          tableHeaders={this.headers}
          currSortColumn={currSortColumn}
          onSort={onSort}
        />
        <TableBody
          bodyData={movies}
          columnNames={this.headers}
          onDelete={onDelete}
          onLikeChange={onLikeChange}
        />
        {/* <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.like}
                  movie={movie}
                  onLikeChange={onLikeChange}
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    onDelete({ movie, moviesCount: movies.length })
                  }
                  className="btn btn-danger btn-sm"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    );
  }
}

export default MovieTable;
