import { useEffect, useRef, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider'
import { useContentDetailsHelper } from "../../hooks/useContentDetailsHelper";
import { useGetDataContentDetails } from "../../services/useGetDataContentDetails";
import { Spinner } from "../../components/spinner/Spinner";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { HiOutlineChevronLeft } from "react-icons/hi";
import ratingIcon from '../../assets/ratingIcon.svg'
import { BsShareFill } from "react-icons/bs";
import "./ContentDetails.css";

import { WhatsappShareButton } from "react-share";

export const ContentDetails = () => {

  const shareUrl = 'https://www.linkedin.com/in/andres-altamura/'
  
  const { isLoading, setIsLoading } = useContext(IsLoadingContext); 
  const { isLogged } = useContext(LoginContext);   
  const {
    setCardContent,
    setTextDescriptionOverflowBehavior,
    titleText,
    releaseYear,
    rating,
    genresText,
    imgSrc,
    description } = useContentDetailsHelper()
  const { getData, content } = useGetDataContentDetails() 
  const { contentType, contentId } = useParams();
  const img = useRef();
  const descriptionTextRef = useRef()
  const history = useNavigate()
  
  const imageErrorHandler = ()=> {   
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg" 
    setIsLoading(false)   
  };

  const onLoadImgHandler = ()=>{
    setIsLoading(false)
  }

  const backButtonOnClick = ()=>{
    history(-1)
  }

  useEffect(() => {    
    window.scrollTo(0, 0);
    getData(contentType, contentId)
  }, []);

  useEffect(()=>{
    setCardContent(content, contentType)    
  },[content])

  useEffect(()=>{    
    console.log(isLogged)
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

          <p className="descriptionText" ref={descriptionTextRef}>{description}</p> 

          {
            isLogged && <AiOutlineHeart className="likeContentDetails"/>
          }          

          <WhatsappShareButton className="shareContentDetails"
            url={shareUrl}
            title={"huifoehiowefhioewfhiowefhioewfhioewfhio"}
            separator=":: ">          
              <BsShareFill className="shareContentDetails"/>
          </WhatsappShareButton> 



          {/* <BsShareFill className="shareContentDetails"/>     */}
        </div>
        
        <Link className="backButtonContainer" onClick={backButtonOnClick}>
              <HiOutlineChevronLeft className="backButtonIcon"/>
              <span className="backButtonText">go back</span>
        </Link>
      </div>        
    </>     
  )
}