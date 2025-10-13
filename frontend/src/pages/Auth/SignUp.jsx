import axios from "axios";
import { Header } from "../../components/Header";
import "./Login.css";
import { useState } from "react";

export function SignUp({ setMaterials, setLoginStatus }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const signUpUser = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await axios.post("/api/users/signup", formData);
    console.log(response.data);
    setLoginStatus(true);
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
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
