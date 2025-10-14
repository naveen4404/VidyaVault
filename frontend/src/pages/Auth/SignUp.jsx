import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { Header } from "../../components/Header";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SignUp({ setMaterials, setLoginStatus }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/users/signup", formData);
      setLoginStatus(true);
      toast.success(`Welcome ${response.data.user.name}!`, {
        icon: "😊",
      });
      setFormData({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
      navigate("/");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else if (err.request) {
        toast.error("server not responding. Try again later");
      } else {
        toast.error("Unexpected eroor occured");
      }
    }
  };

  return (
    <>
      <Header setMaterials={setMaterials} />
      <div className="auth-page">
        <form className="auth-container" onSubmit={signUpUser}>
          <h2>Sign Up</h2>
          <input
            className="input-field name-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleForm}
            placeholder="Your Name"
            required
          />
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
            />
          </div>
          <div className="input-group">
            <input
              className="input-field password-confirm-input"
              type="password"
              name="passwordConfirm"
              onChange={handleForm}
              value={formData.passwordConfirm}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
