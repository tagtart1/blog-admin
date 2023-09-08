import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthForm = (endpoint, setUser) => {
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

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
      const response = await fetch(endpoint, options);

      const result = await response.json();
      setUser(result.data);
      navigate("/");
    } catch (err) {
      setErrors(err.message);
    }
  };

  return {
    handleSubmit,
    errors,
  };
};

export default useAuthForm;
