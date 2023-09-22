import React, { useEffect } from "react";
import "./AuthForm.css";
import { useUser } from "./UserProvider";
import { useNavigate, Link } from "react-router-dom";
import useAuthForm from "./useAuthForm";

const LogIn = () => {
  const { user, setUser } = useUser();

  const { handleSubmit, error } = useAuthForm(
    "http://localhost:3001/api/login",
    setUser
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="auth-form-section">
      <div className="auth-form-panel">
        <h1 className="form-title">Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
      <p>
        No acccount? <Link to="/sign-up">Sign up now</Link>
      </p>
      {error ? <div className="error-message">{error.message}</div> : null}
    </section>
  );
};

export default LogIn;
