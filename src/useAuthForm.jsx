import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthForm = (endpoint, setUser) => {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    if (!username || !password) {
      setError({ message: "Credentials invalid", id: 1 });
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
        setError({ message: err.message });
        return;
      }

      const result = await response.json();
      setUser(result.data);
      navigate("/");
    } catch (error) {
      setError({ message: "Unknown error has occurred." });
    }
  };

  return {
    handleSubmit,
    error,
  };
};

export default useAuthForm;
