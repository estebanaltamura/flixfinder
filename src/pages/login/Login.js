import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { LoginContext } from "../../contexts/LoginContextProvider"
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider"
import { LoginAndRegisterForm } from "../../components/LoginAndRegisterForm/LoginAndRegisterForm"
import logo from '../../assets/logo.png'
import './Login.css'


export const Login = ()=>{  
  const { token } = useContext(LoginContext)
  const { setIsLoading } = useContext(IsLoadingContext)
  
  useEffect(()=>{
    setIsLoading(false)
  },[]) 

  return(
    token ?
      <Navigate to="/movies" /> 
            :
      <div className="loginContainer">
        <div className="brandingContainerLogo">
          <img src={logo} />
          <h1 className="brandingTitleLogo">FlixFinder</h1>
        </div>       
        <LoginAndRegisterForm />
      </div>            
  )
}  