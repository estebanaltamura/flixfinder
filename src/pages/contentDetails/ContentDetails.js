import { useState, useEffect, useRef, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider'
import Lottie from 'react-lottie-player'
import spinner from '../../assets/spinnerMoviesJSON.json'
import "./ContentDetails.css";

export const ContentDetails = () => {
  const { contentType, contentId } = useParams();
  const img = useRef();
  const [content, setContent] = useState({});
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const { isLogged } = useContext(LoginContext);

  const imageErrorHandler = ()=> {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";
  };

  const onLoadImgHandler = ()=>{
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    const endPoint = `https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&language=en-US`;
    fetch(endPoint)
      .then((res) => res.json())
      .then((res) => {
        setContent(res)        
      })      
  }, []);

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
              </div>
            </div>          
        </>    
              :
              
        <Navigate to="/login" />        
      }
    </>     
  )
}
