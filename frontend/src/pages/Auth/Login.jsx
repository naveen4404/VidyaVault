import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from "../../components/Header";
import "./Login.css";

export function Login({ setMaterials, setLoginStatus }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const logInUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginPromise = axiosInstance
      .post("/api/users/login", formData)
      .then((res) => {
        setLoginStatus(true);
        localStorage.setItem("authToken", res.data.token);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: () => {
        return "Logged in succesfully";
      },
      error: (err) => {
        if (err.response) {
          return err.response.data.message || "Login failed";
        } else if (err.request) {
          return "Server not responding. Try again later.";
        } else {
          return "Something went wrong.";
        }
      },
    });
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

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="signup-text">
            Don't have an account?
            <Link className="signup-link" to={"/auth/signup"}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
