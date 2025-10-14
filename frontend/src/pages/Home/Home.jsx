import axios from "axios";
import { useEffect, useState } from "react";
import { CardContainer } from "./CardContainer";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";
import "./Home.css";

export function Home({ materials, setMaterials, loginStatus }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("/api/materials/");
        setMaterials(response.data.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);
  return (
    <>
      <Header setMaterials={setMaterials} loginStatus={loginStatus} />
      {loading ? (
        <Loader />
      ) : (
        <main className="cards-grid">
          {materials.length === 0 ? (
            <div className="empty-state" id="empty-state">
              <p>Materials not found</p>
            </div>
          ) : (
            materials.map((material) => {
              return <CardContainer key={material._id} material={material} />;
            })
          )}
        </main>
      )}
    </>
  );
}
