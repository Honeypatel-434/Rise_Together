import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (input.trim() !== "") {
      navigate(`/gigs?search=${input}`);
    }
  };

  return (
    <div className="featured">
      <div className="overlay">
        <div className="container">
          <div className="textSection">
            <h1>
              Stronger Together, <br />
              <span>Brighter Forever</span>
            </h1>
            <p>Your vision, our network. Discover talent and ideas to make it happen.</p>

            <div className="searchBar">
              <input
                type="text"
                placeholder='Try "web development"'
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button onClick={handleSubmit}>Search</button>
            </div>

            <div className="tags">
              <span>Popular:</span>
              <button>Web Design</button>
              <button>App Development</button>
              <button>Marketing</button>
              <button>AI Tools</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
