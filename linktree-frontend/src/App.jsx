import { useEffect, useState } from "react";
import Landing from "./components/landing/Landing";
import LoginPage from "./components/login-signup/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import HomepageContent from "./components/homepage/HomepageContent";
import FeaturesPage from "./components/homepage/FeaturesPage";
import AboutPage from "./components/homepage/AboutPage";
import FAQPage from "./components/homepage/FAQPage";
import RegisterPage from "./components/login-signup/RegisterPage";
import UserRegistrationPage from "./components/login-signup/UserRegistrationPage";
import LinksPage from "./components/landing/LinksPage";
import { getUser } from "./utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/user/slice";
import UserTreePage from "./components/treepage/UserTreePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Adjust default value
  const token = getUser();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.fetchUserData.data);
  const status = useSelector((state) => state.users.fetchUserData.status);
  const error_data = useSelector((state) => state.users.fetchUserData.error);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (status === "idle" && userData) {
      setIsLoggedIn(true);
      console.log("=====?")
    } else {
      setIsLoggedIn(false);
    }
  }, [status, userData]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          {!isLoggedIn ? (
            <Route index element={<HomepageContent />}></Route>
          ) : (
            <Route index element={<LinksPage />}></Route>
          )}
          <Route path="/features" element={<FeaturesPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/faq" element={<FAQPage />}></Route>
          <Route path="/all-links" element={<LinksPage />}></Route>
        </Route>
        <Route path="/register" element={<UserRegistrationPage />}>
          <Route index element={<RegisterPage />}></Route>
          <Route path="/register/signup" element={<RegisterPage />}></Route>
          <Route path="/register/login" element={<LoginPage />}></Route>
        </Route>
        <Route path="/socials/:username" element={<UserTreePage />}></Route>

        <Route path="/landing" element={<Landing />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
