import { useDispatch } from "react-redux";
import { setActiveComponent } from "../redux/componentSlice";

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setActiveComponent("login"));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-brand cursor-pointer" onClick={() => dispatch(setActiveComponent("home"))}>
          <h1>Task Manager</h1>
        </div>

        <div className="navbar-actions">

          {/* Home Button */}
          <button
            onClick={() => dispatch(setActiveComponent("home"))}
            className="navbar-button"
          >
            Home
          </button>

          {/* Tasks Button */}
          <button
            onClick={() => dispatch(setActiveComponent("tasks"))}
            className="navbar-button"
          >
            Tasks
          </button>

          {/* Admin Button */}
          {user?.role === "admin" && (
            <button
              onClick={() => dispatch(setActiveComponent("admin"))}
              className="navbar-button"
            >
              Admin
            </button>
          )}

          {/* Profile Button */}
          <button
            onClick={() => dispatch(setActiveComponent("profile"))}
            className="navbar-button"
          >
            Profile
          </button>

          {/* User Name */}
          <p className="navbar-username">
            {user?.name || "User"}
          </p>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="navbar-logout"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;