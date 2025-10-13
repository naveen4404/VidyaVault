import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import { View } from "./View";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { SignUp } from "./pages/Auth/Signup";

import "./App.css";

export function App() {
  const [materials, setMaterials] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoginStatus(true);
    }
  }, []);
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
      <Routes>
        <Route
          index
          element={
            <Home
              materials={materials}
              setMaterials={setMaterials}
              loginStatus={loginStatus}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setMaterials={setMaterials}
              setLoginStatus={setLoginStatus}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              setMaterials={setMaterials}
              setLoginStatus={setLoginStatus}
            />
          }
        />
        <Route path="/view/:materialTitle/:id" element={<View />} />
      </Routes>
    </>
  );
}
