import { useEffect, useState, useContext, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { Item } from "../../components/item/Item";
import Spinner from "react-bootstrap/Spinner";
import "./SearchResults.css";

export const SearchResults = () => {
  const { isLogged } = useContext(LoginContext);
  const [ RequestResults, setRequestResults ] = useState([]);
  const [ isLoadingRequest, setIsLoadingRequest ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(true)
  const { typeContent, query } = useParams();
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

    fetch(`https://api.themoviedb.org/3/search/${typeContent}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&query=${query}`)
          .then((res) => res.json())
          .then((res) => {                  
            setRequestResults(res.results)
            setIsLoadingRequest(false)
            res.results.length === 0 && setIsLoading(false)
          })
          
  }, [query]);

  return (
    <>
      {isLogged ? 
        <>
          <div className={isLoading === true ? "spinnerContainer" : "hidden"}>
            <Spinner animation="border" role="status" className="spinner"></Spinner>
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
  )  
};