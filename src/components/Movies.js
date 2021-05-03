import React from "react";
import Movie from "./Movie.js";

export default function Movies(props) {
  const { movies } = props;
  console.log(movies);

  return (
    <div className="movies-layout">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie}></Movie>
      ))}
    </div>
  );
}
