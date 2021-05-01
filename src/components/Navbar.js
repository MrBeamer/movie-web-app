import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import Input from "./Input.js";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="logo"></img>
      <Input
        type="email"
        placeholder="Search for recipes"
        className="red"
        onClick={() => {}}
      ></Input>
    </nav>
  );
}
