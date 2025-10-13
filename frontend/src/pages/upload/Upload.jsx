import { UploadForm } from "./UploadForm";
import { Guidelines } from "./guidelines";
import { Header } from "../../components/Header";
import "./Upload.css";
export function Upload({ loginStatus }) {
  return (
    <>
      <Header loginStatus={loginStatus} />
      <Guidelines />
      <UploadForm />
    </>
  );
}
