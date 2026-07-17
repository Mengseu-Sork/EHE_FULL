import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

import logo from "../../assets/images/logo.jpg";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await login(form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/kh/admin/dashboard");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Login failed.");
            } else {
                setError("Cannot connect to server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <div className="mb-6 text-center">

                    <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
                        <img
                            src={new URL("../../assets/images/logo.jpg", import.meta.url).href}
                            alt="Logo"
                            className="w-24 h-24 rounded-full"
                        />
                    </div>

                    <p className="mt-4 text-sm text-slate-400">
                        Sign in to access the Admin Dashboard
                    </p>

                </div>

                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Email Address
                        </label>

                        <div className="relative">
                            <svg
                                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 12H8m8-4H8m8 8H8"
                                />
                            </svg>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                required
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    bg-slate-50
                                    py-3
                                    pl-12
                                    pr-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-emerald-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-emerald-100
                                "
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Password
                        </label>

                        <div className="relative">
                            <svg
                                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V5a5 5 0 00-10 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2zm3-14a3 3 0 116 0v2H9V5z"
                                />
                            </svg>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    bg-slate-50
                                    py-3
                                    pl-12
                                    pr-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-emerald-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-emerald-100
                                "
                            />
                        </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between text-sm">

                        <label className="flex items-center gap-3 text-slate-600">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            Remember me
                        </label>

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            group
                            flex
                            w-full
                            items-center
                            justify-center cursor-pointer
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-emerald-600
                            to-green-700
                            py-3.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                            hover:shadow-xl
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="h-5 w-5 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>

                                Logging in...
                            </>
                        ) : (
                            <>
                                Login

                                <svg
                                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </>
                        )}
                    </button>

                </form>

            </div>
        </div>
    );
}