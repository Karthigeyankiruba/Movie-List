import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Movie } from "./Movie";

export function MovieList({ movieList, setMovieList }) {
  // const movieList=INTIAL_MOVIE_LIST;

  
  return (
    <div>


      

      <div className="movie-list">
        {movieList.map((mv, index) => (<Movie movie={mv} key={index} id={index} />))}
      </div>
    </div>
  );
}


export function AddMovie({movieList,setMovieList}){
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const [trailer, setTrailer] = useState("");

  const addMovie = () => {
    const newMovie = {
      name,
      poster,
      rating,
      summary,
      trailer,
    };
    console.log(newMovie);
    // copy the movielist and add movie to it
    setMovieList([...movieList, newMovie]);
  };

  return(
    <div className="add-movie-form">

        <TextField onChange={(event) => setName(event.target.value)} label="Name" variant="filled" />

        <TextField onChange={(event) => setPoster(event.target.value)} label="Poster" variant="filled" />

        <TextField onChange={(event) => setRating(event.target.value)} label="Rating" variant="filled" />

        <TextField onChange={(event) => setSummary(event.target.value)} label="Summary" variant="filled" />

        <TextField onChange={(event) => setTrailer(event.target.value)} label="Trailer" variant="filled" />

        <Button onClick={addMovie} variant="outlined">Add movie</Button>

      </div>
  )
}