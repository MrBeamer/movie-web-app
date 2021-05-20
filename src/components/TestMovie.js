import React, { useEffect, useState, useReducer } from "react";
import { NavLink, useParams, useRouteMatch } from "react-router-dom";
import Movies from "./Movies";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function TestMovie(props) {
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  let [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const params = useParams();
  const paramsId = params.id;
  const route = useRouteMatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let response = "";

        if (route.path === "/") {
          response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${pageNumber}`
          );
        }

        // else if (paramsId === "23") {
        //   response = await fetch(
        //     `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNumber}`
        //   );
        // }
        else {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${paramsId}&page=${pageNumber}`
          );
        }

        const data = await response.json();
        console.log(data.results);
        // console.log(movies);
        // const newMovieList = getNewMovieList(movies, data.results);

        const newMovieList = [...movies, ...data.results];
        // if (data.results.length > 0) setMovies(newMovieList);
        setMovies(newMovieList);
        console.log(newMovieList);
        console.log("PageNumber: " + pageNumber);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setMovies, paramsId, route.path, pageNumber]);

  useEffect(() => {
    let isComponentMounted = true;
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        const data = await response.json();

        // const newGenres = [{ id: 23, name: "Popular" }, ...data.genres];
        // setGenres(newGenres);
        setGenres(data.genres);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => {
      isComponentMounted = false;
    };
  }, [setGenres]);

  function handleClickRefresh() {
    setPageNumber(1);
    movies = [];
    setMovies(movies);
  }

  //   function getNewMovieList(current, data) {
  //     const movies = {};
  //     [...current, ...data].forEach((item) => {
  //       console.log(item);
  //       movies[item.id] = item;
  //     });
  //     console.log(Object.values(movies));
  //     return Object.values(movies);
  //   }

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
              onClick={handleClickRefresh}
              exact
              activeClassName="active"
              to={`/genre/${genre.id}-${genre.name}`}
            >
              {genre.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <Movies
        setPageNumber={setPageNumber}
        movies={movies}
        loading={loading}
      ></Movies>
    </>
  );
}
