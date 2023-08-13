import { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { useGetDataMoviesAndTvSeriesDashboard } from '../../services/external/useGetDataMoviesAndTvSeriesDashboard';
import { Card } from '../../components/card/Card'
import { Spinner } from "../../components/spinner/Spinner";
import "./MoviesAndTvSeriesDashboard.css";

export const MoviesAndTvSeriesDashboard = () => {
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)
  const [ isLoadingRequest, setIsLoadingRequest ] = useState(true);
  const [ cardIdShareOptionsAllowed, setCardIdShareOptionsAllowed ] = useState(false)
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
   
    if(contentType.current !== null) getData(contentType.current, setIsLoadingRequest)    

  }, [url]); 

  useEffect(()=>{
    const detectCardClicked = (event)=>{      
      const cardElement = event.target.closest('.card');    
    
      if(cardElement && (event.target.classList.value.includes('shareCardIcon') || event.target.parentNode.classList.value.includes('shareCardIcon'))) {
        setCardIdShareOptionsAllowed(cardElement.id)                  
      }
      else setCardIdShareOptionsAllowed(null)         
    }

    window.addEventListener('click', detectCardClicked)

    return ()=> window.removeEventListener('click', detectCardClicked)
  },[])

  return (    
    <>
      <Spinner />              
      
      {
      (!isLoadingRequest && content.length === 0) &&
        <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"} id='containerMoviesAndTvSeriesDashboard'>
          <h3 className="alertText">{`No results`}</h3>
        </div>
      }  
    
      {
        (!isLoadingRequest && content.length > 0) &&
          <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"} onLoad={imgItemLoadHandler} id='containerMoviesAndTvSeriesDashboard'>
            <div className="row rowStyles">
              {content.map((content, index) => {
                return <Card content={content} URLcontentType={contentType.current} key={index} index={index + 1} cardIdShareOptionsAllowed={cardIdShareOptionsAllowed}/>;
              })}
            </div>
          </div>
      }             
    </>
  );
};
