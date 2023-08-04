import { useEffect, useState, useContext, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { useGetDataSearchResults } from "../../services/useGetDataSearchResults";
import { Card } from "../../components/card/Card";

import "./SearchResults.css";
import { Spinner } from "../../components/spinner/Spinner";

export const SearchResults = () => {
  const { isLogged } = useContext(LoginContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)  
  const [ isLoadingRequest, setIsLoadingRequest ] = useState(true);
  const { contentType, query } = useParams();
  const imagesLoadedCounter = useRef(0)

  const { getData, content } = useGetDataSearchResults()
  

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
    setIsLoadingRequest(true);
    setIsLoading(true)
    window.scrollTo(0, 0);  
    getData(contentType, query, setIsLoadingRequest)          
  }, [query]);

  return (
    <>
      {isLogged ? 
        <>
          <Spinner />

          {
            (!isLoadingRequest && content.length === 0) &&
              <div className={isLoading === true ? "hidden" : "container containerStyles"}>
                <h3 className="alertText">{`No results for ${query}`}</h3>
              </div>
          } 

          {
            (!isLoadingRequest && content.length > 0) &&
              <div className={isLoading === true ? "hidden" : "container containerStyles"} onLoad={imgItemLoadHandler}>
                <div className="row rowStyles">
                  {content.map((content, index) => {
                    return <Card content={content} contentType={contentType} key={index} index={index + 1} />;
                  })}
                </div>
              </div>
          }
        </>    
                :
              
        <Navigate to="/login" />
        
      }
    </>
  )  
};
