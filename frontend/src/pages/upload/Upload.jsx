import { UploadForm } from "./UploadForm";
import { Guidelines } from "./guidelines";
import { Header } from "../../components/Header";
import "./Upload.css";
export function Upload({ loginStatus, setMaterials }) {
  return (
    <>
      <Header loginStatus={loginStatus} setMaterials={setMaterials} />
      <Guidelines />
      <UploadForm />
    </>
  );
}
