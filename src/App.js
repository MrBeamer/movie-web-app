import React, { useState } from "react";
import "./css/App.css";
import "normalize.css";
import Navbar from "./components/Navbar.js";
import Movies from "./components/Movies.js";
import MovieDetails from "./components/MovieDetails.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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
            <Movies movies={movies} loading={loading} setMovies={setMovies} />
          </Route>
          <Route exact path="/movie/:id">
            <MovieDetails />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
