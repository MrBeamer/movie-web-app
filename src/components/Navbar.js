import React, { useState } from "react";
// import { Link } from "react-router-dom";
import logo from "../logo.svg";
import Input from "./Input.js";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchSubmit(event) {
    event.preventDefault();
    console.log(searchQuery);
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
