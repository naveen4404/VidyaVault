import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from "../../components/Header";
import "./Login.css";

export function Login({ setMaterials, setLoginStatus }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const logInUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/login", formData);
      localStorage.setItem("authToken", response.data.token);
      setLoginStatus(true);
      toast.success("Logged in succesfully!");
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else if (err.request) {
        toast.error("Server not responding. Try again later.");
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };
  return (
    <>
      <Header setMaterials={setMaterials} />
      <div className="auth-page">
        <form className="auth-container" onSubmit={logInUser}>
          <h2>Login</h2>

          <input
            className="input-field email-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleForm}
            placeholder="Email Address"
            required
          />

          <div className="input-group">
            <input
              className="input-field password-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleForm}
              placeholder="Password (min. 8 characters)"
              required
              autoComplete="off"
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
          <p className="signup-text">
            Don't have an account?
            <Link className="signup-link" to={"/signup"}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
