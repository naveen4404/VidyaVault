import { CardContainer } from "./CardContainer";
import { Header } from "../../components/Header";
import "./Home.css";

export function Home() {
  return (
    <>
      <Header />
      <main className="cards-grid">
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </main>
    </>
  );
}
