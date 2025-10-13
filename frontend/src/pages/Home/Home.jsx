import axios from "axios";
import { useEffect } from "react";
import { CardContainer } from "./CardContainer";
import { Header } from "../../components/Header";
import "./Home.css";

export function Home({ materials, setMaterials, loginStatus }) {
  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await axios.get("/api/materials/");
      setMaterials(response.data.data);
    };
    fetchMaterials();
  }, []);
  return (
    <>
      <Header setMaterials={setMaterials} loginStatus={loginStatus} />
      <main className="cards-grid">
        {materials.length === 0
          ? "No materials found "
          : materials.map((material) => {
              return <CardContainer key={material._id} material={material} />;
            })}
      </main>
    </>
  );
}
