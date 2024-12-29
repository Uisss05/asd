"use client";
import React, { useState, useEffect } from "react";
import { Button, Textarea, Input, Typography } from "@material-tailwind/react";
import axios from "axios"; // Impor axios
import { toast, ToastContainer } from "react-toastify"; // Impor toast dan ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Impor stylesheet untuk toast

export default function QuotesForm() {
  const [judul, setJudul] = useState("");
  const [isiQuotes, setIsiQuotes] = useState("");
  const [footnote, setFootnote] = useState("");
  const [penulis, setPenulis] = useState("");
  const [hook, setHook] = useState(""); // State untuk hook
  const [foto, setFoto] = useState(null); // State untuk foto
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jika field kosong
    if (!judul || !isiQuotes || !penulis || !hook) {
      toast.error("Semua field wajib diisi!"); // Menampilkan pesan error
      return;
    }

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("hook", hook);
    formData.append("isiQuotes", isiQuotes);
    formData.append("footnote", footnote);
    formData.append("penulis", penulis);

    if (foto) {
      const fileType = foto.type.split("/")[0];
      if (fileType !== "image") {
        toast.error("Hanya file gambar yang diperbolehkan!"); // Menampilkan pesan error jika file bukan gambar
        return;
      }
      formData.append("foto", foto); // Menambahkan foto ke form data
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/quotes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Quotes berhasil disimpan!"); // Menampilkan pesan sukses
        // Reset form
        setJudul("");
        setIsiQuotes("");
        setFootnote("");
        setPenulis("");
        setHook("");
        setFoto(null);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      toast.error("Gagal menyimpan quotes."); // Menampilkan pesan error jika terjadi kesalahan
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <Typography variant="h5" className="mb-6 text-center text-black">
        Form Input Quotes
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Nama Penulis */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Nama Penulis
          </Typography>
          <Input
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            label="Masukkan Nama Penulis"
            className="w-full text-black" // Menambahkan text-black
            required
          />
        </div>

        {/* Input Judul Quotes */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Judul Quotes
          </Typography>
          <Input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            label="Masukkan Judul Quotes"
            className="w-full text-black" // Menambahkan text-black
            required
          />
        </div>

        {/* Input Isi Quotes */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Isi Quotes
          </Typography>
          <Textarea
            value={isiQuotes}
            onChange={(e) => setIsiQuotes(e.target.value)}
            label="Masukkan Isi Quotes"
            className="w-full text-black" // Menambahkan text-black
            required
            rows={6}
          />
        </div>

        {/* Input Footnote Quotes */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Footnote Quotes
          </Typography>
          <Textarea
            value={footnote}
            onChange={(e) => setFootnote(e.target.value)}
            label="Masukkan Footnote Quotes"
            className="w-full text-black" // Menambahkan text-black
            rows={4}
          />
        </div>

        {/* Input Hook Quotes */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Hook Quotes
          </Typography>
          <Textarea
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            label="Masukkan Hook Quotes"
            className="w-full text-black" // Menambahkan text-black
            required
            rows={3}
          />
        </div>

        {/* Input Foto Quotes */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Foto Quotes
          </Typography>
          <Input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
            label="Pilih Foto"
            className="w-full text-black" // Menambahkan text-black
          />
        </div>

        {/* Tombol Kirim */}
        <Button type="submit" className="w-full mt-4" variant="filled" disabled={isLoading}>
          {isLoading ? "Mengirim..." : "Posting Quotes"}
        </Button>
      </form>

      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer />
    </div>
  );
}
