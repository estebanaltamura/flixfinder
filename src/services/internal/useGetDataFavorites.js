import { useContext, useState, useRef, useEffect } from 'react'
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider';
import { ContentLikedContext } from '../../contexts/ContentLikedContextProvider';
import axios from 'axios'

export const useGetDataFavorites = ()=>{
  const content = useRef([])  
  const { setIsLoading } = useContext(IsLoadingContext)
  const { contentLiked } = useContext(ContentLikedContext)
  

  const getData = async (contentType, setIsLoadingRequest)=>{    
    const movieIds = contentLiked.contentLiked.movies
    const tvSeriesIds = contentLiked.contentLiked.tvSeries

    

    const getMovie = async(id)=>{            
      try{      
        const endPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4`
        const res = await axios(endPoint)                  
        const data = res.data         
        console.log("dataApi", data) 
        return data
      }
      catch (error){       
        setIsLoading(false)
        console.log(error?.response?.data?.message)
        return false
      }    
    }

    const get = async()=>{ 
      console.log("length de entrada", movieIds.length)     
      if(movieIds.length > 0){
        const newMovie = await getMovie(movieIds[movieIds.length - 1])
        console.log("id usada", movieIds[movieIds.length - 1])       
        movieIds.splice(-1)
       
        
        if(content.current.length > 0){
          console.log("entro + 1")
          content.current = [...content.current, newMovie]
        }        

        if(content.current.length === 0){
          console.log("entro 1")
          content.current = [newMovie]
        } 
        
        
      } 
      
      movieIds.length > 0 && get()  
      
    }
       

    get()
      
      
    
   
    
  }    

  useEffect(()=>{
    //console.log("content", content)
  },[content])
  
  
   // setContent(...content, data)      
        // setIsLoadingRequest(false)
        // data.results.length === 0 && setIsLoading(false) 
       
  return({
    getData,
    content: content.current
  })
}