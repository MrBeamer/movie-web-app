import React, { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function Trailer({ id }) {
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

  return (
    <iframe
      title={id}
      width="1194"
      height="671"
      src={`https://www.youtube.com/embed/${trailer.key}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
