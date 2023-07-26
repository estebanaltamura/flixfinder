import { LoginForm } from "../../components/loginForm/LoginForm"
import './Home.css'


export const Home = ()=>{
  return(
    <div className="homeContainer">
      <h1 className="homeTitle">Movies & TV Series tracker</h1>
      <LoginForm />
    </div>
  )
} 