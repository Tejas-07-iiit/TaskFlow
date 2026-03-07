import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent } from "../redux/componentSlice";

const Login = () => {

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const activeComponent = useSelector((state) => state.component.activeComponent);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/login`,
                form,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (data.success) {
                console.log("Login successfully");
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch(setActiveComponent("home"))
            }

        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Something went wrong";
            console.log(errorMsg);
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Show login page only if activeComponent === "login"
    if (activeComponent !== "login") return null;

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">Sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    <div className="login-field">
                        <label htmlFor="email" className="login-label">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="login-input"
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password" className="login-label">Password</label>

                        <div className="login-password-wrap">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="login-input login-password-input"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="login-toggle"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="login-button"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="go_signup">
                    <h6 style={{ fontSize: "13px", marginTop: "2px" }}>
                        Don't have an account?
                    </h6>

                    <p
                        style={{
                            textDecoration: "none",
                            fontSize: "13px",
                            color: "blue",
                            cursor: "pointer",
                        }}
                        onClick={() => dispatch(setActiveComponent("register"))}
                    >
                        Create one
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;