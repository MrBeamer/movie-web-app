import React, { useEffect, useState, useReducer } from "react";
import { NavLink, useParams, useRouteMatch } from "react-router-dom";
import Movies from "./Movies";
import GenreNavbar from "./GenreNavbar";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function UpcomingMovies(props) {
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  let [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const params = useParams();
  const paramsId = params.id;
  const route = useRouteMatch();
  const [test, setTest] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let response = "";

        response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${pageNumber}`
        );

        const data = await response.json();

        if (pageNumber > 1) {
          const newMovieList = [...movies, ...data.results];
          console.log(newMovieList);
          let filteredList = [...new Set(newMovieList.map(JSON.stringify))].map(
            JSON.parse
          );
          setMovies(filteredList);
          console.log(filteredList);
        } else {
          const newMovieList = data.results;
          setMovies(newMovieList);
          console.log(newMovieList);
        }
        // const newMovieList = [...movies, ...data.results];
        // console.log(newMovieList);
        // let filteredList = [...new Set(newMovieList.map(JSON.stringify))].map(
        //   JSON.parse );

        // setMovies(filteredList);
        // console.log(filteredList);
        console.log("PageNumber: " + pageNumber);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setMovies, pageNumber]);

  useEffect(() => {
    let isComponentMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        const data = await response.json();

        setGenres(data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      isComponentMounted = false;
    };
  }, [setGenres]);

  function handleClickRefresh() {
    setPageNumber(1);
    //   movies = [];
    //   setMovies(movies);
  }

  return (
    <>
      <GenreNavbar>
        <li className="genre-list__item">
          <NavLink exact activeClassName="active" to="/">
            Upcoming
          </NavLink>
        </li>
      </GenreNavbar>
      <Movies
        key={new Date().getTime()}
        setPageNumber={setPageNumber}
        movies={movies}
        loading={loading}
      ></Movies>
    </>
  );
}
