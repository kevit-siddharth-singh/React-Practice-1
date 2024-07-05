import React from "react";

function Search({children,search}) {
  return (
    
    <div class="container">
      <p className="heading">React Practice 1</p>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => search(e.target.value)}
      />

      <div class="search"></div>
    </div>
  );
}

export default Search;
