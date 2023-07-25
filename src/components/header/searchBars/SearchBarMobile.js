import { FiX } from "react-icons/fi";
import { useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./SearchBarMobile.css";

export const SearchBarMobile = () => {  
  const inputElement = useRef(null);
  const history = useNavigate();

  const getContentType = () => {
    if (window.location.toString().toLowerCase().includes("movie"))
      return "movies";
    if (window.location.toString().toLowerCase().includes("serie"))
      return "tv-Series";
  };

  const itemListType = getContentType();

  const searchSubmitHandler = (e) => {
    e.preventDefault();   
    history(
      `/${itemListType == "tv-series" ? "tvSeries" : "movies"}/results/${
        e.target.input.value
      }`
    );
    inputElement.current.value = "";
  };

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  return (
    <div className="seachBarContainer">
      <form onSubmit={searchSubmitHandler} autoComplete="off">
        <input
          name="input"
          ref={inputElement}
          placeholder={`Search ${itemListType}`}
          className="searchInput"
        ></input>
      </form>
      <FiX
        className="closeSearchIcon"        
      />
    </div>
  );
};
