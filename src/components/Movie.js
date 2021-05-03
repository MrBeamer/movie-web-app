import React from "react";
import clsx from "clsx";

export default function Movies(props) {
  const { movie } = props;
  const movieScorePercentage = movie?.vote_average * 10;

  const classNames = clsx({
    green: movieScorePercentage >= 70,
    yellow: movieScorePercentage < 70,
    red: movieScorePercentage < 40,
  });

  function handleImageError(event) {
    event.target.src =
      "https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png";
  }

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        onError={handleImageError}
      ></img>
      <div className="movie-infos">
        <p>{movie.title}</p>
        <p className={classNames}>
          {movieScorePercentage === 0 ? "NR" : `${movieScorePercentage}%`}
        </p>
      </div>
    </div>
  );
}
