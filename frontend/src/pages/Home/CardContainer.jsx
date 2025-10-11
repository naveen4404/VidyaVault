import { useNavigate } from "react-router";
import dayjs from "dayjs";
import "./CardContainer.css";

export function CardContainer({ material }) {
  const navigate = useNavigate();
  const viewFile = () => {
    navigate(`/view/${material.title}/${material.fileId}`);
  };
  return (
    <div className="card-container">
      <h3 className="title">
        {material.title
          .split(" ")
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ")}
      </h3>
      <p className="sub-name">
        {material.subject
          .split(" ")
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ")}
      </p>
      <p className="description">{material.description}</p>
      <p className="upload-by">
        Uploaded By:
        {" " +
          material.uploadedBy.name
            .split(" ")
            .map((word) => {
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ")}
      </p>
      <p className="upload-on">
        {dayjs(material.uploadedAt).format("MMM DD, YYYY")}
      </p>
      <button className="view-btn" onClick={viewFile}>
        View Material
      </button>
    </div>
  );
}
