import { useContext } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { IsLoadingContext } from './contexts/IsLoadingContextProvider';
import { ContentDetails } from './pages/contentDetails/ContentDetails';
import { RegisterAccount } from './pages/createAccount/RegisterAccount';
import { Login } from './pages/login/Login';
import { MoviesAndTvSeriesDashboard } from './pages/moviesAndTvSeriesDashboard/MoviesAndTvSeriesDashboard';
import { MyFavorites } from './pages/myFavorites/MyFavorites';
import { SearchResults } from './pages/searchResults/SearchResults';
import './App.css';

function App() {
  const { isLoading } = useContext(IsLoadingContext);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='*' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registerAccount' element={<RegisterAccount />} />
          <Route
            path='/movies'
            element={<MoviesAndTvSeriesDashboard key='moviesDashboard' />}
          />
          <Route
            path='/tvSeries'
            element={<MoviesAndTvSeriesDashboard key='tvSeriesDashboard' />}
          />
          <Route
            path='/searchResults/:contentType/:query'
            element={<SearchResults />}
          />
          <Route
            path='/contentDetails/:contentType/:contentId'
            element={<ContentDetails />}
          />
          <Route path='/favorites' element={<MyFavorites />} />
        </Routes>
        {!isLoading && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
