import axios from 'axios'

export const useGetContentLiked = ()=>{  
  const getContentLikedServer = async(token)=>{    
    const projectCollection = 'movie-and-tv-series-browser-users'
    const req = { token, projectCollection }
    
    try{
      const contentLikedData = await axios.post("https://encrypted-chat-backend.online:3100/getContentLikedData", req, {timeout: 5000})           
      return contentLikedData.data    
    }
  
    catch (error){    
      console.log(error?.response?.data?.message)
      return false
    }
  }
  
  return({
    getContentLikedServer
  })
}