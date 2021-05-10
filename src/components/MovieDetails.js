import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import MovieCredits from "./MovieCredits.js";
import Trailer from "./Trailer.js";
import TransitionsModal from "./TransitionsModal.js";
import SimilarMovie from "./SimilarMovie.js";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const params = useParams();
  const id = Number(params.id);
  const movieScorePercentage = movie?.vote_average * 10;

  const classNames = clsx({
    green: movieScorePercentage >= 70,
    yellow: movieScorePercentage < 70,
    red: movieScorePercentage < 40,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=similar`
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

  function backgroundImage() {
    if (movie.backdrop_path === null || movie.backdrop_path === undefined)
      return {
        backgroundImage: `url("https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };

    return {
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  }

  return (
    <>
      <div className="header" style={backgroundImage()}>
        <div className="poster">
          <img
            src={
              movie.poster_path === null || movie.poster_path === undefined
                ? "https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png"
                : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
            }
            alt={movie.title}
          />
        </div>

        <div className="title">
          <h1>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>
        </div>
        <ul className="genres">
          <li>{movie.release_date}</li>
          <li>&#8226;</li>
          {movie.genres?.map((genre) => (
            <li key={genre.name}>{genre.name}</li>
          ))}
          <li>&#8226;</li>
          <li>{movie.runtime}min</li>
        </ul>
        <ul className="bookmark">
          <li>{movie.vote_average === 0 ? "NR" : `${movie.vote_average}`}</li>
          <li>
            <span> User rating</span>
          </li>
          <li>
            <i className="fas fa-bookmark"></i>
          </li>
          <li>
            <i className="fas fa-star"></i>
          </li>
          <li>
            <button onClick={handleOpen}>
              <i className="fas fa-play"></i>Watch Trailer
            </button>
          </li>
        </ul>
        <div className="plot">
          <h3>{movie.tagline}</h3>
          <h3>Plot</h3>
          <p>{movie.overview}</p>
        </div>
        <ul className="header__list">
          <li>
            <span>Status</span> {movie.status}
          </li>
          <li>
            <span>Budget</span>
            {movie.budget === 0
              ? "/"
              : `$${new Intl.NumberFormat("en-IN").format(movie.budget)}`}
          </li>
          <li>
            <span>Revenue</span>{" "}
            {movie.revenue === 0
              ? "/"
              : `$${new Intl.NumberFormat("en-IN").format(movie.revenue)}`}
          </li>
        </ul>

        <div className="overlay"></div>
      </div>
      <MovieCredits id={id} />
      {movie.similar?.results?.length > 0 && (
        <h1 className="headline">Similar Movies you could like</h1>
      )}
      <div className="similar-movie-layout">
        {movie.similar?.results?.map((similarMovie) => (
          <SimilarMovie key={similarMovie.id} similarMovie={similarMovie} />
        ))}
      </div>
      <TransitionsModal open={open} handleClose={handleClose}>
        <div className="close-button" onClick={handleClose}>
          <i class="fas fa-times"></i>
        </div>
        <Trailer id={id} />
      </TransitionsModal>
    </>
  );
}
