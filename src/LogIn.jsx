import React, { useEffect } from "react";
import "./LogIn.css";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  // Log in API url
  const url = "http://localhost:3001/api/login";

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Log in form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    const options = {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();
      console.log(result);
      setUser(result.data);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="login-section">
      <div className="login-panel">
        <h1 className="form-title">Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
