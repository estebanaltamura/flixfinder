import { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { ContentLikedContext } from "../../contexts/ContentLikedContextProvider"; 
import { useLikeHandler } from "../../hooks/useLikeHandler";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import ratingIcon from '../../assets/ratingIcon.svg'
import { BsShareFill, BsWhatsapp } from "react-icons/bs";
import { SlSocialTwitter } from "react-icons/sl";
import { WhatsappShareButton, TwitterShareButton } from "react-share";
import { Helmet } from "react-helmet";
import "./Card.css";
 
export const Card = ({ content, contentType, index, cardIdToAllowShareOptions}) => { 
  const [ shareOptionsVisivility, setShareOptionsVisivility ] = useState(false)
  const { setIsLoading } = useContext(IsLoadingContext)
  const { token } = useContext(LoginContext) 
  const { contentLiked } = useContext(ContentLikedContext)
  const { likeClickHandler,
          isContentLiked,
          contentTypeUrl,
          isLiked } = useLikeHandler()

  const history = useNavigate()  
  const img = useRef();
  const card = useRef();    

  const shareUrl = `www.flixfinder.online/contentDetails/${contentTypeUrl}/${content.id}`
  
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
  
  useEffect(()=>{ 
    isContentLiked(contentLiked, contentType, content)
  })


  useEffect(()=>{    
    cardIdToAllowShareOptions !== `card${index}` && setShareOptionsVisivility(false)
  },[cardIdToAllowShareOptions])

  

  return (
    <div
    className="col col-xs-12 col-md-6 col-xl-4 col-xxl-3 itemBody"
    ref={card}>    
      <div className="card" style={{ width: "18rem" }} id={`card${index}`} >
        <img
          ref={img}
          src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
          className="card-img-top cardImg"
          id={index}
          alt="..."
          onError={imageErrorHandler} 
          onClick={linkToContentDetails}             
        />       

        <div className="cardDetails">
          <div className="cardBodyRatingContainer">
            <img className="cardBodyRatingIcon" src={ratingIcon} />               
            <span className={content.vote_average > 0 ? "cardBodyRatingNumber" : "cardBodyRatingText"}>
              {content.vote_average > 0 ? content.vote_average.toFixed(1) : "No rating"}
            </span>
          </div> 

          <div className="shareCardContainer">          
              <BsShareFill className={shareOptionsVisivility ? "shareCardIcon shareCardIconActive" : "shareCardIcon"} onClick={shareButtonClickHandler}/>
          </div>           
             
          <div className={shareOptionsVisivility ? "shareOptionsContainer shareOptionsContainerOpen" : "shareOptionsContainer"}>
              <div className="shareOptionContainer">
                <BsWhatsapp className="whastappShareIcon" />
              </div>

              <div className="shareOptionContainer">
                <SlSocialTwitter className="twitterShareIcon" />
              </div>              
          </div>            

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


/*<WhatsappShareButton className="WhatsappShareButton"
                  url={shareUrl}
                  >
                    <BsWhatsapp className="whastappShareIcon" />
                </WhatsappShareButton>    
                

                <TwitterShareButton className="TwitterShareButton">
                  
                </TwitterShareButton> */