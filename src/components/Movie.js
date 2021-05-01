import React from "react";

export default function Movies() {
  return (
    <div className="movie-card">
      <img
        src="https://m.media-amazon.com/images/M/MV5BNGM3NDBhMWMtODc5Mi00ZWY2LTgyNTgtNDAzNTIzNzhmMGE1XkEyXkFqcGdeQXVyNjEwNTM2Mzc@._V1_FMjpg_UX810_.jpg"
        alt="placeholder"
      ></img>
      <div className="movie-infos">
        <p>TITLE</p>
        <p>SCORE</p>
      </div>
    </div>
  );
}
