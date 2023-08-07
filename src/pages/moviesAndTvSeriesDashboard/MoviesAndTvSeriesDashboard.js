import { useEffect, useState, useContext, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { useGetDataMoviesAndTvSeriesDashboard } from "../../services/useGetDataMoviesAndTvSeriesDashboard";
import { Card } from '../../components/card/Card'
import { Spinner } from "../../components/spinner/Spinner";
import "./MoviesAndTvSeriesDashboard.css";

export const MoviesAndTvSeriesDashboard = () => {
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)
  const { isLogged } = useContext(LoginContext);
  const [ isLoadingRequest, setIsLoadingRequest ] = useState(true);
  const { getData, content } = useGetDataMoviesAndTvSeriesDashboard()  
  const imagesLoadedCounter = useRef(0)
  const contentType = useRef(null)
  const url = useLocation()  

  const imgItemLoadHandler = (event)=>{
    const lengthResults = content.length
    const quantityImgsToLoadBeforeIsLoadingFalse = lengthResults >= 6 ? 6 : lengthResults
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

    contentType.current !== null && getData(contentType.current, setIsLoadingRequest)    
  }, [url]);

  return (    
    <>
      {isLogged ? 
        <>
          <Spinner />

          {
            (!isLoadingRequest && content.length === 0) &&
              <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"}>
                <h3 className="alertText">{`No results`}</h3>
              </div>
          } 

          {
            (!isLoadingRequest && content.length > 0) &&
              <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"} onLoad={imgItemLoadHandler}>
                <div className="row rowStyles">
                  {content.map((content, index) => {
                    return <Card content={content} contentType={contentType.current} key={index} index={index + 1} />;
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
