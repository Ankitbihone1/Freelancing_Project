import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateProject from "./pages/CreateProject";
import ViewProjects from "./pages/ViewProjects";
import Dashboard from "./pages/Dashboard";
import PlaceBid from "./pages/PlaceBid";
import Register from "./pages/Register";
import ViewBids from "./pages/ViewBids";
import MyBids from "./pages/MyBids";
import AdminUsers from "./pages/AdminUsers";
import AdminProjects from "./pages/AdminProjects";
import AdminBids from "./pages/AdminBids";



function App() {
  return (
    <BrowserRouter>   {/* 🔥 IMPORTANT */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/projects" element={<ViewProjects />} />
        <Route path="/bid/:id" element={<PlaceBid />} />
        <Route path="/bids/:id" element={<ViewBids />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/bids" element={<AdminBids />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;