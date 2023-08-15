import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { useGetDataSearchResults } from '../../services/external/useGetDataSearchResults'
import { Card } from "../../components/card/Card";
import { Spinner } from "../../components/spinner/Spinner";
import "./SearchResults.css";

export const SearchResults = () => { 
  const [ content, setContent ] = useState([])
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)    
  const { contentType, query } = useParams();
  const imagesLoadedCounter = useRef(0)
  const { getData } = useGetDataSearchResults()  

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

  const getDataHandler = async(contentType, query)=>{   
    console.log(contentType, query)   
    const dataResponse = await getData(contentType, query) 
    dataResponse.length === 0 && setIsLoading(false)    
    setContent(dataResponse)         
  }
 
  useEffect(() => {        
    window.scrollTo(0, 0);      
    setIsLoading(true)
    query !== null && getDataHandler(contentType, query)             
  }, [query]);
  
  return (
    <>     
      <Spinner />

      {
        (content.length === 0) &&
          <div className={isLoading === true ? "hidden" : "container containerStyles"}>
            <h3 className="alertText">{`No results for ${query}`}</h3>
          </div>
      } 

      {
        (content.length > 0) &&
          <div className={isLoading === true ? "hidden" : "container containerStyles"} onLoad={imgItemLoadHandler}>
            <div className="row rowStyles">
              {content.map((content, index) => {
                return <Card 
                  content={content} 
                  URLcontentType={contentType} 
                  key={index}
                  index={index + 1} />;
              })}
            </div>
          </div>
      }
    </>               
  )  
};
