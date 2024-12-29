"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/axios"; // Impor axios dari lib/axios
import LoadingScreen from "../Components/loadingScreen"; // Impor komponen Loading

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/error/403");
      return;
    }

    api
      .get("/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false); // Loading selesai
      })
      .catch(() => {
        router.push("/error/403");
      });
  }, [router]);

  // Tampilkan komponen Loading selama verifikasi
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render konten halaman Admin jika verifikasi berhasil
  return (
    <div>
      <h1>Halaman Admin</h1>
      {/* Konten admin ditampilkan di sini */}
    </div>
  );
}
