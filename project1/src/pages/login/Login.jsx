import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Login successful! 🎉", {
        position: "top-center",
      });
      setTimeout(() => navigate("/"), 1500); // Delay for toast visibility
    } catch (err) {
      toast.error(err.response?.data || "Login failed!", {
        position: "top-center",
      });
      setError(err.response?.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label>Username</label>
        <input
          name="username"
          type="text"
          placeholder="xyz"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        {error && <span>{error}</span>}
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
