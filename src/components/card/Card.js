import { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { ContentLikedContext } from "../../contexts/ContentLikedContextProvider"; 
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import ratingIcon from '../../assets/ratingIcon.svg'
import "./Card.css";

export const Card = ({ content, contentType, index }) => {  
  const { setIsLoading } = useContext(IsLoadingContext)
  const { token } = useContext(LoginContext)
  const { contentLiked, setContentLiked } = useContext(ContentLikedContext)
  const [ isLiked, setIsLiked ] = useState(false)

  const img = useRef();
  const card = useRef();    
  
  const imageErrorHandler = () => {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";    
  }; 

  const onClickHandler = ()=>{
    setIsLoading(true)
  }

  const likeClickHandler = ()=>{      
    
    if(contentType === 'tv'){
      const tvSeries = [...contentLiked.contentLiked['tvSeries']]  
      const tvSeriesId = tvSeries.map((tvSerie)=>tvSerie.id)

      const isAlreadyLiked = tvSeriesId.includes(content.id)

      if(isAlreadyLiked){
        const contentAlreadyLikedIndex = tvSeriesId.findIndex((id)=> id === content.id)
        tvSeries.splice(contentAlreadyLikedIndex, 1)
        tvSeriesId.splice(contentAlreadyLikedIndex, 1)

        console.log(tvSeries, tvSeriesId)

        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies']], 'tvSeries': tvSeries}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(false)
      }
      else{
        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies']], 'tvSeries': [...contentLiked.contentLiked['tvSeries'], content]}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(true)
      }      
    } 

    if(contentType === 'movie'){      
      const movies = [...contentLiked.contentLiked['movies']] 
      const moviesId = movies.map((movie)=>movie.id) 
      const isAlreadyLiked = moviesId.includes(content.id)

      if(isAlreadyLiked){
        const contentAlreadyLikedIndex = moviesId.findIndex((id)=> id === content.id)
        movies.splice(contentAlreadyLikedIndex, 1)
        moviesId.splice(contentAlreadyLikedIndex, 1)
        
        const newContentLikedData = {contentLiked: {'movies': movies, 'tvSeries': [...contentLiked.contentLiked['tvSeries']]}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(false)
      }
      else{
        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies'], content], 'tvSeries': [...contentLiked.contentLiked['tvSeries']]}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(true)
      }      
    }       
  }

  useEffect(()=>{
    if(contentLiked !== null){
      if(contentType === 'movie'){        
        const moviesId = contentLiked.contentLiked['movies'].map(movie=> movie.id)      
        setIsLiked(moviesId.includes(content.id))
      }
  
      if(contentType === 'tv'){
        const tvSeriesId = contentLiked.contentLiked['tvSeries'].map(tvSerie=> tvSerie.id)           
        setIsLiked(tvSeriesId.includes(content.id))
      }   
    }    
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
                isLiked ? <FcLike className="cardBodyLike" onClick={likeClickHandler}/> : <FcLikePlaceholder className="cardBodyLike" onClick={likeClickHandler}/>
              }
            </>
          }                

          <h5 className="cardBodyTitle">
            {contentType === "movie" ? content.original_title: content.name}
          </h5>              
        </div>
           
        <Link
          className="detailsButton"
          onClick={onClickHandler}              
          to={`/contentDetails/${contentType}/${content.id}`}>
            See Details
        </Link>
      </div>
    </div>
  ) 
};
