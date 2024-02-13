import React from "react";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import VerifyEmail from "./Components/Verify Email/VerifyEmail";
import FotgotPassword from "./Components/ForgotPassword/FotgotPassword";
import Main from "./Components/Main Page/Main";

import PrivateRoute from "./PrivateRoute";
import TestImage from "./Components/Test Image/TestImage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<FotgotPassword />} />
        <Route path="/home" element={<Home />} />

        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
};

export default App;
