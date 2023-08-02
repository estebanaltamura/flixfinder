import { useEffect, useState, useContext, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { Item } from "../../components/item/Item";
import Lottie from 'react-lottie-player'
import spinner from '../../assets/spinnerMoviesJSON.json'
import "./SearchResults.css";

export const SearchResults = () => {
  const { isLogged } = useContext(LoginContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)
  const [ RequestResults, setRequestResults ] = useState([]);
  const [ isLoadingRequest, setIsLoadingRequest ] = useState(true);
  const { contentType, query } = useParams();
  const imagesLoadedCounter = useRef(0)
  

  const imgItemLoadHandler = (event)=>{
    const lengthResults = RequestResults.length
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
    setIsLoadingRequest(true);
    setIsLoading(true)
    window.scrollTo(0, 0);    

    fetch(`https://api.themoviedb.org/3/search/${contentType}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&query=${query}`)
          .then((res) => res.json())
          .then((res) => {               
            const contentWithPoster = res.results.filter((content)=>content.poster_path !== null && content)             
            setRequestResults(contentWithPoster)
            setIsLoadingRequest(false)
            res.results.length === 0 && setIsLoading(false)
          })
          
  }, [query]);

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
            (!isLoadingRequest && RequestResults.length === 0) &&
              <div className={isLoading === true ? "hidden" : "container containerStyles"}>
                <h3 className="alertText">{`No results for ${query}`}</h3>
              </div>
          } 

          {
            (!isLoadingRequest && RequestResults.length > 0) &&
              <div className={isLoading === true ? "hidden" : "container containerStyles"} onLoad={imgItemLoadHandler}>
                <div className="row rowStyles">
                  {RequestResults.map((content, index) => {
                    return <Item content={content} contentType={contentType} key={index} index={index + 1} />;
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
