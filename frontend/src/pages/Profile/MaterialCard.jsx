import dayjs from "dayjs";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { formatName } from "../../utils/formatName";
import { Link } from "react-router";

export function MaterialCard({ material, loadMaterials }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    const deletePromise = axiosInstance
      .delete(`/api/materials/${material._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        loadMaterials(material.uploadedBy._id);
      });
    toast.promise(deletePromise, {
      loading: "Deleting material...",
      success: "Deleted succesfully",
      error: (err) => {
        if (err.response) {
          return err.response.data.message || "Delete failed";
        } else if (err.request) {
          return "Server not responding. Try again later.";
        } else {
          return "Something went wrong.";
        }
      },
    });
  };
  return (
    <div className="material-card">
      <h4>{formatName(material.title)}</h4>
      <div className="card-meta">
        <span>
          Subject: <strong>{formatName(material.subject)}</strong>
        </span>
      </div>
      <span className="date">
        {dayjs(material.uploadedAt).format("MMM DD, YYYY")}
      </span>
      <div className="card-buttons">
        <Link
          to={`/view/${formatName(material.title)}/${material.fileId}`}
          className="card-button view-button"
        >
          View Material
        </Link>
        <button className="card-button delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
