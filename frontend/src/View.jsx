import { useParams, Link } from "react-router";

import "./View.css";
export function View() {
  const params = useParams();
  return (
    <div className="view-page">
      <nav className="header">
        <div className="left-section">
          <Link className="link" to="/">
            <button className="back-btn" id="back-to-home-btn">
              {/*Back Icon*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5"></path>
                <path d="m12 19-7-7 7-7"></path>
              </svg>
              Back
            </button>
          </Link>
          <h3>{params.materialTitle}</h3>
        </div>
        <div className="right-section">
          <button id="download-btn">
            <a
              className="download-link"
              href={`https://drive.google.com/uc?export=download&id=${params.id}`}
            >
              Download
            </a>
          </button>
        </div>
      </nav>
      <main className="material-constainer">
        {/* Using an external PDF link for demonstration */}
        <iframe
          src={`https://drive.google.com/file/d/${params.id}/preview`}
          title={"hi"}
        ></iframe>
      </main>
    </div>
  );
}
