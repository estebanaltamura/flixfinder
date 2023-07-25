import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loginContext } from "../../context/LoginContextProvider";
import Spinner from "react-bootstrap/Spinner";
import { Item } from '../../components/Item'

import "./ItemsListContainer.css";

export const ItemsListContainer = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLogged } = useContext(loginContext);
  // const { itemListType } = useParams();

  const url = useLocation()

  

  useEffect(() => {
    const typeContent = url.pathname.split("/")[1]
    //setIsLoading(true);
    window.scrollTo(0, 0);

    if (typeContent === "movies") {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
      )
        .then((res) => res.json())
        .then((res) => setMovieData(res.results))
        .then((res) => setIsLoading(false));
    }

    if (typeContent === "tvSeries") {
      fetch(
        "https://api.themoviedb.org/3/discover/tv?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0"
      )
        .then((res) => res.json())
        .then((res) => setMovieData(res.results))
        .then((res) => setIsLoading(false));
    }
  }, []);

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
          ) : (
            <div className="container containerStylesItemListContainer">
              <div className="row rowStyles">
                {movieData.map((content, index) => {
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
