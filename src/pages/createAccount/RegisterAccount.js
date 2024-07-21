import { useEffect, useContext } from 'react';

import logo from '../../assets/logo.png';
import { LoginAndRegisterForm } from '../../components/LoginAndRegisterForm/LoginAndRegisterForm';
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider';
import './RegisterAccount.css';

export const RegisterAccount = () => {
  const { setIsLoading } = useContext(IsLoadingContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className='registerAccountContainer'>
      <div className='brandingContainerRegisterAccount'>
        <img src={logo} alt='logo' />
        <h1 className='brandingTitleRegisterAccount'>FlixFinder</h1>
      </div>
      <LoginAndRegisterForm />
    </div>
  );
};
