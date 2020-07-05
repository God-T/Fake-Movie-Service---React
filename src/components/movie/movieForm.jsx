import React from "react";
import Joi from "@hapi/joi";
import Form from "./../common/form";
import { getGenres } from "../../services/fakeGenreService";
import { getMovie, saveMovie } from "./../../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      like: false,
    },
    errors: {},
    genres: [],
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });
    const _id = this.props.match.params.id;
    if (_id === "new") return;
    const movie = getMovie(_id);
    if (!movie) return this.props.history.replace("/not-found");

    const dataToView = {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      like: movie.like,
    };
    this.setState({ data: dataToView });
  }

  schema = {
    _id: Joi.any(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .integer()
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    like: Joi.bool().required(),
  };

  doSubmit = () => {
    console.log("movie form saved");
    saveMovie(this.state.data);
    this.props.history.push("/movies"); //rerendering
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Choose a Genre:", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
