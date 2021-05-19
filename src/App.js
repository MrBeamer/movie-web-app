import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/App.css";
import "normalize.css";
import Navbar from "./components/Navbar.js";
import Movies from "./components/Movies.js";
import MovieDetails from "./components/MovieDetails.js";
import Watchlist from "./components/Watchlist";
import DiscoverMovies from "./components/DiscoverMovies";
import SearchResult from "./components/SearchResult";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  function handleAddMovieToWatch(addedMovie) {
    if (watchlist.length === 0) {
      console.log("first if");
      setWatchlist([...watchlist, addedMovie]);
    }

    watchlist.map((movie) => {
      if (movie.id === addedMovie.id) {
        console.log("movie is on list, second if");
        return setWatchlist(watchlist);
      } else {
        console.log("added new movie, third else");
        return setWatchlist([...watchlist, addedMovie]);
      }
    });
  }

  return (
    <BrowserRouter>
      <Navbar
        setLoading={setLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setMovies={setMovies}
      />

      <div className="container">
        <Switch>
          <Route exact path="/">
            <DiscoverMovies
              movies={movies}
              setMovies={setMovies}
              pageNumber={pageNumber}
            />
            <Movies
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              movies={movies}
              loading={loading}
            />
          </Route>

          <Route exact path="/search/:searchQuery">
            <DiscoverMovies />
            <Movies movies={movies} loading={loading} />

            {/* <SearchResult /> */}
          </Route>

          <Route exact path="/genre/:id-:name">
            <DiscoverMovies setMovies={setMovies} />
            <Movies movies={movies} loading={loading} />
          </Route>

          <Route exact path="/movie/:id">
            <MovieDetails handleAddMovieToWatch={handleAddMovieToWatch} />
          </Route>
          <Route exact path="/watchlist">
            <Watchlist watchlist={watchlist}></Watchlist>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
