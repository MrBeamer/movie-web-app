import React, { useEffect, useState } from "react";
import ActorCard from "./ActorCard.js";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function MovieCredits({ id }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        );

        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  return (
    <>
      <h1 className="headline">Cast</h1>
      <div className="cast-layout">
        {cast.map((actor) => (
          <ActorCard key={actor.cast_id} actor={actor} />
        ))}
      </div>
    </>
  );
}
