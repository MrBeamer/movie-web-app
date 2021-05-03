import React from "react";

export default function Movies(props) {
  const { movie } = props;
  console.log(movie.id);
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="placeholder"
      ></img>
      <div className="movie-infos">
        <p>{movie.title}</p>
        <p>{movie.vote_average}</p>
      </div>
    </div>
  );
}
