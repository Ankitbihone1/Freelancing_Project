import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // ✅ ADMIN ONLY ACCESS
  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/users/admin/users/delete/${id}`);

      // 🔥 instant UI update (better UX)
      setUsers(prev => prev.filter(u => u.id !== id));

      setMsg("User deleted successfully ✅");

    } catch (err) {
      console.log(err);
      setMsg("Error deleting user ❌");
    }
  };

  // ✅ Auto hide message
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div style={container}>
      <Navbar />

      <h2 style={title}>👥 Manage Users</h2>

      {msg && <div style={successBox}>{msg}</div>}

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr style={thead}>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" style={empty}>
                  No Users Found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} style={row}>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      style={deleteBtn}
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #eef2f3, #8e9eab)",
  paddingTop: "20px"
};

const title = {
  textAlign: "center",
  marginTop: "20px"
};

const tableWrapper = {
  display: "flex",
  justifyContent: "center",
  marginTop: "30px"
};

const table = {
  width: "80%",
  background: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  borderCollapse: "collapse"
};

const thead = {
  background: "#667eea",
  color: "white"
};

const row = {
  textAlign: "center",
  borderBottom: "1px solid #ddd"
};

const deleteBtn = {
  padding: "6px 12px",
  background: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const successBox = {
  background: "#d4edda",
  color: "#155724",
  padding: "10px",
  borderRadius: "6px",
  margin: "10px auto",
  width: "fit-content",
  fontWeight: "bold"
};

const empty = {
  padding: "20px",
  textAlign: "center"
};

export default AdminUsers;