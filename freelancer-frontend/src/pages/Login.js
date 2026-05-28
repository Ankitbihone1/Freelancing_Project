import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // ✅ If already logged in → go to dashboard
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await API.post("/users/login", user);

      if (res.data && res.data.message?.toLowerCase().includes("success")) {

        localStorage.setItem("email", res.data.email);
        localStorage.setItem("role", res.data.role);

        navigate("/dashboard");

      } else {
        setMsg(res.data.message || "Login failed ❌");
      }

    } catch (err) {
      console.log(err);
      setMsg("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // auto hide message
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div style={container}>

      {msg && <div style={toast}>{msg}</div>}

      <div style={card}>

        <h2 style={title}>Welcome Back 👋</h2>
        <p style={subtitle}>Login to continue</p>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={input}
        />

        <button 
          onClick={handleSubmit} 
          style={btn}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={link}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const card = {
  width: "340px",
  padding: "30px",
  borderRadius: "15px",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  textAlign: "center",
  color: "#fff"
};

const title = {
  marginBottom: "5px"
};

const subtitle = {
  marginBottom: "20px",
  fontSize: "14px",
  opacity: "0.8"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.2)",
  color: "#fff"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(to right, #ff7a18, #ff4b2b)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

const link = {
  color: "#ffd369",
  cursor: "pointer",
  fontWeight: "bold"
};

const toast = {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "#333",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px"
};

export default Login;