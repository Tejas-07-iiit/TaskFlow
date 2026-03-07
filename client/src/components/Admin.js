import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { showNotification } from "../redux/notificationSlice";

const Admin = () => {
    const activeComponent = useSelector(
        (state) => state.component.activeComponent
    );

    const [usersWithTasks, setUsersWithTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

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
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users-tasks`, {
                withCredentials: true,
            });
            if (data.success) {
                setUsersWithTasks(data.users);
            }
        } catch (err) {
            const errorMsg = "Failed to fetch admin data. Ensure you have admin privileges.";
            dispatch(showNotification({ message: errorMsg, type: "error" }));
            setError(errorMsg);
        }
    };

    if (activeComponent !== "admin") return null;

    return (
        <div className="page-wrapper home-page">
            <Navbar user={user} />

            <div className="home-container flex-grow-1">
                <div className="p-20">
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
                            <div key={u._id} className="admin-user-card">
                                <div className="admin-user-header">
                                    <h3>{u.name}</h3>
                                    <p className="admin-user-email">{u.email}</p>
                                    <span className="status-badge">{u.role}</span>
                                </div>

                                <div className="admin-user-tasks">
                                    <h4>Tasks ({u.tasks.length})</h4>
                                    {u.tasks.length === 0 ? (
                                        <p className="task-item-desc">No tasks added yet.</p>
                                    ) : (
                                        <div className="admin-task-grid">
                                            {u.tasks.map((task) => (
                                                <div key={task._id} className="admin-task-small-card">
                                                    <h5 className={task.completed ? "task-item-title completed" : "task-item-title"}>
                                                        {task.title}
                                                    </h5>
                                                    <p className="admin-task-desc">{task.description}</p>
                                                    <div className="status-badge-wrapper">
                                                        <span className={`status-badge ${task.completed ? "status-completed" : "status-active"}`}>
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
