import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import { Navigate, Outlet } from "react-router";
import { View } from "./View";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { SignUp } from "./pages/Auth/SignUp";
import { Upload } from "./pages/upload/Upload";
import { Profile } from "./pages/Profile/Profile";

import "./App.css";

export function App() {
  const [materials, setMaterials] = useState([]);
  const [loginStatus, setLoginStatus] = useState(() => {
    const token = localStorage.getItem("authToken");
    return !!token;
  });

  const ProtectedRoute = ({ isAuth }) => {
    return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
  };
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
          path="/auth/login"
          element={
            <Login
              setMaterials={setMaterials}
              setLoginStatus={setLoginStatus}
            />
          }
        />
        <Route
          path="/auth/signup"
          element={
            <SignUp
              setMaterials={setMaterials}
              setLoginStatus={setLoginStatus}
            />
          }
        />
        <Route element={<ProtectedRoute isAuth={loginStatus} />}>
          <Route
            path="/upload"
            element={
              <Upload loginStatus={loginStatus} setMaterials={setMaterials} />
            }
          />
          <Route
            path="/me"
            element={
              <Profile
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
              />
            }
          />
        </Route>

        <Route path="/view/:materialTitle/:id" element={<View />} />
      </Routes>
    </>
  );
}
