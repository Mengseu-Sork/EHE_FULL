import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VisitorTracker from "../components/VisitorTracker";

export default function MainLayout() {
    return (
        <>
            <VisitorTracker />

            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}