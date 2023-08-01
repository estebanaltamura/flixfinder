import { useState, useEffect, useRef, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import Spinner from "react-bootstrap/Spinner";
import "./ContentDetails.css";

export const ContentDetails = () => {
  const { contentId } = useParams();
  const img = useRef();
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { isLogged } = useContext(LoginContext);

  console.log(contentId)
  const imageErrorHandler = ()=> {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";
  };

  const onLoadImgHandler = ()=>{
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    const endPoint = `https://api.themoviedb.org/3/movie/${contentId}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&language=en-US`;
    fetch(endPoint)
      .then((res) => res.json())
      .then((res) => {
        setContent(res)
        console.log(res)
      })      
  }, []);

  return (
    <>
      {isLogged ? 
        <>
          <div className={isLoading === true ? "spinnerContainer" : "hidden"}>
            <Spinner animation="border" role="status" className="spinner"></Spinner>
          </div>
        
          <div className={isLoading === true ? "hidden" : "gridContainer"}>
              <div className="grid">
                <img
                  className="poster"
                  ref={img}
                  src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
                  alt="..."
                  onError={imageErrorHandler}
                  onLoad={onLoadImgHandler}
                />
                <h2 className="title">{content.original_title}</h2>
                <p className="tagLine">{content.tagline}</p>
                <h3 className="descriptionLabel">Description</h3>
                <p className="descriptionText">{content.status}</p>
                {/* <p   className="genders"            >Genders: {(Array.isArray(content) &&  content.length>0) ? content.genres.map(element=>element.name).join(", ") : content}</p> 
                            <p   className="budgetrevenue"      >Budget: {content.budget == 0 ? "N/A" : content.budget} Revenue: {content.revenue == 0 ? "N/A" : content.revenue}</p>
                            <p   className="language"           >Original language: {content.original_language && content.original_language.toUpperCase()}</p> */}
              </div>
            </div>          
        </>    
              :
              
        <Navigate to="/login" />        
      }
    </>     
  )
}
