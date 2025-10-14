import toast from "react-hot-toast";
import { formatName } from "../../utils/formatName";
export function ProfileCard({ userProfile, setLoginStatus }) {
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setLoginStatus(false);
    toast.success("signed out!");
  };
  return (
    <>
      <h2>My Profile</h2>

      <div className="profile-info-card">
        <div className="avatar" id="avatar-initial">
          {userProfile?.name
            .split(" ")
            .map((w) => {
              return w.charAt(0).toUpperCase();
            })
            .join("")}
        </div>

        <div className="profile-details">
          <h3>
            <span id="profile-name">{formatName(userProfile?.name)}</span>
          </h3>
          <p>
            Email: <span id="profile-email">{userProfile?.email}</span>
          </p>
        </div>

        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </>
  );
}
