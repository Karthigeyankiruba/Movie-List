import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Movie } from "./Movie";
import { API } from "./global";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
export function MovieList() {
  // const movieList=INTIAL_MOVIE_LIST;
  const [movieList, setMovieList] = useState([]);

  const getMovies = () => {
    fetch(`${API}/movies`, { method: "GET" })
      .then(data => data.json())
      .then((movies) => setMovieList(movies));
  };

  useEffect(() => getMovies(), []);

  // delete and refresh movie list 
  const deleteMovie = (id) => {
    console.log("Deleting movie:", id);
    fetch(`${API}/movies/${id}`, { method: "DELETE" })
      .then(() => getMovies());
  };
  const navigate = useNavigate();
  return (
    <div>




      <div className="movie-list">
        {movieList.map((mv, id) => (<Movie movie={mv} key={mv.id} id={mv.id} deleteButton={
           <IconButton 
           style={{marginLeft:"auto"}} onClick={() => deleteMovie(mv.id)} color="error" aria-label="Delete">
           <DeleteIcon />
         </IconButton>} 
        // <button onClick={() => deleteMovie(mv.id)}>Delete</button>
        editButton={
          <IconButton onClick={() => navigate(`/movies/edit/${mv.id}`)} color="secondary" aria-label="Delete">
          <EditIcon />
        </IconButton>} />))}
        {/* // <button onClick={() => navigate(`/movies/edit/${mv.id}`)}>Edit</button> */}
      
      </div>
    </div>
  );
}


export function AddMovie() {
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const [trailer, setTrailer] = useState("");

  const navigate = useNavigate();

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
    // setMovieList([...movieList, newMovie]);
    // POST METHO:fetch

    fetch(`${API}/movies`, {
       method: "POST", 
       body: JSON.stringify(newMovie), 
       headers: {
          "Content-Type": "application/json" ,
      },
      }).then(()=> navigate('/movies'))
     

  };


  return (
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