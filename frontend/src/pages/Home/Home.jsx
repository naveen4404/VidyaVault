import { useState } from "react";
import { CardContainer } from "./CardContainer";
import { Header } from "../../components/Header";
import "./Home.css";

export function Home() {
  const [materials, setMaterials] = useState([]);
  return (
    <>
      <Header setMaterials={setMaterials} />
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
