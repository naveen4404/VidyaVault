import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";
import { ProfileCard } from "./ProfileCard";
import { MaterialCard } from "./MaterialCard";
import "./Profile.css";

export function Profile({ loginStatus, setLoginStatus }) {
  const [userProfile, setUserProfile] = useState({});
  const [userMaterials, setUserMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMaterials = async (id) => {
    const materialResponse = await axios.get(
      `/api/materials/?uploadedBy=${id}`
    );
    setUserMaterials(materialResponse.data.data);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userResponse = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserProfile(userResponse.data.profile);
        loadMaterials(userResponse.data.profile._id);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Header loginStatus={loginStatus} />
      {loading ? (
        <Loader />
      ) : (
        <div className="page-container">
          <div className="content-wrapper">
            <ProfileCard
              userProfile={userProfile}
              setLoginStatus={setLoginStatus}
            />
            <h3 className="section-title">Your Uploaded Materials 📚</h3>

            {userMaterials.length === 0 ? (
              <div className="empty-state" id="empty-state">
                <p>You havenot uploaded any materials yet.</p>
                <p>Share your first material!</p>
              </div>
            ) : (
              <div className="material-grid" id="materials-grid">
                {userMaterials.map((material) => {
                  return (
                    <MaterialCard
                      key={material._id}
                      material={material}
                      loadMaterials={loadMaterials}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
