import React, { useEffect, useState } from "react";
import { NavLink, useParams, useRouteMatch } from "react-router-dom";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function DiscoverMovies(props) {
  const { setMovies, pageNumber } = props;
  const [genres, setGenres] = useState([]);
  const params = useParams();
  const paramsId = params.id;
  const route = useRouteMatch();
  console.log(pageNumber);

  // movies,

  // &page=${pageNumber}

  useEffect(() => {
    (async () => {
      try {
        let response = "";

        if (route.path === "/") {
          response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
          );
        } else if (paramsId === "23") {
          response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
          );
        } else {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${paramsId}`
          );
        }

        const data = await response.json();
        console.log(data.results);
        // console.log(movies);
        // if (data.results.length > 0) setMovies([...movies, ...data.results]);
        if (data.results.length > 0) setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setMovies, paramsId, route.path]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        const data = await response.json();
        const newGenres = [{ id: 23, name: "Popular" }, ...data.genres];
        setGenres(newGenres);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setGenres]);

  return (
    <>
      <ul className="genre-list">
        <li className="genre-list__item">
          <NavLink exact activeClassName="active" to="/">
            Upcoming
          </NavLink>
        </li>
        {genres.map((genre) => (
          <li className="genre-list__item" key={genre.id}>
            <NavLink
              exact
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
