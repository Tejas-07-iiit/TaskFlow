import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";

const Admin = () => {
    const activeComponent = useSelector(
        (state) => state.component.activeComponent
    );

    const [usersWithTasks, setUsersWithTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUser = () => {
        try {
            const userStr = localStorage.getItem("user");
            return userStr ? JSON.parse(userStr) : null;
        } catch {
            return null;
        }
    };

    const user = getUser();

    useEffect(() => {
        if (activeComponent === "admin" && user?.role === "admin") {
            fetchAdminData();
        }
    }, [activeComponent]);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:5000/api/admin/users-tasks", {
                withCredentials: true,
            });
            if (data.success) {
                setUsersWithTasks(data.users);
            }
        } catch (err) {
            console.error("Error fetching admin data:", err);
            setError("Failed to fetch admin data. Ensure you have admin privileges.");
        } finally {
            setLoading(false);
        }
    };

    if (activeComponent !== "admin") return null;

    return (
        <div className="home-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar user={user} />

            <div className="home-container" style={{ flex: 1 }}>
                <div style={{ padding: "20px" }}>
                    <h2 className="home-title">Admin Dashboard</h2>
                    <p className="home-subtitle">Manage all users and their tasks</p>
                </div>

                {loading ? (
                    <div className="task-empty-state">Loading users and tasks...</div>
                ) : error ? (
                    <div className="task-empty-state" style={{ color: "red" }}>{error}</div>
                ) : usersWithTasks.length === 0 ? (
                    <div className="task-empty-state">No other users found.</div>
                ) : (
                    <div className="admin-user-list">
                        {usersWithTasks.map((u) => (
                            <div key={u._id} className="admin-user-card" style={{ marginBottom: "30px", border: "1px solid #e0e0e0", padding: "20px", backgroundColor: "white" }}>
                                <div className="admin-user-header" style={{ marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                                    <h3 style={{ margin: 0 }}>{u.name}</h3>
                                    <p style={{ color: "#666", fontSize: "14px", margin: "4px 0" }}>{u.email}</p>
                                    <span style={{ fontSize: "12px", padding: "2px 8px", backgroundColor: "#f0f0f0", color: "#666" }}>{u.role}</span>
                                </div>

                                <div className="admin-user-tasks">
                                    <h4 style={{ fontSize: "16px", marginBottom: "12px" }}>Tasks ({u.tasks.length})</h4>
                                    {u.tasks.length === 0 ? (
                                        <p style={{ color: "#999", fontSize: "14px" }}>No tasks added yet.</p>
                                    ) : (
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "10px" }}>
                                            {u.tasks.map((task) => (
                                                <div key={task._id} className="admin-task-small-card" style={{ padding: "12px", border: "1px solid #eee", backgroundColor: "#fafafa" }}>
                                                    <h5 style={{ margin: "0 0 5px 0", color: task.completed ? "#888" : "#222", textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</h5>
                                                    <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>{task.description}</p>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <span style={{ fontSize: "11px", padding: "2px 6px", backgroundColor: task.completed ? "#e6ffed" : "#fff7e6", color: task.completed ? "#2da44e" : "#d4a017", border: "1px solid" }}>
                                                            {task.completed ? "Completed" : "Active"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <footer className="footer-section">
                <div className="footer-container">
                    <p className="footer-text">© 2026 TaskFlow. Admin Panel.</p>
                    <div className="owner-info">
                        <p className="footer-label">App Owner</p>
                        <p className="footer-value">Tejas Ambaliya</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Admin;
