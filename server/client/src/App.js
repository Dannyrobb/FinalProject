import { useState, createContext } from "react";
import LoginRegisterForm from "./components/LoginRegisterForm";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/Nav";
import Home from "./components/Home";
import Category from "./components/Category";
import { Auth } from "./auth/Auth";
import Users from "./components/Users";
import Categories from "./components/Categories";
import BusinessPage from "./components/BusinessPage";
import Locations from "./components/Locations";
import SearchPage from "./components/SearchPage";
import UserPagePersonal from "./components/UserPagePersonal";
import Footer from "./components/Footer";
// import "@fontsource/roboto/500.css";

import "bootstrap/dist/css/bootstrap.min.css";
export const AppContext = createContext(null);
export const SearchContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [searchQueryGlobal, setSearchQueryGlobal] = useState("");
  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
        searchQueryGlobal,
        setSearchQueryGlobal,
      }}
    >
      <div className="App" style={{ backgroundColor: "#2b6777" }}>
        <NavigationBar />
        <div style={{ paddingTop: "40px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegisterForm title="Login" />} />
            <Route path="/register" element={<LoginRegisterForm title="Register" />} />
            <Route path="/registerBusiness" element={<LoginRegisterForm title="Register Business" />} />
            <Route path="/businessLogin" element={<LoginRegisterForm title="Business Login" />} />
            <Route
              path="/users"
              element={
                <Auth>
                  <Users />
                </Auth>
              }
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/business/:id" element={<BusinessPage />} />
            <Route path="/locations/:id" element={<Locations />} />
            <Route path="/search/:search" element={<SearchPage />} />
            <Route path="/search/:search/:locationId" element={<SearchPage />} />
            <Route path="/userpage/:id" element={<UserPagePersonal />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
