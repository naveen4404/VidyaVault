import { Route, Routes } from "react-router";
import { View } from "./pages/Home/View";
import { Home } from "./pages/Home/Home";
import "./App.css";

export function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/view/:materialTitle/:id" element={<View />} />
    </Routes>
  );
}
