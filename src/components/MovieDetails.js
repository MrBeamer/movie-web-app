import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);

  const params = useParams();
  const id = Number(params.id);
  //   console.log(movies);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );

        if (!response.ok) throw new Error("Problem getting movie details.");
        const data = await response.json();
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  //   const backgroundImage = {
  //     backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
  //     backgroundPosition: "center",
  //     backgroundSize: "cover",
  //     backgroundRepeat: "no-repeat",
  //   };
  return (
    <>
      <div className="header">
        <div className="poster">
          <img
            src={
              movie.poster_path === null
                ? "https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png"
                : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
            }
            alt={movie.title}
          />
        </div>
        <div className="details">
          <div className="title">
            <h1>{movie.title}</h1>
            <h1>({movie.release_date?.slice(0, 4)})</h1>
          </div>
          <div className="genres">
            <p>{movie.release_date}</p>
            {/* <p>{movie?.production_countries[0].iso_3166_1}</p> */}
            {movie?.genres?.map((genre) => (
              <p key={genre.name}>{genre.name}</p>
            ))}
            <p>{movie.runtime}min</p>
          </div>
          <div>
            <p>{movie.tagline}</p>
            <h4>Plot</h4>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}
