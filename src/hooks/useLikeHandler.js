import { useState, useContext } from "react"
import { ContentLikedContext } from "../contexts/ContentLikedContextProvider"


export const useLikeHandler = ()=>{
  const [ isLiked, setIsLiked ] = useState(false)  
  const { setContentLiked } = useContext(ContentLikedContext)

  const likeClickHandler = (URLcontentType, contentLiked, content)=>{    
    if(URLcontentType === 'tv'){      
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
       
        const allFavoritesSorted =  allFavorites.map((favorite, index)=> ({...favorite, 'internalId': index, 'contentType': URLcontentType}))      

        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies']], 'tvSeries': tvSeries, 'allFavorites': allFavoritesSorted}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(false)        
      }
      else{
        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies']], 'tvSeries': [...contentLiked.contentLiked['tvSeries'], content], 'allFavorites': [...contentLiked.contentLiked['allFavorites'], {...content, 'internalId': contentLiked.contentLiked['allFavorites'].length, 'contentType': URLcontentType}]}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(true)
      }            
    } 

    if(URLcontentType === 'movie'){      
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
       
        const allFavoritesSorted =  allFavorites.map((favorite, index)=> ({...favorite, 'internalId': index, 'contentType': URLcontentType}))
        
        const newContentLikedData = {contentLiked: {'movies': movies, 'tvSeries': [...contentLiked.contentLiked['tvSeries']], 'allFavorites': allFavoritesSorted}}

        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(false)
      }
      else{
        const newContentLikedData = {contentLiked: {'movies': [...contentLiked.contentLiked['movies'], content], 'tvSeries': [...contentLiked.contentLiked['tvSeries']], 'allFavorites': [...contentLiked.contentLiked['allFavorites'], {...content, 'internalId': contentLiked.contentLiked['allFavorites'].length, 'contentType': URLcontentType}]}}
        localStorage.setItem("contentLiked", JSON.stringify(newContentLikedData))
        setContentLiked(newContentLikedData)
        setIsLiked(true)
      }      
    }       

    if(URLcontentType === 'favorites'){          
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
  
  const isContentLiked = (contentLiked, URLcontentType, content)=>{    
    if(URLcontentType === 'movie'){       
      if(contentLiked !== null){
        const moviesIds = contentLiked.contentLiked['movies'].map(movie=> movie.id)      
        setIsLiked(moviesIds.includes(content.id))
      }
    }
    
    if(URLcontentType === 'tv'){
      if(contentLiked !== null){
        const tvSeriesIds = contentLiked.contentLiked['tvSeries'].map(tvSerie=> tvSerie.id)           
        setIsLiked(tvSeriesIds.includes(content.id))
      }
    }   
  
    if(URLcontentType === 'favorites'){      
      if(contentLiked !== null){
        const allFavoritesIds = contentLiked.contentLiked['allFavorites'].map(favorite=> favorite.id)           
        setIsLiked(allFavoritesIds.includes(content.id))
      }
    }
  }  
    

  



  return({
    likeClickHandler,
    isContentLiked,    
    isLiked
  })
}