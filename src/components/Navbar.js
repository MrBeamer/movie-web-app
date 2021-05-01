import React from "react";
import logo from "../logo.svg";
import Input from "./Input.js";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

export default function Navbar(props) {
  console.log(props);
  const { setSearchQuery, searchQuery } = props;

  async function handleSearchSubmit(event) {
    event.preventDefault();
    console.log(searchQuery);
    try {
      const response = await fetch(
        `  https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // setSearchQuery("");
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
