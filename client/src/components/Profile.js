import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Profile = () => {

  const activeComponent = useSelector(
    (state) => state.component.activeComponent
  );

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (activeComponent !== "profile") return null;

  return (

    <div className="profile-page">

      <Navbar user={user} />

      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-header">
            <h2>My Profile</h2>
          </div>

          <div className="profile-grid">

            <div className="profile-info-card">
              <p className="profile-info-label">Name</p>
              <p className="profile-info-value">
                {user?.name || "N/A"}
              </p>
            </div>

            <div className="profile-info-card">
              <p className="profile-info-label">Email</p>
              <p className="profile-info-value">
                {user?.email || "N/A"}
              </p>
            </div>

            <div className="profile-info-card profile-info-card full-width">
              <p className="profile-info-label">Role</p>
              <p className="profile-info-value capitalize">
                {user?.role || "user"}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;