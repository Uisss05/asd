"use client";
import { Typography, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/"); // Arahkan ke halaman utama
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <Typography variant="h3" className="text-red-500 mb-4">
          Akses Ditolak
        </Typography>
        <Typography variant="h6" className="text-gray-600 mb-6">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </Typography>
        <Button color="blue" onClick={handleBackToHome}>
          Kembali ke Halaman Utama
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
