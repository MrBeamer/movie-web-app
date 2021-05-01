import React, { useState } from "react";
import "./css/App.css";
import "normalize.css";
import Navbar from "./components/Navbar.js";
import Movies from "./components/Movies.js";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container">
        <Movies />
      </div>
    </div>
  );
}
