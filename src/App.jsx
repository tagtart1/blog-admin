import { useEffect } from "react";
import "./App.css";

import { useUser } from "./UserProvider";
import Dashboard from "./Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";

import UpdatePost from "./UpdatePost";

function App() {
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      const response = await fetch("http://localhost:3001/api/validate-user", {
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/log-in");
        return;
      }
      const result = await response.json();
      console.log("SETTING USER");
      setUser(result.data.user);
    };
    fetchUser();
  }, [setUser, navigate, user]);

  useEffect(() => {});

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
