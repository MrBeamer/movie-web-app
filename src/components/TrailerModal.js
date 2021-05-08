import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function TrailerModal({ id }) {
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );
        if (!response.ok) throw new Error("Problem getting trailer.");
        const data = await response.json();
        setTrailer(data.results[0]);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  console.log(trailer);
  return (
    <iframe
      title={id}
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${trailer.key}`}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
}
