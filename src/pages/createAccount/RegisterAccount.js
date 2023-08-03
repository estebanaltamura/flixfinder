import { useEffect, useContext } from 'react'
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider'
import { LoginAndRegisterForm } from '../../components/LoginAndRegisterForm/LoginAndRegisterForm'
import logo from '../../assets/logo.png'
import './RegisterAccount.css'


export const RegisterAccount = ()=>{
  const { setIsLoading } = useContext(IsLoadingContext)
  
  useEffect(()=>{
    setIsLoading(false)
  },[])

  return(
    <div className="registerAccountContainer">
      <div className="brandingContainerRegisterAccount">
        <img src={logo} />
        <h1 className="brandingTitleRegisterAccount">FlixFinder</h1>
      </div>      
      <LoginAndRegisterForm />
    </div>
  )
}