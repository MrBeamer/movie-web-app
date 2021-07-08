import React, { useState, useEffect } from "react";
import { NavLink, useParams, useRouteMatch } from "react-router-dom";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function GenreNavbar(props) {
  const { pageNumber, setPageNumber, children } = props;
  const params = useParams();
  const paramsId = params.id;
  const pageNumb = params.page;

  const match = useRouteMatch();
  console.log(match);
  console.log(paramsId);
  const [genres, setGenres] = useState([]);

  function handleClickRefresh() {
    setPageNumber(1);
  }

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

  return (
    <ul className="genre-list">
      {children}
      {genres.map((genre) => (
        <li className="genre-list__item" key={genre.id}>
          <NavLink
            // onClick={handleClickRefresh}
            exact
            activeClassName="active"
            // to={`/genre/${genre.id}-${genre.name}`}
            to={`/genre/${genre.id}-${genre.name}/${pageNumber}`}
          >
            {genre.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
