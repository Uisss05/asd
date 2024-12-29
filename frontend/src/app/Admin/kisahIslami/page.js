"use client";
import React, { useState, useEffect } from "react";
import { Button, Textarea, Input, Typography } from "@material-tailwind/react";
import axios from "axios"; // Impor axios
import { toast, ToastContainer } from "react-toastify"; // Impor toast dan ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Impor stylesheet untuk toast

export default function CeritaForm() {
  const [judul, setJudul] = useState("");
  const [isiCerita, setIsiCerita] = useState("");
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
    if (!judul || !isiCerita || !penulis || !hook) {
      toast.error("Semua field wajib diisi!"); // Menampilkan pesan error
      return;
    }

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("hook", hook);
    formData.append("isiCerita", isiCerita);
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
      const response = await axios.post("http://localhost:5000/api/cerita", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Cerita berhasil disimpan!"); // Menampilkan pesan sukses
        // Reset form
        setJudul("");
        setIsiCerita("");
        setFootnote("");
        setPenulis("");
        setHook("");
        setFoto(null);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      toast.error("Gagal menyimpan cerita."); // Menampilkan pesan error jika terjadi kesalahan
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
        Form Input Cerita
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

        {/* Input Judul Cerita */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Judul Cerita
          </Typography>
          <Input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            label="Masukkan Judul Cerita"
            className="w-full text-black" // Menambahkan text-black
            required
          />
        </div>

        {/* Input Isi Cerita */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Isi Cerita
          </Typography>
          <Textarea
            value={isiCerita}
            onChange={(e) => setIsiCerita(e.target.value)}
            label="Masukkan Isi Cerita"
            className="w-full text-black" // Menambahkan text-black
            required
            rows={6}
          />
        </div>

        {/* Input Footnote Cerita */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Footnote Cerita
          </Typography>
          <Textarea
            value={footnote}
            onChange={(e) => setFootnote(e.target.value)}
            label="Masukkan Footnote Cerita"
            className="w-full text-black" // Menambahkan text-black
            rows={4}
          />
        </div>

        {/* Input Hook Cerita */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Hook Cerita
          </Typography>
          <Textarea
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            label="Masukkan Hook Cerita"
            className="w-full text-black" // Menambahkan text-black
            required
            rows={3}
          />
        </div>

        {/* Input Foto Cerita */}
        <div>
          <Typography variant="small" className="mb-2 text-black">
            Foto Cerita
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
          {isLoading ? "Mengirim..." : "Posting Cerita"}
        </Button>
      </form>

      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer />
    </div>
  );
}
