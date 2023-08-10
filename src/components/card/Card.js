import { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { ContentLikedContext } from "../../contexts/ContentLikedContextProvider"; 
import { useLikeHandler } from "../../hooks/useLikeHandler";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import ratingIcon from '../../assets/ratingIcon.svg'
import { BsShareFill, BsWhatsapp } from "react-icons/bs";
import { SlSocialTwitter } from "react-icons/sl";
import { WhatsappShareButton, TwitterShareButton } from "react-share";
import "./Card.css";
 
export const Card = ({ content, contentType, index }) => { 
  const [ shareOptionsVisivility, setShareOptionsVisivility ] = useState(false)
  const { setIsLoading } = useContext(IsLoadingContext)
  const { token } = useContext(LoginContext) 
  const { contentLiked } = useContext(ContentLikedContext)
  const { likeClickHandler,
          isContentLiked,
          contentTypeUrl,
          isLiked } = useLikeHandler()

  const history = useNavigate()
  const url = useLocation()
  const img = useRef();
  const card = useRef();    
  
  const imageErrorHandler = () => {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";    
  }; 

  const linkToContentDetails = ()=>{
    setIsLoading(true)
    history(`/contentDetails/${contentTypeUrl}/${content.id}`)
  }

  const linkToContentDetailsLink = ()=>{
    setIsLoading(true)
  }

  const likeClick = ()=>{   
    likeClickHandler(contentType, contentLiked, content)
  }

  const shareButtonClickHandler = ()=>{
    setShareOptionsVisivility(!shareOptionsVisivility)
  }

  const onBlurCardHandler = ()=>{
    console.log("desenfoco")
    setShareOptionsVisivility(false)
  }

  useEffect(()=>{ 
    isContentLiked(contentLiked, contentType, content)
  })

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
          onClick={linkToContentDetails}             
        />       

        <div className="cardDetails" onBlur={onBlurCardHandler}>
          <div className="cardBodyRatingContainer">
            <img className="cardBodyRatingIcon" src={ratingIcon} />               
            <span className={content.vote_average > 0 ? "cardBodyRatingNumber" : "cardBodyRatingText"}>
              {content.vote_average > 0 ? content.vote_average.toFixed(1) : "No rating"}
            </span>
          </div> 

          <div className="shareCardContainer" onClick={shareButtonClickHandler}>          
              <BsShareFill className="shareCardIcon"/>
          </div> 
          {
            shareOptionsVisivility &&
              <>
                <WhatsappShareButton className="WhatsappShareButton">
                  <BsWhatsapp className="whastappShareIcon" />
                </WhatsappShareButton>

                <TwitterShareButton className="TwitterShareButton">
                  <SlSocialTwitter className="twitterShareIcon" />
                </TwitterShareButton>
              </>
          }
          

          {
            token && 
              <>
                {
                  isLiked ? <FcLike className="cardBodyLike" onClick={likeClick}/> : <FcLikePlaceholder className="cardBodyLike" onClick={likeClick}/>
                }
              </>
          }                

          <div className="cardBodyTitle" onClick={linkToContentDetails}>
            <h5>{contentTypeUrl === "movie" ? content.original_title : content.name}</h5>
          </div>          
        </div>    
        
        <Link
            className="detailsButton"
            onClick={linkToContentDetailsLink}  
            to={`/contentDetails/${contentTypeUrl}/${content.id}`}>
              See Details
          </Link>

      </div>

    </div>
  ) 
};
