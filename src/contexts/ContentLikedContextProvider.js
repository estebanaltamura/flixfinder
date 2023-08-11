import { createContext, useState, useEffect, useContext } from "react"
import { LoginContext } from "./LoginContextProvider"
import { useSetContentLiked } from "../services/internal/useSetContentLiked"
import { useGetContentLiked } from "../services/internal/useGetContentLiked"

export const ContentLikedContext = createContext()

export const ContentLikedContextProvider = ({children})=>{
  const { setContentLikedServer } = useSetContentLiked()  
  const { getContentLikedServer } = useGetContentLiked()  
  const [ contentLiked, setContentLiked ] = useState({contentLiked: {'movies': [], 'tvSeries': [], 'allFavorites': []}})  
  const { token } = useContext(LoginContext)

  const getContentLikedFromServer = async(token)=>{
    const contentLikedServerResponse = await getContentLikedServer(token)             
    setContentLiked(contentLikedServerResponse)
  }

  useEffect(()=>{    
    if(contentLiked !== null && token !== null){
      setContentLikedServer(token, contentLiked)
    }
  },[contentLiked])

  useEffect(()=>{    
    token !== null && getContentLikedFromServer(token)    
  },[token])
  
  return(
    <ContentLikedContext.Provider value={ { contentLiked, setContentLiked } }>
      {children}
    </ContentLikedContext.Provider>
  )
}