import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export const useLogin = () => {  
  const MySwal = withReactContent(Swal);  

  const getToken = async (userName, password) => {
    const projectCollection = 'movie-and-tv-series-browser-users'        
    
    try{      
      const reqLogin = { projectCollection, userName, password }
      const resLogin = await axios.post("https://encrypted-chat-backend.online:3100/login", reqLogin, {timeout: 5000})
      const responseLogin = resLogin.data
      const token = responseLogin.token
      localStorage.setItem("token", JSON.stringify(token));             
      return token
    }
    
    catch (error){      
      MySwal.fire({
        title: 'ERROR',
        text: error?.response?.data?.message,
        icon: 'error',
        heightAuto: false,
        customClass: {
          "swal2-container": 'my-popup-class'         
        }        
      });
      console.log(error?.response?.data?.message)
      return false
    }
  };

  return { getToken };
};
