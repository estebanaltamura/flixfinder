import axios from 'axios'

import { useEffect, useRef, useContext, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TokenContext } from '../../contexts/TokenContextProvider';
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider'
import { ContentLikedContext } from '../../contexts/ContentLikedContextProvider';
import { useContentDetailsHelper } from "../../hooks/useContentDetailsHelper";
import { useGetDataContentDetails } from "../../services/external/useGetDataContentDetails";
import { useLikeHandler } from '../../hooks/useLikeHandler'; 
import { Spinner } from "../../components/spinner/Spinner";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { HiOutlineChevronLeft } from "react-icons/hi";
import ratingIcon from '../../assets/ratingIcon.svg'
import { BsShareFill, BsWhatsapp } from "react-icons/bs";
import { SlSocialTwitter } from "react-icons/sl";
import { WhatsappShareButton, TwitterShareButton } from 'react-share';
import "./ContentDetails.css";



export const ContentDetails = () => {  
  const [ shareOptionsOpen, setIsShareOptionsOpen ] = useState(false)
  const { isLoading, setIsLoading } = useContext(IsLoadingContext); 
  const { token } = useContext(TokenContext);   
  const { contentLiked } = useContext(ContentLikedContext)
  const {
    setCardContent,
    setTextDescriptionOverflowBehavior,
    titleText,
    releaseYear,
    rating,
    genresText,
    imgSrc,
    description } = useContentDetailsHelper()

  const { 
    likeClickHandler,
    isContentLiked,    
    isLiked } = useLikeHandler()    

  const { getData, content } = useGetDataContentDetails() 
  const { contentType, contentId } = useParams();
  const img = useRef();
  const descriptionTextRef = useRef()
  const history = useNavigate()
  const url = useLocation()

  const shareUrl = `www.flixfinder.online/contentDetails/${contentType}/${contentId}`
 
  
  const imageErrorHandler = ()=> {   
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg" 
    setIsLoading(false)   
  };

  const onLoadImgHandler = ()=>{
    setIsLoading(false)
  }

  const backButtonOnClick = ()=>{    
    const urlInParts = url.pathname.split('/') 
    urlInParts.includes('movie') && history('/movies')
    urlInParts.includes('tv') && history('/tvSeries')
  }

  const likeClick = ()=>{   
    likeClickHandler(contentType, contentLiked, content, token)
  }  

  const shareOptionsClickHandler = () => {
    setIsShareOptionsOpen(!shareOptionsOpen)   
  }

  useEffect(()=>{
    content !== null && setCardContent(content, contentType) 
  },[content]) 

  useEffect(() => {    
    window.scrollTo(0, 0);
    getData(contentType, contentId)      
  }, []);

  useEffect(()=>{     
    isContentLiked(contentLiked, contentType, content)  
    setTextDescriptionOverflowBehavior(description, descriptionTextRef.current)    
  })
 
  return (
    <>       
      <Spinner />        
          
      <div className={isLoading === true ? "hidden" : "contentDetailsContainer"}>
        <div className="contentDetailsGrid">
          <img
            className="poster"
            ref={img}
            src={imgSrc}
            alt={`Poster of ${titleText}`}
            onError={imageErrorHandler}
            onLoad={onLoadImgHandler}
          />
          
          <h2 className="title">{titleText}</h2>
              
          <div className="yearReleaseAndRating"> 
            <p className="yearReleaseText">{releaseYear}</p>
            <img src={ratingIcon} className="ratingIcon"/>
            <p className="ratingText">{rating}</p>
          </div>
              
          <p className="genres">{genresText}</p>   

          <h4 className='overview'>Overview</h4>

          <p className="descriptionText" ref={descriptionTextRef}>{description}</p> 

          {
            token && 
            <>
              {
                isLiked ? <FcLike className="likeContentDetails" onClick={likeClick}/> : <FcLikePlaceholder className="likeContentDetails" onClick={likeClick}/>
              }
            </>
          }

          <div className="shareCardContainerContentDetails" >          
              <BsShareFill className={shareOptionsOpen ? "shareCardIconContentDetais shareCardIconActiveContentDetais" : "shareCardIconContentDetais"} onClick={shareOptionsClickHandler}/>

              <div className={shareOptionsOpen ? "shareOptionsContainerContentDetails shareOptionsContainerOpenContentDetails" : "shareOptionsContainerContentDetails"}>
                <div className="shareOptionContainerContentDetails">
                  <WhatsappShareButton url={shareUrl} title={titleText}>
                    <BsWhatsapp className="whastappShareIconContentDetails" />
                  </WhatsappShareButton>
                </div>

                <div className="shareOptionContainerContentDetails">
                  <TwitterShareButton url={shareUrl} title={titleText}>
                    <SlSocialTwitter className="twitterShareIconContentDetails" />
                  </TwitterShareButton>
                </div>              
              </div>   
          </div>     
        </div>
        
        <div className="backButtonContainer" onClick={backButtonOnClick}>
          <HiOutlineChevronLeft className="backButtonIcon"/>
          <span className="backButtonText">go back</span>
        </div>
      </div>        
    </>     
  )
}

