import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { formatName } from "../../utils/formatName";
import "./CardContainer.css";
export function CardContainer({ material }) {
  const navigate = useNavigate();
  const viewFile = () => {
    navigate(`/view/${material.title}/${material.fileId}`);
  };
  return (
    <div className="card-container">
      <h3 className="title">{formatName(material.title)}</h3>
      <p className="sub-name">{formatName(material.subject)}</p>
      <p className="description">{material.description}</p>
      <p className="upload-by">
        Uploaded By:
        {" " + formatName(material.uploadedBy.name)}
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
