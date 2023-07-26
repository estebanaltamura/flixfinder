import { LoginForm } from "../../components/loginForm/LoginForm"
import logo from '../../assets/logo.png'
import './Login.css'


export const Login = ()=>{
  return(
    <div className="loginContainer">
      <div className="brandingContainer">
        <img src={logo} />
        <h1 className="brandingTitle">FlixFinder</h1>
      </div>
      <h2 className="greetingsLogin">Good to see you again</h2>
      <LoginForm />
    </div>
  )
} 