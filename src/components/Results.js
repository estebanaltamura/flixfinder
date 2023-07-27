import "./Results.css";
import { useEffect, useState, useContext } from "react";
import { Item } from "./Item";
import { Navigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import Spinner from "react-bootstrap/Spinner";

export const Results = () => {
  const [RequestResults, setRequestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLogged } = useContext(LoginContext);
  const { query } = useParams();

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    const getContentType = () => {
      if (window.location.toString().toLowerCase().includes("movie"))
        return "movies";
      if (window.location.toString().toLowerCase().includes("serie"))
        return "tv-series";
    };

    const itemListType = getContentType();

    console.log(typeof itemListType, typeof query);

    itemListType == "movies"
      ? fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&query=${query}`
        )
          .then((res) => res.json())
          .then((res) => setRequestResults(res.results))
          .then((res) => setIsLoading(false))
      : fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&query=${query}`
        )
          .then((res) => res.json())
          .then((res) => setRequestResults(res.results))
          .then((res) => setIsLoading(false));
  }, [query]);

  return (
    <>
      {isLogged ? (
        <>
          {isLoading ? (
            <div className="spinnerContainer">
              <Spinner animation="border" role="status" className="spinner">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : RequestResults.length == 0 && !isLoading ? (
            <div className="container containerStyles">
              <h3 className="alertText">{`No results for ${query}`}</h3>
            </div>
          ) : (
            <div className="container containerStyles">
              <div className="row rowStyles">
                {RequestResults.map((content, index) => {
                  return <Item content={content} key={index} index={index} />;
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
