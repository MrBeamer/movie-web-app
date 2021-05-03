import React from "react";
import Movie from "./Movie.js";
import Loader from "./Loader";

export default function Movies(props) {
  const { movies, loading } = props;
  console.log(movies);

  return (
    <>
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      <div className="movies-layout">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie}></Movie>
        ))}
      </div>
    </>
  );
}
