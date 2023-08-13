import { createContext, useState, useEffect,useContext } from "react";
import { ContentLikedContext } from "./ContentLikedContextProvider";
import { useGetContentLiked } from "../services/internal/useGetContentLiked";

export const TokenContext = createContext();

export const TokenContextProvider = (props) => {
  const [ token, setToken ] = useState(null);
  const { setContentLiked } = useContext(ContentLikedContext)
  const { getContentLikedServer } = useGetContentLiked()


  const initialContextsValue = async(token)=>{     
    const getContentLikedFromServerData = await getContentLikedServer(token)    
    localStorage.setItem("contentLiked", JSON.stringify(getContentLikedFromServerData)) 
    setContentLiked(getContentLikedFromServerData)
    console.log('setea liked context cuando existe token pero no contentLiked')
    
  }

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem("token"));        
    const contentLiked = JSON.parse(localStorage.getItem("contentLiked"));

    if(token !== null && contentLiked !== null){
      setToken(token)
      setContentLiked(contentLiked)
      console.log('setea token y liked context cuando esta logueado y refresca forzadamente')
    }  

    if(token !== null && contentLiked === null){
      setToken(token)
      initialContextsValue(token)            
    } 

    if(token === null && contentLiked !== null){
      localStorage.removeItem("contentLiked"); 
      console.log('limpia el storage ya que hay una inconsistencia')
    } 

  },[])

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  ); 
};
 