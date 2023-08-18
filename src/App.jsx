import { useEffect } from "react";
import "./App.css";
import LogIn from "./LogIn";
import { useUser } from "./UserProvider";

function App() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3001/api/validate-user", {
        credentials: "include",
      });

      const result = await response.json();
      setUser(result.data);
    };
    fetchUser();
  }, [setUser]);

  return (
    <div className="App">
      {user ? <div>Wassup {user.username}</div> : <LogIn />}
    </div>
  );
}

export default App;
