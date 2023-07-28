import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { LoginContext } from "../../contexts/LoginContextProvider"
import { LoginAndRegisterForm } from "../../components/LoginAndRegisterForm/LoginAndRegisterForm"
import logo from '../../assets/logo.png'
import './Login.css'


export const Login = ()=>{

  
  const { isLogged } = useContext(LoginContext)
  

  return(
    isLogged ?
      <Navigate to="/movies" /> 
            :
      <div className="loginContainer">
        <div className="brandingContainerLogo">
          <img src={logo} />
          <h1 className="brandingTitleLogo">FlixFinder</h1>
        </div>
        <h2 className="greetingsLogin">Good to see you again</h2>
        <LoginAndRegisterForm />
      </div>            
  )
}  