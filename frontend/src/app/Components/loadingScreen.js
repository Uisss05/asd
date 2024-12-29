"use client";
import { Typography } from "@material-tailwind/react";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Typography variant="h4" className="mb-4 text-blue-500">
          Memuat Halaman...
        </Typography>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    </div>
  );
}
