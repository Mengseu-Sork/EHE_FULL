import { Routes, Route, useLocation } from "react-router-dom";

import MainLayout from "./website/layouts/MainLayout";

import Home from "./website/pages/Home";
import About from "./website/pages/About";
import Programs from "./website/pages/Programs";
import Projects from "./website/pages/Projects";
import News from "./website/pages/News";
import Contact from "./website/pages/Contact";
import Donate from "./website/pages/Donate";

import AdminLayout from "./admin/layouts/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import History from "./admin/pages/History";
import Supporter from "./admin/pages/Supporter";

export default function AppRoutes() {
    const location = useLocation();

    return (
        <Routes key={location.pathname}>
            {/* Website */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/donate" element={<Donate />} />
            </Route>

            {/* Login */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="history" element={<History />} />
                <Route path="supporters" element={<Supporter />} />
            </Route>
            
        </Routes>
    );
}