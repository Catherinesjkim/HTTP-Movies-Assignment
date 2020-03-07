/* Part 1 - Updating a Movie:
Add a route at the path /update-movie/:id
Create a component with a form to update the chosen movie
Add a button in the movie component that routes you to your new route with the movies's id as the URL param
The form should make a PUT request to the server when submitted
When the call comes back successfully, reset your form state and route the user to /movies where they will see the updated movie in the list 

Pre-populate with all of the data - You usually need a PUT request to update a form

Click on update button
    - history.push to update form with :id of the item
    - update form will take in the item list as props
    - in the update form we find the item clicked from the list via the id param
    - populate the form with that item's data. 

Tasks:
  - Add a Route for the UpdateForm component
  - in Item.js add a click handler for the update button
  - in the handler function navigate the user to the updateForm with the id of that item in the params. 
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        console.log(response)
        setMovie(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  const handleChange = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'metascore') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

    const handleStars = event => {
      setMovie({
        ...movie, 
        stars: [event.target.value],
      })
    }

    const handleSubmit = e => {
      e.preventDefault();
      // make a PUT request to edit the item
      axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
          // res.data is the FULL array with updated movie - API - automatically
          // That's not always the case. Sometimes you need to build your own updated array - this project - Do it manually
          // const newMovieArr = props.movies.map
          setMovie(initialMovie)
          props.history.push('/')
        })
        .catch(err => console.log(err)); 
    };
    
    return (
      <div>
        <form onSubmit={handleSubmit} className="forms">
          <h2>Update New Movie</h2>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={movie.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="director"
            placeholder="director"
            value={movie.director}
            onChange={handleChange}
          />

          <input
            type="number"
            name="metascore"
            placeholder="metascore"
            value={movie.metascore}
            onChange={handleChange}
          />

          <input
            type="stars"
            name="stars"
            placeholder="stars"
            value={movie.stars}
            onChange={handleStars}
          />
          <button className="Button">Add Movie</button>
        </form>
      </div>
    );
  }; 

export default UpdateMovie;


