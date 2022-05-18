import { useEffect, useState } from "react";
import { AddColor } from "./components/AddColor";
import "./App.css";
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { MovieDetails } from "./components/MovieDetails";
import TextField from '@mui/material/TextField';
import { NotFound } from "./NotFound";
import { Home } from "./components/Home";
import { AddMovie, MovieList } from "./components/MovieList";


import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { API } from "./components/global";





export default function App() {
  //  Lifting the state up - App parent


  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });



  return (
    <ThemeProvider theme={theme}>

      <Paper elevation={4} style={{ minHeight: "100vh" }}>
        <div className="App">

          {/* <AddColor/> */}

          {/* <MovieList /> */}
          <div className="nav-bar">
            <AppBar position="static">
              <Toolbar>

                <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                <Button color="inherit" onClick={() => navigate("/movies")}>Movies</Button>
                <Button color="inherit" onClick={() => navigate("/movies/add")}>Add movie</Button>
                <Button color="inherit" onClick={() => navigate("/color-game")}>Color-game</Button>
                <Button  style={{marginLeft:"auto"}}
                startIcon={mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />} color="inherit" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
                  {mode === "dark" ? "light" : "dark"} mode
                </Button>

              </Toolbar>
            </AppBar>
          </div>


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/color-game" element={<AddColor />} />
            {/* <Route path="/users" element={<UserList />} /> */}
            <Route path="*" element={<Navigate replace to="/404" />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/flims" element={<Navigate replace to="/movies" />} />
            <Route path="/movies/add" element={<AddMovie />} />
            <Route path="/movies/edit/:id" element={<EditMovie />} />
          </Routes>



        </div>
      </Paper>
    </ThemeProvider>

  )

}



function EditMovie() {
  const { id } = useParams();
  const [movie,setMovie] = useState(null);
  // const [movieList, setMovieList] = useState([]);

  useEffect(()=> {
    fetch(`${API}/movies/${id}`)
    .then(data => data.json())
    .then((mv)=>setMovie(mv));
  },[id]);
 
  return (
    <div>
    <pre>{JSON.stringify(movie,null,2)}</pre>
     {movie ? <EditMovieForm  movie={movie}/> : "Loading..."} 
    </div>
  )

}

function EditMovieForm({movie}) {
  const [name, setName] = useState(movie.name);
  const [poster, setPoster] = useState(movie.poster);
  const [rating, setRating] = useState(movie.rating);
  const [summary, setSummary] = useState(movie.summary);
  const [trailer, setTrailer] = useState(movie.trailer);

  const navigate = useNavigate();

  const editMovie = () => {
    const updatedMovie = {
      name,
      poster,
      rating,
      summary,
      trailer,
    };
    console.log(updatedMovie);
    // copy the movielist and add movie to it
    // setMovieList([...movieList, updatedMovie]);
    // Put METHOd:fetch

    fetch(`${API}/movies/${movie.id}`, {
       method: "PUT", 
       body: JSON.stringify(updatedMovie), 
       headers: {
          "Content-Type": "application/json" ,
      },
      }).then(()=> navigate('/movies'))


  };


  return (
    <div className="add-movie-form">

      <TextField onChange={(event) => setName(event.target.value)} label="Name" variant="filled" value={name} />
      
      <TextField onChange={(event) => setPoster(event.target.value)} label="Poster" variant="filled" value={poster} />

      <TextField onChange={(event) => setRating(event.target.value)} label="Rating" variant="filled" value={rating} />

      <TextField onChange={(event) => setSummary(event.target.value)} label="Summary" variant="filled" value={summary} />

      <TextField onChange={(event) => setTrailer(event.target.value)} label="Trailer" variant="filled" value={trailer} />

      <Button color="success" onClick={editMovie} variant="outlined">Save</Button>

    </div>
  )
}

