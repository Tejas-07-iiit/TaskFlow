import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const activeComponent = useSelector(
    (state) => state.component.activeComponent
  );

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (activeComponent !== "home") return null;

  return (
    <div className="page-wrapper home-page">
      <Navbar user={user} />

      <div className="home-container flex-grow-1">
        <div className="home-content-card">
          <h2 className="home-hero-title">
            Welcome to Task Manager, {user?.name || "User"}
          </h2>
          <p className="home-hero-subtitle">
            Task Manager is a minimalist and powerful tool designed to help you organize your daily life.
            Stay productive, track your goals, and manage your time efficiently with ease.
            Use the menu above to start managing your tasks.
          </p>
          <div className="home-hero-img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800"
              alt="Productivity"
              className="home-hero-img"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <p className="footer-text">© 2026 TaskFlow. All rights reserved.</p>
          <div className="owner-info">
            <p className="footer-label">App Owner</p>
            <p className="footer-value">Tejas Ambaliya</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;