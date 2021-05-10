import React from "react";
import { Link } from "react-router-dom";

export default function SimilarMovie(props) {
  const { similarMovie } = props;

  function handleScrollToTopClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const movieTitle =
    similarMovie.title.length > 25
      ? similarMovie.title.slice(0, 25) + "..."
      : similarMovie.title;

  return (
    <div className="similar-movie-card">
      <Link onClick={handleScrollToTopClick} to={`/movie/${similarMovie.id}`}>
        <img
          src={
            similarMovie.backdrop_path === null
              ? "https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png"
              : `https://image.tmdb.org/t/p/w300/${similarMovie.backdrop_path}`
          }
          alt={similarMovie.title}
        />
      </Link>
      <div className="movie-card-content">
        <p>{movieTitle}</p>
        <p>{similarMovie.vote_average}</p>
      </div>
    </div>
  );
}
