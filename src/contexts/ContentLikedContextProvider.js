import { createContext, useState, useEffect, useContext } from "react"
import { LoginContext } from "./LoginContextProvider"
import { useSetContentLiked } from "../services/internal/useSetContentLiked"


export const ContentLikedContext = createContext()

export const ContentLikedContextProvider = ({children})=>{
  const { setContentLikedServer } = useSetContentLiked()  
  const [ contentLiked, setContentLiked ] = useState(null)  
  const { token } = useContext(LoginContext)

  useEffect(()=>{
    contentLiked !== null && setContentLikedServer(token, contentLiked)
  },[contentLiked])

  useEffect(()=>{
    const contentLiked = localStorage.getItem("contentLiked");  
    const contentLikedParsed = JSON.parse(contentLiked)
    setContentLiked(contentLikedParsed)
  },[])
  
  return(
    <ContentLikedContext.Provider value={ { contentLiked, setContentLiked } }>
      {children}
    </ContentLikedContext.Provider>
  )
}