"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../lib/axios"; // Import konfigurasi axios jika sudah dibuat

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/register", { nama, password });

      if (response.status === 201) {
        toast.success("Registrasi berhasil!");
        setNama("");
        setPassword("");
      } else {
        toast.error(response.data.message || "Registrasi gagal!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-gray-700 font-medium mb-2">
              Nama
            </label>
            <input type="text" id="nama" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500" placeholder="Masukkan Nama" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Masukkan Password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500">
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
