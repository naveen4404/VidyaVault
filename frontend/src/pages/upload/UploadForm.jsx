export function UploadForm() {
  return (
    <div className="form-card card">
      <h3>Resource Submission Form</h3>

      <form action="#" method="POST" className="form-content">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g., Data Structures Mid-Term QPs (2020-2023)"
          />
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="e.g., Computer Science, History"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            required
            placeholder="A brief summary of the material..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="material-link">Google Drive Material Link</label>
          <input
            name="materialLink"
            id="material-link"
            type="url"
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
