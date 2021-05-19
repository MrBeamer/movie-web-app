import React, { useState } from "react";
import Movie from "./Movie.js";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Movies(props) {
  const { movies, loading, setPageNumber, pageNumber } = props;

  function updatePageNumber() {
    setPageNumber((pageNumber) => pageNumber + 1);
  }
  console.log(pageNumber);

  // return loading ? (
  //   <div className="loader">
  //     <Loader />
  //   </div>
  // ) :
  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={updatePageNumber}
        hasMore={true}
        loader={
          loading && (
            <div className="loader">
              <Loader />
            </div>
          )
        }
      >
        <div className="movies-layout">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie}></Movie>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
