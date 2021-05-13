import React from "react";

export default function Watchlist({ watchlist }) {
  return (
    <div>
      {watchlist.map((movie) => (
        <h1>{movie.title}</h1>
      ))}
    </div>
  );
}
