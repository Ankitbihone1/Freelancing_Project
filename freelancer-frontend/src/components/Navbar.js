import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  return (
    <div style={nav}>

      <h2 style={logo} onClick={() => navigate("/dashboard")}>
        FreelancerHub
      </h2>

      <div style={menu}>

        {/* COMMON */}
        <button style={link} onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        {/* CLIENT */}
        {role === "CLIENT" && (
          <>
            <button style={link} onClick={() => navigate("/create-project")}>
              Create
            </button>

            <button style={link} onClick={() => navigate("/projects")}>
              My Projects
            </button>
          </>
        )}

        {/* FREELANCER */}
        {role === "FREELANCER" && (
          <>
            <button style={link} onClick={() => navigate("/projects")}>
              Explore
            </button>

            <button style={link} onClick={() => navigate("/my-bids")}>
              My Bids
            </button>
          </>
        )}

        {/* ADMIN */}
        {role === "ADMIN" && (
          <>
            <button style={link} onClick={() => navigate("/admin/users")}>
              Users
            </button>

            <button style={link} onClick={() => navigate("/admin/projects")}>
              Projects
            </button>

            <button style={link} onClick={() => navigate("/admin/bids")}>
              Bids
            </button>
          </>
        )}

        {/* LOGOUT */}
        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}

/* 🎨 STYLES */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "linear-gradient(to right, #667eea, #764ba2)",
  color: "white",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};

const logo = {
  margin: 0,
  cursor: "pointer"
};

const menu = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const link = {
  padding: "8px 12px",
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "14px"
};

const logoutBtn = {
  padding: "8px 12px",
  background: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Navbar;