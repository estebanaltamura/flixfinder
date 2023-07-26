import { LoginForm } from '../../components/loginForm/LoginForm'
import './CreateAccount.css'


export const CreateAccount = ()=>{
  return(
    <div className="loginContainer">
      <h1 className="loginTitle">Movies & TV Series tracker</h1>
      <LoginForm />
    </div>
  )
}