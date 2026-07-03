import api from "./api";

export const login = async (data) => {
    return await api.post("/login", data);
};

export const logout = async () => {
    return await api.post("/logout");
};

export const me = async () => {
    return await api.get("/me");
};