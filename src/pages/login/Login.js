import { useContext, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { LoginAndRegisterForm } from '../../components/LoginAndRegisterForm/LoginAndRegisterForm';
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider';
import { TokenContext } from '../../contexts/TokenContextProvider';
import './Login.css';

export const Login = () => {
  const { token } = useContext(TokenContext);
  const { setIsLoading } = useContext(IsLoadingContext);

  useEffect(() => {
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  return token ? (
    <Navigate to='/movies' />
  ) : (
    <div className='loginContainer'>
      <LoginAndRegisterForm />
    </div>
  );
};
