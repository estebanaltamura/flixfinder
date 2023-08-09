import { useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { ContentLikedContext } from "../../contexts/ContentLikedContextProvider"; 
import { useLikeHandler } from "../../hooks/useLikeHandler";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import ratingIcon from '../../assets/ratingIcon.svg'
import "./Card.css";

export const Card = ({ content, contentType, index }) => {  
  const { setIsLoading } = useContext(IsLoadingContext)
  const { token } = useContext(LoginContext)
  const { contentLiked } = useContext(ContentLikedContext)
  const { likeClickHandler,
          isContentLiked,
          contentTypeUrl,
          isLiked } = useLikeHandler()

  const img = useRef();
  const card = useRef();    
  
  const imageErrorHandler = () => {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";    
  }; 

  const linkToContentDetailsClickHandler = ()=>{
    setIsLoading(true)
  }

  const likeClick = ()=>{   
    likeClickHandler(contentType, contentLiked, content)
  }

  useEffect(()=>{ 
    isContentLiked(contentLiked, contentType, content)
  },[])

  return (
    <div
    className="col col-xs-12 col-md-6 col-xl-4 col-xxl-3 itemBody"
    ref={card}>
      <div className="card" style={{ width: "18rem" }}>
        <img
          ref={img}
          src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
          className="card-img-top cardImg"
          id={index}
          alt="..."
          onError={imageErrorHandler}              
        />
        
        <div className="cardBodyContainer">         
            
          <div className="cardBodyRatingContainer">
            <img className="cardBodyRatingIcon" src={ratingIcon} />               
            <span className={content.vote_average > 0 ? "cardBodyRatingNumber" : "cardBodyRatingText"}>
              {content.vote_average > 0 ? content.vote_average.toFixed(1) : "No rating"}
            </span>
          </div>           
          {
            token && 
            <>
              {
                isLiked ? <FcLike className="cardBodyLike" onClick={likeClick}/> : <FcLikePlaceholder className="cardBodyLike" onClick={likeClick}/>
              }
            </>
          }                

          <h5 className="cardBodyTitle">
            {contentTypeUrl === "movie" ? content.original_title: content.name}
          </h5>              
        </div>
           
        <Link
          className="detailsButton"
          onClick={linkToContentDetailsClickHandler}              
          to={`/contentDetails/${contentTypeUrl}/${content.id}`}>
            See Details
        </Link>
      </div>
    </div>
  ) 
};
