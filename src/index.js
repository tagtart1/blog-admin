import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./UserProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { PostProvider } from "./PostProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PostProvider>
          <Routes>
            <Route path="*" element={<App />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </PostProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
