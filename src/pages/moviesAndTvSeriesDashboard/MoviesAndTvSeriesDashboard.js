import { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { useGetDataMoviesAndTvSeriesDashboard } from '../../services/external/useGetDataMoviesAndTvSeriesDashboard';
import { Card } from '../../components/card/Card'
import { Spinner } from "../../components/spinner/Spinner";
import "./MoviesAndTvSeriesDashboard.css";

export const MoviesAndTvSeriesDashboard = () => {   
  const [ content, setContent ] = useState([])
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)
  const { getData } = useGetDataMoviesAndTvSeriesDashboard()  
  const imagesLoadedCounter = useRef(0)
  const contentType = useRef(null)  
  const url = useLocation()  

  const imgItemLoadHandler = (event)=>{     
    if(isLoading){      
      const lengthResults = content.length    
      const quantityImgsToLoadBeforeIsLoadingFalse = lengthResults >= 6 ? 6 : lengthResults
      const imgClasses = event.target.classList.value
      
      if(imgClasses.includes("cardImg") && event.target.id <= quantityImgsToLoadBeforeIsLoadingFalse){        
        imagesLoadedCounter.current += 1
      }            
      
      if(imagesLoadedCounter.current === quantityImgsToLoadBeforeIsLoadingFalse){
        imagesLoadedCounter.current = 0                 
        setIsLoading(false)
      }
    }    
  }

  const getDataHandler = async(contentType)=>{      
    const dataResponse = await getData(contentType)
    dataResponse.length === 0 && setIsLoading(false)    
    setContent(dataResponse)          
  }

  useEffect(()=>{
    window.scrollTo(0, 0);     
    setIsLoading(true)  
    
    const urlInParts = url.pathname.split("/")
    if(urlInParts.includes("movies")){
      contentType.current = "movie"       
    } 
    if(urlInParts.includes("tvSeries")){
      contentType.current = "tv"      
    }   

    getDataHandler(contentType.current)    
  },[])   

  

  return (    
    <div onLoad={imgItemLoadHandler} >
      <Spinner />              
      
      {
      (content.length === 0) &&
        <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"} id='containerMoviesAndTvSeriesDashboard'>
          <h3 className="alertText">{`No results`}</h3>
        </div>
      }  
    
      {
        (content.length > 0) &&
          <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"} id='containerMoviesAndTvSeriesDashboard'>
            <div className="row rowStyles">
              {content.map((content, index) => {
                return <Card 
                  content={content} 
                  URLcontentType={contentType.current} 
                  key={index} 
                  index={index + 1} />;
              })}
            </div>
          </div>
      }             
    </div>
  );
};
