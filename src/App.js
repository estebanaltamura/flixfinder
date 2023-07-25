
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { ItemsListContainer } from "./pages/moviesAndTvSeriesList/ItemsListContainer";
import { ItemDetails } from "./components/ItemDetails";

import { Results } from "./components/Results";
import "./App.css";

function App() {  

  return (
    <>
      <BrowserRouter>        
          <Header />          
          <Routes>
            <Route path="*"                           element={<Navigate to="/login" />} />           
            <Route path="/login"                      element={<Home />} />
            <Route path="/movies"                     element={<ItemsListContainer />} />
            <Route path="/tvSeries"                   element={<ItemsListContainer />} />
            {/* <Route path="/movies/:contentId"        element={<ItemDetails />} />
            <Route path="/tvSeries/:contentId"      element={<ItemDetails />} /> */}
            {/* <Route path="/movies/results/:query"    element={<Results />} />
            <Route path="/tvSeries/results/:query"  element={<Results />} /> */}
          </Routes>
          <Footer />        
      </BrowserRouter>
    </>
  );
}

export default App;
