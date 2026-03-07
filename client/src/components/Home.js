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
    <div className="home-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar user={user} />

      <div className="home-container" style={{ flex: 1 }}>
        <div className="home-card" style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 className="home-title" style={{ fontSize: "36px", marginBottom: "20px" }}>
            Welcome to Task Manager, {user?.name || "User"}
          </h2>
          <p className="home-subtitle" style={{ maxWidth: "700px", margin: "0 auto 30px", fontSize: "18px", lineHeight: "1.6" }}>
            Task Manager is a minimalist and powerful tool designed to help you organize your daily life.
            Stay productive, track your goals, and manage your time efficiently with ease.
            Use the menu above to start managing your tasks.
          </p>
          <div style={{ marginTop: "40px" }}>
            <img
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800"
              alt="Productivity"
              style={{ width: "100%", maxWidth: "600px", borderRadius: "8px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
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