import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import MovieSearch from "./MovieSearch";

export default function Navbar(props) {
  const { setSearchQuery, searchQuery, setMovies, setLoading } = props;

  return (
    <>
      <nav className="navbar">
        <Link className="nav-logo" to="/">
          <img src={logo} alt="logo" />
          <p>Moviesquare</p>
        </Link>
        <Link to="/watchlist">Watchlist</Link>
        <MovieSearch
          setLoading={setLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setMovies={setMovies}
        />
      </nav>
      <ToastContainer transition={Slide} />
    </>
  );
}
