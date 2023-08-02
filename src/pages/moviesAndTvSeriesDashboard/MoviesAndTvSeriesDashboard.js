import { useEffect, useState, useContext, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { Item } from '../../components/item/Item'
import Lottie from 'react-lottie-player'
import spinner from '../../assets/spinnerMoviesJSON.json'

import "./MoviesAndTvSeriesDashboard.css";

export const MoviesAndTvSeriesDashboard = () => {
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)
  const { isLogged } = useContext(LoginContext);
  const [ isLoadingRequest, setIsLoadingRequest ] = useState(true);
  const [ movieData, setMovieData ] = useState([]);  
 
  const imagesLoadedCounter = useRef(0)

  const contentType = useRef()
  

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
    
    const urlInParts = url.pathname.split("/")

    if(urlInParts.includes("movies")){
      contentType.current = "movie"       
    } 
    if(urlInParts.includes("tvSeries")){
      contentType.current = "tv"      
    }            

    fetch(`https://api.themoviedb.org/3/discover/${contentType.current}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
      .then((res) => res.json())
      .then((res) => {   
        const contentWithPoster = res.results.filter((content)=>content.poster_path !== null && content)         
        setMovieData(contentWithPoster)
        setIsLoadingRequest(false)
        res.results.length === 0 && setIsLoading(false)        
      })    
  }, [url]);

  return (    
    <>
      {isLogged ? 
        <>
          <div className={isLoading === true ? "spinnerContainer" : "hidden"}>
            <Lottie 
              animationData={spinner}
              style= {{"width": "160px", "height": "160px"}}
              className={isLoading === true ? "spinnerHome" : "hidden"}
              play
              loop        
            />        
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
                    return <Item content={content} contentType={contentType.current} key={index} index={index + 1} />;
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
