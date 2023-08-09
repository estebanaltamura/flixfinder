import { useEffect, useState, useContext, useRef } from "react";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { useGetDataFavorites } from "../../services/internal/useGetDataFavorites";
import { ContentLikedContext } from "../../contexts/ContentLikedContextProvider";
import { Card } from '../../components/card/Card'
import { Spinner } from "../../components/spinner/Spinner";
import "./MyFavorites.css";

export const MyFavorites = () => {
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)
  const [ isLoadingRequest, setIsLoadingRequest ] = useState(true);
  const { contentLiked } = useContext(ContentLikedContext)
  const { getData, content } = useGetDataFavorites()  
  const imagesLoadedCounter = useRef(0)
  

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
  }, []);

  useEffect(()=>{
    console.log(contentLiked)
    if(contentLiked !== null){
      
      setIsLoadingRequest(true);
      setIsLoading(true)
      getData(setIsLoadingRequest)     
    } 
  },[contentLiked])

  useEffect(()=>{
    console.log(content.length)
  },[content])

  return (    
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
                return <Card content={content} key={index} index={index + 1} />;
              })}
            </div>
          </div>
      }       
    </>
  );
};