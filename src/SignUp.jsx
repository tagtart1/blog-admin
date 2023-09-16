import React from "react";
import { useUser } from "./UserProvider";
import useAuthForm from "./useAuthForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { user, setUser } = useUser();

  const { handleSubmit, errors } = useAuthForm(
    "http://localhost:3001/api/sign-up",
    setUser
  );

  const navigate = useNavigate();

  // TODO: PULL OUT ERRORS ELGENTALY, MAKE SURE API SENDS CORRECT ERROR FORMATS ETC.

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="auth-form-section">
      <div className="auth-form-panel">
        <h1 className="form-title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
      <p>
        Have an account? <Link to="/log-in">Log in now</Link>
      </p>
    </section>
  );
};

export default SignUp;
