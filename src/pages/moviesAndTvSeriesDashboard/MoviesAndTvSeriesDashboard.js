import { useEffect, useState, useContext, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import Spinner from "react-bootstrap/Spinner";
import { Item } from '../../components/item/Item'

import "./MoviesAndTvSeriesDashboard.css";

export const MoviesAndTvSeriesDashboard = () => {
  const [movieData, setMovieData] = useState([]);  
  const [ isLoadingRequest, setIsLoadingRequest ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(true)
  const { isLogged } = useContext(LoginContext);
  const imagesLoadedCounter = useRef(0)
  

  const url = useLocation()  

  const imgItemLoadHandler = (event)=>{
    const lengthResults = movieData.length
    const quantityImgsToLoadBeforeIsLoadingFalse = lengthResults >= 8 ? 8 : lengthResults
    const imgClasses = event.target.classList.value
    
    if(imgClasses.includes("cardImg")){
      if(event.target.id <= quantityImgsToLoadBeforeIsLoadingFalse){
        imagesLoadedCounter.current += 1
      }      
    }
    if(imagesLoadedCounter.current === quantityImgsToLoadBeforeIsLoadingFalse){
      imagesLoadedCounter.current = 0
      setIsLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);  
    setIsLoadingRequest(true);
    setIsLoading(true)   

    let typeContent
    const urlInParts = url.pathname.split("/")

    if(urlInParts.includes("movies")){
      typeContent = "movie"      
    } 
    if(urlInParts.includes("tvSeries")){
      typeContent = "tv"     
    }            

    fetch(`https://api.themoviedb.org/3/discover/${typeContent}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
      .then((res) => res.json())
      .then((res) => {        
        setMovieData(res.results)
        setIsLoadingRequest(false)
        res.results.length === 0 && setIsLoading(false)
      })    
  }, [url]);

  return (    
    <>
      {isLogged ? 
        <>
          <div className={isLoading === true ? "spinnerContainer" : "hidden"}>
            <Spinner animation="border" role="status" className="spinner"></Spinner>
          </div>

          {
            (!isLoadingRequest && movieData.length === 0) &&
              <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"}>
                <h3 className="alertText">{`No results`}</h3>
              </div>
          } 

          {
            (!isLoadingRequest && movieData.length > 0) &&
              <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"} onLoad={imgItemLoadHandler}>
                <div className="row rowStyles">
                  {movieData.map((content, index) => {
                    return <Item content={content} key={index} index={index + 1} />;
                  })}
                </div>
              </div>
          }
        </>    
                :
              
        <Navigate to="/login" />
        
      }
    </>
  );
};
