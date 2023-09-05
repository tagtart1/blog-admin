import { useEffect } from "react";
import "./App.css";

import { useUser } from "./UserProvider";
import Dashboard from "./Dashboard";
import { Routes, Route, redirect, useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";
import LogIn from "./LogIn";
import UpdatePost from "./UpdatePost";

function App() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3001/api/validate-user", {
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/log-in");
        return;
      }
      const result = await response.json();

      setUser(result.data.user);
    };
    fetchUser();
    console.log("hey");
  }, [setUser, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<UpdatePost />} />
      </Routes>
    </div>
  );
}

export default App;
