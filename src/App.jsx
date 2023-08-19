import { useEffect } from "react";
import "./App.css";
import LogIn from "./LogIn";
import { useUser } from "./UserProvider";
import Dashboard from "./Dashboard";

function App() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3001/api/validate-user", {
        credentials: "include",
      });

      if (!response.ok) {
        return;
      }
      const result = await response.json();

      setUser(result.data.user);
    };
    fetchUser();
  }, [setUser]);

  return (
    <div className="App">{user ? <Dashboard user={user} /> : <LogIn />}</div>
  );
}

export default App;
