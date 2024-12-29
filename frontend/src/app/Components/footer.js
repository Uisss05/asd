"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="w-full h-10 bg-white text-white ">
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Teks utama footer */}
        <Typography variant="h6" className=" mt-2 text-black">
          © {new Date().getFullYear()} Islamic Say. All Rights Reserved.
        </Typography>
        {/* Teks tambahan */}
      </div>
    </footer>
  );
};

export default Footer;
