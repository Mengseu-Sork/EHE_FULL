import { useEffect, useRef } from "react";
import api from "../../api/api";

export default function VisitorTracker() {

    const sent = useRef(false);

    useEffect(() => {

        if (sent.current) return;

        sent.current = true;

        const today = new Date().toISOString().split("T")[0];

        const lastVisit = localStorage.getItem("visitor_date");

        if (lastVisit === today) {
            return;
        }

        localStorage.setItem("visitor_date", today);

        api.post("/visitor").catch(() => {
            localStorage.removeItem("visitor_date");
        });

    }, []);

    return null;
}