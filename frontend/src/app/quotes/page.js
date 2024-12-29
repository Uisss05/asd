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

const QuotesCard = () => {
  const [quotesData, setQuotesData] = useState([]); // State untuk menyimpan data quotes
  const [loading, setLoading] = useState(true); // State untuk loading indicator
  const [error, setError] = useState(null); // State untuk error handling

  // Fetch data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quotesCard"); // Sesuaikan endpoint backend
        if (!response.ok) {
          throw new Error("Gagal mengambil data quotes!");
        }
        const data = await response.json();

        // Mengurutkan quotes berdasarkan tanggal created_at dalam urutan menurun
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setQuotesData(sortedData); // Set data yang sudah diurutkan ke state
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

  // Jika tidak ada quotes
  if (!quotesData.length) {
    return <div className="text-center mt-20">Tidak ada quotes tersedia.</div>;
  }

  return (
    <div className="bg-gray-50 py-10 mb-5">
      <Menu />
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
        {quotesData.map((quote, index) => {
          const slug = slugify(quote.judul || "default-quotes"); // Jika judul kosong, gunakan slug default
          return (
            <Card key={index} className="w-full max-w-sm mx-auto">
              <img
                src={`http://localhost:5000/${quote.foto || "default-image.jpg"}`} // Gambar default jika foto tidak tersedia
                alt={quote.judul || "Quotes"}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => (e.target.src = "/default-image.jpg")} // Menangani jika gambar gagal dimuat
              />
              <CardBody>
                <Typography variant="h5" className="text-xl font-semibold text-gray-800">
                  {quote.judul || "Judul Tidak Tersedia"}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-2">
                  Penulis: {quote.penulis || "Tidak diketahui"}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-1">
                  Tanggal: {quote.created_at ? new Date(quote.created_at).toLocaleDateString() : "Tidak tersedia"}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-2">
                  {quote.hook ? quote.hook.substring(0, 100) + "..." : "Tidak ada ringkasan"}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-end">
                <Link href={`/quotes/${slug}`}>
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

export default QuotesCard;
