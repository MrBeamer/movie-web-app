import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function DiscoverMovies(props) {
  const { setMovies } = props;
  const [genres, setGenres] = useState([]);
  const params = useParams();
  const paramsId = params.id;
  console.log(paramsId);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${paramsId}`
        );
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setMovies, paramsId]);

  //   async function handleGetMovieList(event) {
  //     const genreId = Number(event.target.id);
  //     try {
  //       const response = await fetch(
  //         `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
  //       );
  //       const data = await response.json();
  //       setMovies(data.results);
  //       console.log(data.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        const data = await response.json();
        setGenres(data.genres);
        console.log(data.genres);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setGenres]);

  return (
    <>
      <ul className="genre-list">
        {genres.map((genre) => (
          <li className="genre-list__item" key={genre.id}>
            <NavLink
              exact
              id={genre.id}
              //   onClick={handleGetMovieList}
              activeClassName="active"
              to={`/genre/${genre.id}-${genre.name}`}
            >
              {genre.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
