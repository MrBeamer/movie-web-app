import React from "react";
import logo from "../logo.svg";
import Input from "./Input.js";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { useHistory } from "react-router-dom";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function Navbar(props) {
  const { setSearchQuery, searchQuery, setMovies, setLoading } = props;
  let history = useHistory();

  // function renderError(msg) {
  //   toast.error(msg, {
  //     position: "top-center",
  //     autoClose: 3000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // }

  async function handleSearchSubmit(event) {
    console.log(history);
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );

      if (!response.ok) throw Error(`Movie not found`);
      // (Error ${response.status})
      const data = await response.json();
      setMovies(data.results);
      history.push(`/search/${searchQuery}`);
    } catch (error) {
      // renderError(String(error))
      console.log(error);
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  }
  return (
    <>
      <nav className="navbar">
        <Link className="nav-logo" to="/">
          <img src={logo} alt="logo" />
          <p>Moviesquare</p>
        </Link>
        {/* <Link to="/watchlist">Watchlist</Link> */}
        <Link to="/test">test</Link>
        <form className="nav-form" onSubmit={handleSearchSubmit}>
          <Input
            required
            type="text"
            placeholder="Search..."
            className="nav-search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />
        </form>
      </nav>
      <ToastContainer transition={Slide} />
    </>
  );
}
