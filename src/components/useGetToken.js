import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useContext } from "react";
import { loginContext } from "../context/LoginContextProvider";

export const useGetToken = (e) => {
  const MySwal = withReactContent(Swal);
  const history = useNavigate();
  const { setIsLogged } = useContext(loginContext);

  const getToken = async (userName, password) => {
    const projectCollection = 'movie-and-tv-series-browser-users'
    const req = { projectCollection, userName, password}
    
    try{
      const res = await axios.post("https://encrypted-chat-backend.online:3100/login", req)
      const response = res.data
      sessionStorage.setItem("token", response);
      console.log(response)
      //setIsLogged(true);
      //history("/movies");
      
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

  return { getToken };
};
