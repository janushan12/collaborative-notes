import { useState } from "react"
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <form className="p-6 bg-white shadow rounded" onSubmit={handleLogin}>
                <h2 className="text-xl mb-4">Login</h2>
                <input className="border p-2 w-full mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="border p-2 w-full mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-green-500 text-white px-4 py-2 w-full">
                    Login
                </button>
            </form>
        </div>
    );
}