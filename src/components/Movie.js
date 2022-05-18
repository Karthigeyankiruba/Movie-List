import { useState } from "react";
import { Counter } from "./Counter";
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent,CardActions } from "@mui/material";
export function Movie({ movie, id,deleteButton,editButton }) {
  const styles = {
    color: movie.rating > 8 ? "green" : "red",
  };


  const [show, setShow] = useState(true);
  // const summarystyles={
  //   display: show ? "block" : "none",
  // };
  const navigate = useNavigate();
  // const movie = {
  //   name: "The Avengers",
  //   rating: 8,
  //   summary:
  //     "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
  //   poster:
  //     "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg"
  // };
  return (
    <Card className="movie-container">
      <img className="movie-poster" src={movie.poster} alt={movie.name} />
      <CardContent>
      <div className="movie-specs">
        <h2 className="movie-name">{movie.name}
          
          <IconButton onClick={() => navigate("/movies/" + id)} color="primary" aria-label="Info">
            <InfoIcon />
          </IconButton>
          <IconButton onClick={() => setShow(!show)} color="primary" aria-label="Toggle discription">

            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton></h2>

        <p style={styles} className="movie-rating">⭐️ {movie.rating}</p>
        
      </div>


      {/* <button >Info</button> */}


      {show ? <p className="movie-summary">{movie.summary}</p> : ""}
      </CardContent>
      <CardActions>
      <Counter /> {deleteButton} {editButton}
      </CardActions>
    </Card>
  );
}
