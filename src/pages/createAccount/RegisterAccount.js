import { LoginRegisterForm } from '../../components/loginForm/LoginRegisterForm'
import logo from '../../assets/logo.png'
import './RegisterAccount.css'


export const RegisterAccount = ()=>{
  return(
    <div className="registerAccountContainer">
      <div className="brandingContainerRegisterAccount">
        <img src={logo} />
        <h1 className="brandingTitleRegisterAccount">FlixFinder</h1>
      </div>
      <h2 className="registerAccountMessage">Please insert an user name and password to create an account</h2>
      <LoginRegisterForm />
    </div>
  )
}