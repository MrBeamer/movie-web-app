import React from "react";

export default function ActorCard(props) {
  const { actor } = props;
  console.log(actor);

  return (
    <div className="actorCard">
      <img
        src={
          actor.profile_path === null
            ? "https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png"
            : `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
        }
        alt={actor.name}
      />
      <p>{actor.name}</p>
      <p>{actor.character}</p>
    </div>
  );
}
