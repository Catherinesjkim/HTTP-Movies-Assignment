/* Part 2 - Deleting A Movie:
Add a delete button in the movie component that makes a DELETE request
When the call comes back successfully, route the user to /movies where they will see the updated movie list without the deleted movie */
import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        // redirect to movie's page
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={() => this.props.history.push(`/update-movie/${this.state.movie.id}`)} className="md-button">Update</button>
        <button onClick={this.handleDelete} className="md-button">Delete</button>
      </div>
    );
  }
}
  
  
  
  
  