import React from "react";
import "./LogIn.css";

const LogIn = () => {
  // Log in API url
  const url = "http://localhost:3001/api/login";

  // Log in form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section className="login-panel">
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
    </section>
  );
};

export default LogIn;
