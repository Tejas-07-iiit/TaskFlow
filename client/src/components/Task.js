import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setActiveComponent } from "../redux/componentSlice";

const Task = () => {
    const activeComponent = useSelector(
        (state) => state.component.activeComponent
    );
    const dispatch = useDispatch();

    const [tasks, setTasks] = useState([]);
    const [taskForm, setTaskForm] = useState({ title: "", description: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    useEffect(() => {
        if (activeComponent === "tasks" && user) {
            fetchTasks();
        }
    }, [activeComponent, user]); // Added user to dependency array

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`, {
                withCredentials: true,
            });
            if (data.success) {
                setTasks(data.tasks);
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
            if (err.response?.status === 401) {
                localStorage.removeItem("user");
                dispatch(setActiveComponent("login"));
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskForm.title.trim()) return;

        try {
            setLoading(true);
            if (editingId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/tasks/${editingId}`, taskForm, {
                    withCredentials: true,
                });
                setEditingId(null);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, taskForm, {
                    withCredentials: true,
                });
            }
            setTaskForm({ title: "", description: "" });
            fetchTasks();
        } catch (err) {
            console.error("Error saving task:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task) => {
        setTaskForm({ title: task.title, description: task.description });
        setEditingId(task._id);
        window.scrollTo({ top: 0, behvior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
                withCredentials: true,
            });
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleComplete = async (id) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}/complete`, {}, {
                withCredentials: true,
            });
            fetchTasks();
        } catch (err) {
            console.error("Error completing task:", err);
        }
    };

    if (activeComponent !== "tasks") return null;

    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="page-wrapper home-page">
            <Navbar user={user} />

            <div className="home-container flex-grow-1">

                {/* Header Section */}
                <div className="header-section">
                    <h2 className="home-title">Task Management</h2>
                    <button
                        className="navbar-button"
                        onClick={() => dispatch(setActiveComponent("home"))}
                    >
                        Back to Home
                    </button>
                </div>

                {/* Task Creation Form */}
                <div className="task-form-card">
                    <h3 className="task-form-title">{editingId ? "Edit Task" : "Add New Task"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="task-input-group">
                            <label className="auth-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="What needs to be done?"
                                value={taskForm.title}
                                onChange={handleInputChange}
                                className="task-input"
                                required
                            />
                        </div>
                        <div className="task-input-group">
                            <label className="auth-label">Description</label>
                            <textarea
                                name="description"
                                placeholder="Add more details..."
                                value={taskForm.description}
                                onChange={handleInputChange}
                                className="task-textarea"
                            />
                        </div>
                        <div className="task-btn-row">
                            <button type="submit" className="auth-button" disabled={loading}>
                                {loading ? "Processing..." : (editingId ? "Update Task" : "Create Task")}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    className="navbar-button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setTaskForm({ title: "", description: "" });
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="task-section">
                    {/* Active Tasks Section */}
                    <div className="task-list">
                        <h3 className="task-form-title">Active Tasks ({activeTasks.length})</h3>
                        {activeTasks.length === 0 ? (
                            <p className="home-subtitle">No active tasks. Use the form above to add one!</p>
                        ) : (
                            activeTasks.map((task) => (
                                <div key={task._id} className="task-item-card">
                                    <div className="task-content">
                                        <h4 className="task-item-title">{task.title}</h4>
                                        <p className="task-item-desc">{task.description}</p>
                                    </div>
                                    <div className="task-item-actions">
                                        <button
                                            className="action-btn btn-complete"
                                            onClick={() => handleComplete(task._id)}
                                        >
                                            Complete
                                        </button>
                                        <button
                                            className="action-btn btn-edit"
                                            onClick={() => handleEdit(task)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="action-btn btn-delete"
                                            onClick={() => handleDelete(task._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Completed Tasks Section */}
                    {completedTasks.length > 0 && (
                        <div className="task-list">
                            <h3 className="task-form-title text-muted">Completed Tasks ({completedTasks.length})</h3>
                            {completedTasks.map((task) => (
                                <div key={task._id} className="task-item-card completed">
                                    <div className="task-content">
                                        <h4 className="task-item-title completed">{task.title}</h4>
                                        <p className="task-item-desc">{task.description}</p>
                                    </div>
                                    <div className="task-item-actions">
                                        <button
                                            className="action-btn btn-delete"
                                            onClick={() => handleDelete(task._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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

export default Task;
