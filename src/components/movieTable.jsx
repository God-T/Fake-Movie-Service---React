import React, { Component } from "react";
import Like from "./common/like";
class MovieTable extends Component {
  render() {
    const { movies, onDelete, onLikeChange } = this.props;
    return (
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
        </tbody>
      </table>
    );
  }
}

export default MovieTable;
