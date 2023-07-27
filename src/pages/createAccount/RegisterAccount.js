import { LoginRegisterForm } from '../../components/loginForm/LoginRegisterForm'
import './RegisterAccount.css'


export const RegisterAccount = ()=>{
  return(
    <div className="loginContainer">
      <h1 className="loginTitle">Movies & TV Series tracker</h1>
      <LoginRegisterForm />
    </div>
  )
}