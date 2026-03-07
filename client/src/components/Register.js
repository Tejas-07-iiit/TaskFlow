import React, { useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent } from "../redux/componentSlice";

const Register = () => {

    const dispatch = useDispatch();
    const activeComponent = useSelector(
        (state) => state.component.activeComponent
    );

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const isValid = useMemo(() => {
        return (
            form.password === form.confirmPassword
        );
    }, [form]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) return;

        try {
            setLoading(true);

            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
            };
            
            const { data } = await axios.post(
                "http://localhost:5000/api/register",
                payload,
                {
                    withCredentials: true,
                }
            );


        } catch (err) {
            console.log(
                "Register failed:",
                err.response?.data?.message || err.message
            );
        } finally {
            setLoading(false);
        }
    };

    // Show register page only if Redux state is "register"
    if (activeComponent !== "register") return null;

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Create account</h1>
                    <p className="auth-subtitle">Register to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="auth-field">
                        <label htmlFor="name" className="auth-label">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            className="auth-input"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="register-email" className="auth-label">
                            Email
                        </label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="auth-input"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="register-password" className="auth-label">
                            Password
                        </label>

                        <div className="auth-password-wrap">
                            <input
                                id="register-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create password"
                                value={form.password}
                                onChange={handleChange}
                                className="auth-input auth-password-input"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="auth-toggle"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="confirmPassword" className="auth-label">
                            Confirm Password
                        </label>

                        <div className="auth-password-wrap">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="auth-input auth-password-input"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className="auth-toggle"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isValid}
                        className="auth-button"
                        onClick={handleSubmit}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="auth-switch-text">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => dispatch(setActiveComponent("login"))}
                        className="auth-switch-button"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;