import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./UserProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LogIn from "./LogIn";
import SignUp from "./SignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
