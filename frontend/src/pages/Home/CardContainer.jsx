import dayjs from "dayjs";
import "./CardContainer.css";

export function CardContainer({ material }) {
  const viewFile = () => {
    window.open(
      `https://drive.google.com/file/d/${material.fileId}/view`,
      "_blank"
    );
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
      <p className="sub-name">{material.subject}</p>
      <p className="description">{material.description}</p>
      <p className="upload-by">
        {material.uploadedBy.name
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
