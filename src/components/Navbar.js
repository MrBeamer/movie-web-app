import React from "react";
import logo from "../logo.svg";
import Input from "./Input.js";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function Navbar(props) {
  const { setSearchQuery, searchQuery, setMovies, setLoading } = props;

  async function handleSearchSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );

      if (!response.ok) throw Error(`Movie not found ${response.status}`);

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  }

  return (
    <nav className="navbar">
      <img src={logo} alt="logo"></img>
      <form className="nav-form" onSubmit={handleSearchSubmit}>
        <Input
          type="text"
          placeholder="Search..."
          className="nav-search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        ></Input>
      </form>
    </nav>
  );
}
