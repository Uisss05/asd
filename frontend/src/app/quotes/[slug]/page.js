"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Menggunakan usePathname
import { Card, CardBody, CardFooter } from "@material-tailwind/react"; // Import Material Tailwind
import Image from "next/image"; // Import next/image

const QuoteDetail = () => {
  const router = useRouter();
  const pathname = usePathname(); // Ambil pathname untuk mendapatkan slug dari URL

  const [slug, setSlug] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Memastikan slug ada di URL path
    const slugFromPath = pathname?.split("/").pop(); // Ambil bagian terakhir dari URL untuk slug
    setSlug(slugFromPath);
  }, [pathname]); // Effect hanya dipanggil jika pathname berubah

  useEffect(() => {
    if (!slug) return; // Hanya fetch jika slug ada

    const fetchQuote = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quotesCard/${slug}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data quote!");
        }
        const data = await response.json();
        setQuote(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [slug]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!quote) {
    return <div className="text-center text-gray-500">Quote tidak ditemukan</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardBody>
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">{quote.judul}</h1>

          {quote.foto && (
            <div className="relative w-full h-[400px] mb-6">
              <Image src={`http://localhost:5000/${quote.foto}`} alt="Quote Foto" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          )}

          <p className="text-lg text-gray-700 mb-4">
            Penulis: <span className="font-medium">{quote.penulis}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">Dibuat pada: {new Date(quote.created_at).toLocaleDateString()}</p>
          <div className="text-lg text-gray-800 mb-6">{quote.isi}</div>
          {quote.footnote && (
            <div className="text-sm text-gray-500 mt-4 italic">
              <p>Footnote: {quote.footnote}</p>
            </div>
          )}
        </CardBody>
        <CardFooter>
          <button onClick={() => router.push("/quotes")} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
            Kembali ke Daftar Quotes
          </button>
        </CardFooter>
      </Card>
      <Footer />
    </div>
  );
};

export default QuoteDetail;
