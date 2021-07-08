import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import Movies from "./Movies";
import GenreNavbar from "./GenreNavbar";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function TestMovie(props) {
  const [loading, setLoading] = useState(false);
  let [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const params = useParams();
  const paramsId = params.id;
  const route = useRouteMatch();

  useEffect(() => {
    (async () => {
      //check the if it could break the render because of root
      setLoading(true);
      try {
        // let response = "";

        // if (route.path === "/") {
        //   response = await fetch(
        //     `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${pageNumber}`
        //   );
        // } else {
        //   response = await fetch(
        //     `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${paramsId}&page=${pageNumber}`
        //   );
        // }

        let response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${paramsId}&page=${pageNumber}`
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
        } else if (route.path === "/") {
          const newMovieList = data.results;
          setMovies(newMovieList);
          console.log(newMovieList);
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
  }, [setMovies, paramsId, route.path, pageNumber]);

  return (
    <>
      <GenreNavbar pageNumber={pageNumber} setPageNumber={setPageNumber} />
      <Movies
        // key={new Date().getTime()}
        setPageNumber={setPageNumber}
        movies={movies}
        loading={loading}
      ></Movies>
    </>
  );
}