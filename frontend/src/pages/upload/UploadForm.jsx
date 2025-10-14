import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
export function UploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    fileLink: "",
  });
  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadMaterial = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const uploadPromise = axios
      .post("/api/materials", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFormData({
          title: "",
          subject: "",
          description: "",
          fileLink: "",
        });
      });
    toast.promise(uploadPromise, {
      loading: "uploading material...",
      success: "Uploaded succesfully",
      error: (err) => {
        if (err.response) {
          return err.response.data.message || "Upload failed";
        } else if (err.request) {
          return "Server not responding. Try again later.";
        } else {
          return "Something went wrong.";
        }
      },
    });
  };
  return (
    <div className="form-card card">
      <h3>Resource Submission Form</h3>

      <form className="form-content" onSubmit={uploadMaterial}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleForm}
            required
            placeholder="e.g., Data Structures concepts"
          />
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleForm}
            required
            placeholder="e.g., Computer Science, DBMS"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleForm}
            required
            placeholder="A brief summary of the material..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="file-link">Google Drive Material Link</label>
          <input
            name="fileLink"
            id="file-link"
            type="url"
            value={formData.fileLink}
            onChange={handleForm}
            required
            placeholder="https://drive.google.com/..."
          />
        </div>

        <button type="submit" className="submit-button">
          Upload Material
        </button>
      </form>
    </div>
  );
}
