import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess(true);
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <section className="formSection">
    <div className="llog">
    <div className="body1 bg">
      <div className="login-container omega">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="signin">
          <h2>Create an Account</h2>
          <p>Enter your details to create an account</p>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Account created successfully!</p>}
          <form className="forms" onSubmit={handleSignup}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="btn">
              <button type="submit">Create an Account</button>
            </div>
          </form>
          <p className="login-link register">
            Already have an account?{" "}
            <a className="link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Click here to Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
    </section>
  );
};

export default Signup;