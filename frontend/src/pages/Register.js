import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/auth/register", form);
        alert("User registered successfully!");
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="p-6 bg-white shadow rounded" onSubmit={handleSubmit}>
                <h2 className="text-xl mb-4">Register</h2>

                <input className="border p-2 w-full mb-3" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="border p-2 w-full mb-3" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" className="border p-2 w-full mb-3" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Register</button>
                <p className="text-sm mt-3 text-center">
                    Already have an account? {" "}<Link to="/" className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>
    );
}