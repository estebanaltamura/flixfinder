import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useLogin = () => {  
  const MySwal = withReactContent(Swal);  
  const { setIsLogged } = useContext(LoginContext);

  const getToken = async (userName, password) => {
    const projectCollection = 'movie-and-tv-series-browser-users'
    const req = { projectCollection, userName, password }    
    
    try{
      const res = await axios.post("https://encrypted-chat-backend.online:3100/login", req, {timeout: 5000})
      const response = res.data
      localStorage.setItem("token", response.token);      
      setIsLogged(true);      
      return true
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
