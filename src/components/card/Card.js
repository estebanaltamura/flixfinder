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
  const [ contentTypeCard, setContentTypeCard ] = useState(null)

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
      const allFavorites = [...contentLiked.contentLiked['allFavorites']] 
      const allFavoritesId = allFavorites.map((content)=>content.id) 

      const isAlreadyLiked = tvSeriesId.includes(content.id)

      if(isAlreadyLiked){
        const tvContentAlreadyLikedIndex = tvSeriesId.findIndex((id)=> id === content.id)
        tvSeries.splice(tvContentAlreadyLikedIndex, 1)
        
        const favoriteContentAlreadyLikedIndex = allFavoritesId.findIndex((id)=> id === content.id)
        allFavorites.splice(favoriteContentAlreadyLikedIndex, 1)
       
        const allFavoritesSorted =  allFavorites.map((favorite, index)=> ({...favorite, 'internalId': index, contentType}))      

        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies']], 'tvSeries': tvSeries, 'allFavorites': allFavoritesSorted}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(false)        
      }
      else{
        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies']], 'tvSeries': [...contentLiked.contentLiked['tvSeries'], content], 'allFavorites': [...contentLiked.contentLiked['allFavorites'], {...content, 'internalId': contentLiked.contentLiked['allFavorites'].length, contentType}]}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(true)
      }            
    } 

    if(contentType === 'movie'){      
      const movies = [...contentLiked.contentLiked['movies']] 
      const moviesId = movies.map((movie)=>movie.id) 
      const allFavorites = [...contentLiked.contentLiked['allFavorites']] 
      const allFavoritesId = allFavorites.map((content)=>content.id) 

      const isAlreadyLiked = moviesId.includes(content.id)

      if(isAlreadyLiked){
        const movieAlreadyLikedIndex = moviesId.findIndex((id)=> id === content.id)
        movies.splice(movieAlreadyLikedIndex, 1)

        const favoriteContentAlreadyLikedIndex = allFavoritesId.findIndex((id)=> id === content.id)
        allFavorites.splice(favoriteContentAlreadyLikedIndex, 1)
       
        const allFavoritesSorted =  allFavorites.map((favorite, index)=> ({...favorite, 'internalId': index, contentType}))
        
        const newContentLikedData = {contentLiked: {'movies': movies, 'tvSeries': [...contentLiked.contentLiked['tvSeries']], 'allFavorites': allFavoritesSorted}}

        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(false)
      }
      else{
        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies'], content], 'tvSeries': [...contentLiked.contentLiked['tvSeries']], 'allFavorites': [...contentLiked.contentLiked['allFavorites'], {...content, 'internalId': contentLiked.contentLiked['allFavorites'].length, contentType}]}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(true)
      }      
    }       

    if(contentType === 'favorites'){      
      const movies = [...contentLiked.contentLiked['movies']] 
      const moviesId = movies.map((movie)=>movie.id) 
      const tvSeries = [...contentLiked.contentLiked['tvSeries']]  
      const tvSeriesId = tvSeries.map((tvSerie)=>tvSerie.id)
      const allFavorites = [...contentLiked.contentLiked['allFavorites']] 
      const allFavoritesId = allFavorites.map((content)=>content.id) 

      const isAlreadyLiked = allFavoritesId.includes(content.id)

      if(isAlreadyLiked){
        
        if(content.contentType === 'movie'){
          const movieAlreadyLikedIndex = moviesId.findIndex((id)=> id === content.id)
          movies.splice(movieAlreadyLikedIndex, 1)
  
          const favoriteContentAlreadyLikedIndex = allFavoritesId.findIndex((id)=> id === content.id)
          allFavorites.splice(favoriteContentAlreadyLikedIndex, 1)
         
          const allFavoritesSorted =  allFavorites.map((favorite, index)=> ({...favorite, 'internalId': index}))
          
          const newContentLikedData = {contentLiked: {'movies': movies, 'tvSeries': [...contentLiked.contentLiked['tvSeries']], 'allFavorites': allFavoritesSorted}}
        
          localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
          setContentLiked(newContentLikedData)
          setIsLiked(false)
        }

        if(content.contentType === 'tv'){
          const tvContentAlreadyLikedIndex = tvSeriesId.findIndex((id)=> id === content.id)
          tvSeries.splice(tvContentAlreadyLikedIndex, 1)
  
          const favoriteContentAlreadyLikedIndex = allFavoritesId.findIndex((id)=> id === content.id)
          allFavorites.splice(favoriteContentAlreadyLikedIndex, 1)
         
          const allFavoritesSorted =  allFavorites.map((favorite, index)=> ({...favorite, 'internalId': index}))
          
          const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies']], 'tvSeries': tvSeries, 'allFavorites': allFavoritesSorted}}
        
          localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
          setContentLiked(newContentLikedData)
          setIsLiked(false)
        }        
      }        
    }
  }



  useEffect(()=>{   
    if(contentLiked !== null){
      if(contentType === 'movie'){      
        setContentTypeCard('movie')  
        const moviesIds = contentLiked.contentLiked['movies'].map(movie=> movie.id)      
        setIsLiked(moviesIds.includes(content.id))
      }
  
      if(contentType === 'tv'){
        setContentTypeCard('tv')
        const tvSeriesIds = contentLiked.contentLiked['tvSeries'].map(tvSerie=> tvSerie.id)           
        setIsLiked(tvSeriesIds.includes(content.id))
      }   

      if(contentType === 'favorites'){
        setContentTypeCard(content.contentType)
        const allFavoritesIds = contentLiked.contentLiked['allFavorites'].map(favorite=> favorite.id)           
        setIsLiked(allFavoritesIds.includes(content.id))
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
            {contentTypeCard === "movie" ? content.original_title: content.name}
          </h5>              
        </div>
           
        <Link
          className="detailsButton"
          onClick={onClickHandler}              
          to={`/contentDetails/${contentTypeCard}/${content.id}`}>
            See Details
        </Link>
      </div>
    </div>
  ) 
};
