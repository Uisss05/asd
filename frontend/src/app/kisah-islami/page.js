"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button, CardFooter } from "@material-tailwind/react";
import Menu from "../Components/menu";

import Link from "next/link";

// Fungsi untuk mengubah judul menjadi slug yang aman
const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD") // Menghilangkan aksen
    .replace(/[\u0300-\u036f]/g, "") // Menghapus karakter aksen
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Mengganti spasi dengan tanda -
    .replace(/[^\w\-]+/g, "") // Menghapus karakter selain alphanumeric dan -
    .replace(/\-\-+/g, "-"); // Menghapus tanda - ganda
};

const CeritaCard = () => {
  const [ceritaData, setCeritaData] = useState([]); // State untuk menyimpan data cerita
  const [loading, setLoading] = useState(true); // State untuk loading indicator
  const [error, setError] = useState(null); // State untuk error handling

  // Fetch data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ceritaCard"); // Sesuaikan endpoint backend
        if (!response.ok) {
          throw new Error("Gagal mengambil data cerita!");
        }
        const data = await response.json();

        // Mengurutkan cerita berdasarkan tanggal created_at dalam urutan menurun
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setCeritaData(sortedData); // Set data yang sudah diurutkan ke state
      } catch (err) {
        setError(err.message); // Set pesan error
      } finally {
        setLoading(false); // Set loading selesai
      }
    };

    fetchData();
  }, []);

  // Jika masih loading
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // Jika ada error
  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  // Jika tidak ada cerita
  if (!ceritaData.length) {
    return <div className="text-center mt-20">Tidak ada cerita tersedia.</div>;
  }

  return (
    <div className="bg-gray-50 py-10">
      <Menu />
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
        {ceritaData.map((cerita, index) => {
          const slug = slugify(cerita.judul || "default-cerita"); // Jika judul kosong, gunakan slug default
          return (
            <Card key={index} className="w-full max-w-sm mx-auto">
              <img
                src={`http://localhost:5000/${cerita.foto || "default-image.jpg"}`} // Gambar default jika foto tidak tersedia
                alt={cerita.judul || "Cerita"}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => (e.target.src = "/default-image.jpg")} // Menangani jika gambar gagal dimuat
              />
              <CardBody>
                <Typography variant="h5" className="text-xl font-semibold text-gray-800">
                  {cerita.judul || "Judul Tidak Tersedia"}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-2">
                  Penulis: {cerita.penulis || "Tidak diketahui"}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-1">
                  Tanggal: {cerita.created_at ? new Date(cerita.created_at).toLocaleDateString() : "Tidak tersedia"}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-2">
                  {cerita.hook ? cerita.hook.substring(0, 100) + "..." : "Tidak ada ringkasan"}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-end">
                <Link href={`/kisah-islami/${slug}`}>
                  <Button variant="filled" color="blue" className="hover:bg-blue-600 transition duration-300">
                    Read More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CeritaCard;
