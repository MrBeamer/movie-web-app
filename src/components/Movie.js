import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function Movies(props) {
  const { movie } = props;
  const movieScorePercentage = movie?.vote_average * 10;

  const classNames = clsx({
    green: movieScorePercentage >= 70,
    yellow: movieScorePercentage < 70,
    red: movieScorePercentage < 40,
  });

  const movieTitle =
    movie.title.length > 30 ? movie.title.slice(0, 30) + "..." : movie.title;

  return (
    <div className="movie-card">
      <div className="score">
        <p className={classNames}>
          {movie?.vote_average === 0 ? "NR" : `${movie?.vote_average}`}
        </p>
        <Link to={`/movie/${movie.id}`}>
          <img
            className={classNames}
            src={
              movie.poster_path === null
                ? "https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png"
                : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            }
            alt={movie.title}
          />
        </Link>
      </div>
      <div className="movie-infos">
        <p>{movieTitle}</p>
      </div>
    </div>
  );
}
