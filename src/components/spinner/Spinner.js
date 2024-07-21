import { useContext } from 'react';

import Lottie from 'react-lottie-player';

import spinner from '../../assets/spinnerMoviesJSON.json';
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider';
import './Spinner.css';

export const Spinner = () => {
  const { isLoading } = useContext(IsLoadingContext);

  return (
    <div className={isLoading === true ? 'spinnerContainer' : 'hidden'}>
      <Lottie
        animationData={spinner}
        style={{ width: '250px', height: '250px' }}
        play
        loop
      />
    </div>
  );
};
