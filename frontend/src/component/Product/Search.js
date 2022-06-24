import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css"

const Search = ( ) => {
    const navigate = useNavigate()
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <>
            <MetaData title="Search A Product ---- Mohit's Store" />

      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search A Product...."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="Submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
