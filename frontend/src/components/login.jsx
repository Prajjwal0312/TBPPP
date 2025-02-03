import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "./userContext";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { user, token } = response.data;

      localStorage.setItem("token", token);

      login(user);

      setEmail("");
      setPassword("");

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="formSection">
    <div className="llog">
      <div className="body1">
        <div className="login-container">
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <div className="signin">
            <h2>Sign In to Account</h2>
            <p>Enter your Email and Password to Sign In</p>
            {error && <p className="error-message">{error}</p>}
            <form className="forms" onSubmit={handleLogin}>
              <input
                type="email"
                id="login-email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                id="login-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="btn">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
            <p className="register">
              Don{"'"}t have an account?{" "}
              <Link className="link" to="/signup">Click here to create a new account</Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Login;
