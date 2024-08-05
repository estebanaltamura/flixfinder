import { useEffect, useContext } from 'react';

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
      <LoginAndRegisterForm />
    </div>
  );
};
