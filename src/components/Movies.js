import React, { useEffect } from "react";
import Movie from "./Movie.js";
import Loader from "./Loader";

export default function Movies(props) {
  const { movies, loading, setMovies } = props;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          " https://api.themoviedb.org/3/movie/popular?api_key=315ea8e9e1e6bcab496e98c022ef2d79&page=1"
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setMovies]);

  return loading ? (
    <div className="loader">
      <Loader />
    </div>
  ) : (
    <>
      <div className="movies-layout">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie}></Movie>
        ))}
      </div>
    </>
  );
}
