"use client";
import { useState, useEffect } from "react";
import Menu from "./Components/menu";
import Carousel from "./Components/carausel"; // Import komponen Carousel
import Footer from "./Components/footer";

export default function Home() {
  const [articles, setArticles] = useState([]); // State untuk menyimpan artikel
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Status error

  // Mengambil artikel dari API saat komponen pertama kali dimuat
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("http://localhost:5000/api/news"); // URL API backend
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data); // Simpan artikel yang diterima ke state
        setLoading(false); // Set loading ke false setelah data diterima
      } catch (error) {
        setError(error.message); // Menyimpan pesan error
        setLoading(false); // Set loading ke false setelah error
      }
    }
    fetchArticles();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Menu />
      <div className="flex flex-col lg:flex-row gap-6 p-6 bg-[#525866] min-h-screen">
        {/* Kolom Kiri */}
        <div className="flex-1 bg-[#525866]">
          <h2 className="text-2xl font-extrabold text-white mt-19">IslamicWay</h2>
          <p className="text-sm underline font-normal text-white mb-9">"Understanding Islam, Bringing Goodness to Life"</p>
          <p className="text-white font-normal text-3xl mb-11">IslamicWay adalah platform Islami untuk memperkaya wawasan dan spiritualitas dengan penyampaian yang sederhana.</p>
        </div>

        {/* Kolom Kanan */}
        <div className="flex-1 bg-[#525866] rounded-lg">
          <h4 className="text-2xl font-bold mb-3">News</h4>
          <div>
            {/* Gantikan bagian ini dengan komponen Carousel */}
            <Carousel articles={articles} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
