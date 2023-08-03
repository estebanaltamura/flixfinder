import "./Item.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import ratingIcon from '../../assets/ratingIcon.svg'



export const Item = ({ content, contentType, index }) => {  
  const img = useRef();
  const card = useRef();  
  
  
  const imageErrorHandler = () => {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";
    
  }; 

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
            <span className="cardBodyRatingText">{content.vote_average.toFixed(1)}</span>
          </div>

          

          <FcLikePlaceholder className="cardBodyLike" />

          

          <h5 className="cardBodyTitle">
            {contentType === "movie" ? content.original_title: content.name}
          </h5>              
        </div>
           
        <Link
        className="detailsButton"              
        to={`/contentDetails/${contentType}/${content.id}`}>
          See Details
        </Link>

      </div>
    </div>
  ) 
    

};
