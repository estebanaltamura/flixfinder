import { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { TokenContext } from "../../contexts/TokenContextProvider";
import { ContentLikedContext } from "../../contexts/ContentLikedContextProvider"; 
import { useLikeHandler } from "../../hooks/useLikeHandler";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import ratingIcon from '../../assets/ratingIcon.svg'
import { BsShareFill, BsWhatsapp } from "react-icons/bs";
import { SlSocialTwitter } from "react-icons/sl";
import { WhatsappShareButton, TwitterShareButton } from 'react-share';
import "./Card.css";
  
export const Card = ({ content, URLcontentType, index }) => {   
  const [ contentType,  setContentType ] = useState(null)
  const [ shareOptionsOpen, setIsShareOptionsOpen ] = useState(false)
  const { setIsLoading } = useContext(IsLoadingContext)
  const { token } = useContext(TokenContext) 
  const { contentLiked } = useContext(ContentLikedContext)
  const { likeClickHandler,
          isContentLiked,         
          isLiked } = useLikeHandler()
  const history = useNavigate()  
  const img = useRef();
  const card = useRef();      

  const shareUrl = `www.flixfinder.online/contentDetails/${contentType}/${content.id}`
  const titleForTwitter = contentType === "movie" ? content.original_title : content.name
  const titleForTwitterHandled = typeof titleForTwitter === 'string' && encodeURIComponent(titleForTwitter)
  const twitterHref = `https://twitter.com/intent/tweet?text=Check%20this%20out!%20enjoy%20watching%20this%3A%20${titleForTwitterHandled}&url=https%3A%2F%2F${shareUrl}`
  console.log(twitterHref)
  
  
  const imageErrorHandler = () => {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";    
  }; 

  const linkToContentDetails = ()=>{
    setIsLoading(true)
    history(`/contentDetails/${contentType}/${content.id}`)
  }

  const linkToContentDetailsLink = ()=>{
    setIsLoading(true)
  }

  const likeClick = ()=>{   
    likeClickHandler(URLcontentType, contentLiked, content, token)
  }

  const getContentType = (content, URLcontentType)=>{
    if(URLcontentType === 'movie'){      
      setContentType('movie')         
    }
      
    if(URLcontentType === 'tv'){
      setContentType('tv')        
    }   
    
    if(URLcontentType === 'favorites'){      
      setContentType(content.contentType)             
    }
  } 

  const shareOptionsClickHandler = () => {
    setIsShareOptionsOpen(!shareOptionsOpen)   
  }
  
  useEffect(()=>{    
    content !== null && getContentType(content, URLcontentType)    
  },[content])    
  
  
  useEffect(()=>{ 
    isContentLiked(contentLiked, URLcontentType, content)    
  })   

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

        <div className={token ? "cardDetails" : "cardDetails cardDetailsNoLogged"}>
          <div className="cardBodyRatingContainer">
            <img className="cardBodyRatingIcon" src={ratingIcon} />               
            <span className={content.vote_average > 0 ? "cardBodyRatingNumber" : "cardBodyRatingText"}>
              {content.vote_average > 0 ? content.vote_average.toFixed(1) : "No rating"}
            </span>
          </div> 

          <div className="shareCardContainer" >          
              <BsShareFill className={shareOptionsOpen ? "shareCardIcon shareCardIconActive" : "shareCardIcon"} onClick={shareOptionsClickHandler}/>
          </div>           
             
          <div className={shareOptionsOpen ? "shareOptionsContainer shareOptionsContainerOpen" : "shareOptionsContainer"}>
              <div className="shareOptionContainer">
                <WhatsappShareButton
                  className='shareIcons' 
                  url={shareUrl} 
                  title={`Check this out! enjoy watching this:\n${contentType === "movie" ? content.original_title : content.name}\n`}>
                    <BsWhatsapp className="whastappShareIcon" />
                </WhatsappShareButton>
              </div>

              <div className="shareOptionContainer">
                <TwitterShareButton 
                  className='shareIcons' 
                  url={shareUrl} 
                  title={`Check this out! enjoy watching this:\n${contentType === "movie" ? content.original_title : content.name}\n`}>
                    <SlSocialTwitter className="twitterShareIcon" />
                </TwitterShareButton>
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
            <h5>{contentType === "movie" ? content.original_title : content.name}</h5>
          </div>          
        </div>    
        
        <Link
            className="detailsButton"
            onClick={linkToContentDetailsLink}  
            to={`/contentDetails/${contentType}/${content.id}`}>
              See Details
          </Link>

      </div>

    </div>
  ) 
};