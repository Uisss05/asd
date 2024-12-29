"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link"; // Import Link from Next.js

const Carousel = ({ autoplayInterval = 5000 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Menyimpan error jika ada
  const [currentIndex, setCurrentIndex] = useState(0); // Untuk index saat ini

  // Fetch data from combinedData API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/combineData");
        setData(response.data); // Menyimpan data ke dalam state
      } catch (err) {
        setError("Gagal mengambil data, coba lagi nanti."); // Menyimpan pesan error tanpa console.log
      } finally {
        setLoading(false); // Menandakan bahwa proses selesai
      }
    };

    fetchData();
  }, []); // hanya sekali saat mount

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, autoplayInterval);

    return () => clearInterval(interval); // Cleanup interval saat komponen unmount
  }, [data, autoplayInterval]); // Efek ini tergantung pada data dan autoplayInterval

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Menampilkan pesan error jika ada
  }

  // Ambil 3 data terbaru
  const recentData = data.slice(0, 3);

  return (
    <div className="relative w-full">
      {/* Menampilkan data saat ini */}
      <Card className="w-full h-[500px] shadow-xl rounded-xl md:h-[400px]">
        <CardBody>
          {/* Gambar, jika tidak ada gunakan gambar default */}
          <img src={`http://localhost:5000/${recentData[currentIndex]?.foto?.replace("\\", "/") || "default-image.jpg"}`} alt={recentData[currentIndex]?.judul || "Judul Tidak Tersedia"} className="w-full h-40 object-cover mb-4 rounded-lg" />
          {/* Judul */}
          <Typography variant="h6" className="font-bold text-gray-800 mb-2">
            {recentData[currentIndex]?.judul || "Judul Tidak Tersedia"}
          </Typography>
          {/* Ringkasan atau Hook */}
          <Typography className="text-gray-600 mb-4">{recentData[currentIndex]?.hook || "Ringkasan tidak tersedia"}</Typography>

          {/* Tombol untuk "Read More" dengan kondisi URL */}
          <Link
            href={
              recentData[currentIndex]?.type === "artikel"
                ? `/artikel/${recentData[currentIndex]?.slug || ""}`
                : recentData[currentIndex]?.type === "cerita"
                ? `/kisah-islami/${recentData[currentIndex]?.slug || ""}`
                : recentData[currentIndex]?.type === "quotes"
                ? `/quotes/${recentData[currentIndex]?.slug || ""}`
                : "#"
            }>
            <Button color="blue" size="sm" className="mt-4">
              Read More
            </Button>
          </Link>
        </CardBody>
      </Card>

      {/* Indicator titik */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {recentData.map((_, index) => (
          <div key={index} className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-300 ${currentIndex === index ? "bg-blue-500" : "bg-gray-400"}`} onClick={() => setCurrentIndex(index)}></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
