import "./SearchBarDesktop.css";
import { BsSearch } from "react-icons/bs";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBarDesktop = () => {
  const inputElement = useRef(null);
  const history = useNavigate();

  const getContentType = () => {
    if (window.location.toString().toLowerCase().includes("movie"))
      return "movies";
    if (window.location.toString().toLowerCase().includes("serie"))
      return "tv-series";
  };

  const itemListType = getContentType();

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    history(
      `/${itemListType == "tv-series" ? "tvSeries" : "movies"}/results/${
        e.target.input.value
      }`
    );
    inputElement.current.value = "";
  };

  const searchIconCickHandler = (e) => {
    history(
      `/${itemListType == "tv-series" ? "tvSeries" : "movies"}/results/${
        e.target.previousElementSibling.childNodes[0].value
      }`
    );
    inputElement.current.value = "";
  };

  return (
    <div className="searchBarDesktopContainer">
      <form onSubmit={searchSubmitHandler} autoComplete="off">
        <input
          ref={inputElement}
          name="input"
          placeholder={`Search ${itemListType}`}
          className="searchInputDesktop"
        ></input>
      </form>
      <BsSearch className="searchIconDesktop" onClick={searchIconCickHandler} />
    </div>
  );
};
