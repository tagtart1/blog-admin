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

    if (!username || !password) {
      setErrors([{ message: "Credentials invalid", id: 1 }]);
    }

    const options = {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };

    try {
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        const err = await response.json();
        setErrors([{ message: err.message, id: 1 }]);
        return;
      }

      const result = await response.json();
      setUser(result.data);
      navigate("/");
    } catch (error) {
      setErrors([{ message: "Unknown error has occurred.", id: 1 }]);
    }
  };

  return {
    handleSubmit,
    errors,
  };
};

export default useAuthForm;
