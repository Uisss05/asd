// app/about/page.js
import { notFound } from "next/navigation";

const About = () => {
  // Memanggil notFound() untuk memunculkan halaman 404
  notFound();

  return null; // Tidak ada yang perlu dirender karena halaman akan langsung diarahkan ke 404
};

export default About;
