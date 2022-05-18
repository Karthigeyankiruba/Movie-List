import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useEffect, useState } from "react";
import { API } from "./global";

export function MovieDetails() {

  const { id } = useParams();
  const [movie,setMovie] = useState({});
  // const [movieList, setMovieList] = useState([]);

  useEffect(()=> {
    fetch(`${API}/movies/${id}`)
    .then(data => data.json())
    .then((mv)=>setMovie(mv));
  },[id]);
 
 
  const navigate = useNavigate();
  const styles = {
    color: movie.rating > 8 ? "green" : "red",
  };
  return (
    <div>
      <iframe width="100%" height="570" src={movie.trailer} title="trailer" allowfullscreen></iframe>

      <div className="movie-detail-container">


        <div className="movie-specs">
          <h2 className="movie-name">{movie.name}</h2>

          <p style={styles} className="movie-rating">⭐️ {movie.rating}</p>
        </div>
        <p className="movie-summary">{movie.summary}</p>


        <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIosOutlinedIcon />} variant="text">Back</Button>
      </div>
    </div>
  );
}
