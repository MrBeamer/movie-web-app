import React, { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function MovieGenre(props) {
  // const { genre } = props;
  // const [movieGenre, setMovieGenre] = useState([]);
  // console.log(genre);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre.id}`
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [genre.id]);

  return null;
}
