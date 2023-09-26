import React, { useEffect } from "react";
import "./AuthForm.css";
import { useUser } from "./UserProvider";
import { useNavigate, Link } from "react-router-dom";
import useAuthForm from "./useAuthForm";
import ProgressBar from "./util/ProgressBar/ProgressBar";

const LogIn = () => {
  const { user, setUser } = useUser();

  const { handleSubmit, errors } = useAuthForm(
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
          <div className="auth-form-group username-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="auth-form-group password-group">
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" />
          </div>
          <div className="submit-group">
            <button type="submit ">Log In</button>
          </div>
        </form>
      </div>
      <p>
        No acccount? <Link to="/sign-up">Sign up now</Link>
      </p>
      {errors
        ? errors.map((msg, index) => {
            return <p key={index}>{msg}</p>;
          })
        : null}
    </section>
  );
};

export default LogIn;
