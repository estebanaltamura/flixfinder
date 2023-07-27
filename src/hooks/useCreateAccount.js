import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { LoginContext } from "../contexts/LoginContextProvider";


export const useCreateAccount = () => {
  
  const MySwal = withReactContent(Swal);
  const history = useNavigate();
  

  const createAccount = async (userName, password) => {
    const projectCollection = 'movie-and-tv-series-browser-users'
    const req = { projectCollection, userName, password }
    
    try{
      const res = await axios.post("https://encrypted-chat-backend.online:3100/registerUser", req)      
      MySwal.fire({
        title: 'USER CREATED',
        text: 'Please login with your user',
        icon: 'success',
        heightAuto: false
      });          
      history("/login");       
    }

    catch (error){
      MySwal.fire({
        title: 'ERROR',
        text: error.response.data.message,
        icon: 'success',
        heightAuto: false
      });
      console.log(error.response.data.message)
    }
  
  };

  return { createAccount };
};