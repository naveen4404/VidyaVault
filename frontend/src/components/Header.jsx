import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import axios from "axios";
import "./Header.css";
export function Header({ setMaterials, loginStatus }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const setQueryText = (event) => {
    setQuery(event.target.value);
  };

  const fetchMaterialOnSearch = async () => {
    let response;
    if (query.length > 2) {
      response = await axios.get(`/api/materials/search/${query.trim()}`);
      setMaterials(response.data.data);
      navigate("/");
    }
  };
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (query.length > 2) {
          fetchMaterialOnSearch();
        }
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const keyHandler = (event) => {
    if (event.key === "Enter") {
      fetchMaterialOnSearch();
    } else if (event.key === "Escape") {
      setQuery("");
    }
  };
  return (
    <>
      <header className="header">
        <Link className="home-link" to={"/"}>
          <div className="logo">
            <svg
              className="h-8 w-8 text-primary logo-item"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div className="logo-text">VidyaVault</div>
          </div>
        </Link>
        <div className="search-bar">
          <input
            className="input-text"
            type="text"
            id="input-text"
            value={query}
            onChange={setQueryText}
            onKeyDown={keyHandler}
            placeholder="e.g., 'Data Structures'"
          />
          <button className="search-btn" onClick={fetchMaterialOnSearch}>
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
        <nav className="nav-items">
          <NavLink
            to={loginStatus ? "/upload" : "/auth/login"}
            className="upload-link"
          >
            <button className="upload-btn">
              <i className="fa-solid fa-arrow-up-from-bracket" />
              Upload
            </button>
          </NavLink>
          {loginStatus ? (
            <NavLink className="icon" to={"/me"}>
              <i className="fa-regular fa-user profile-icon"></i>
            </NavLink>
          ) : (
            <NavLink to={"/auth/login"}>
              <button className="login-btn">Login</button>
            </NavLink>
          )}
        </nav>
      </header>
    </>
  );
}
