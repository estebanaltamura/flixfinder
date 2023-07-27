
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { RegisterAccount } from "./pages/createAccount/RegisterAccount";




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
            <Route path="*"                             element={<Navigate to="/login" />} />           
            <Route path="/login"                        element={<Login />} />
            <Route path="/registerAccount"              element={<RegisterAccount />} />
            <Route path="/movies"                       element={<ItemsListContainer />} />
            <Route path="/tvSeries"                     element={<ItemsListContainer />} />
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
