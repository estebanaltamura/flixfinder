
import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { IsLoadingContext } from "./contexts/IsLoadingContextProvider";
import { Header } from "./components/header/Header";
import { Login } from "./pages/login/Login";
import { RegisterAccount } from "./pages/createAccount/RegisterAccount";
import { MoviesAndTvSeriesDashboard } from "./pages/moviesAndTvSeriesDashboard/MoviesAndTvSeriesDashboard";
import { SearchResults } from "./pages/searchResults/SearchResults";
import { ContentDetails } from "./pages/contentDetails/ContentDetails";
import { Footer } from "./components/footer/Footer";
import "./App.css";

function App() { 
  const { isLoading } = useContext(IsLoadingContext)
  
  return (
    <>
      <BrowserRouter>        
          <Header />          
          <Routes>
            <Route path="/login"                                      element={<Login />} />
            <Route path="/registerAccount"                            element={<RegisterAccount />} />
            <Route path="/movies"                                     element={<MoviesAndTvSeriesDashboard key="moviesDashboard"    />} />
            <Route path="/tvSeries"                                   element={<MoviesAndTvSeriesDashboard key="tvSeriesDashboard" />} />
            <Route path="/searchResults/:contentType/:query"          element={<SearchResults />} />
            <Route path="*"                                           element={<Navigate to="/login" />} />           
            <Route path="/contentDetails/:contentType/:contentId"     element={<ContentDetails />} />          
          </Routes>
          {!isLoading && <Footer />}        
      </BrowserRouter>
    </>
  );
}

export default App;
