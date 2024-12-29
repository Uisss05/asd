import React from "react";
import { Button, IconButton, Typography, Collapse, Navbar } from "@material-tailwind/react";
import Link from "next/link";

const Menu = () => {
  const [openNav, setOpenNav] = React.useState(false); // Untuk mengontrol apakah menu terbuka atau tidak
  const [scrolled, setScrolled] = React.useState(false); // Untuk mengubah gaya saat scroll

  // Event listener untuk scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Daftar menu
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {["Artikel", "Kisah Islami", "Quotes", "About Us"].map((item, index) => (
        <Typography
          as="li"
          key={item}
          variant="small"
          className={`p-1 font-normal ${scrolled ? "text-black" : "text-white"} transition-opacity duration-300 ease-in-out`}
          style={{ transitionDelay: `${index * 100}ms` }} // Menambahkan delay secara bertahap
        >
          <Link href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} passHref>
            <span className="flex items-center">{item}</span>
          </Link>
        </Typography>
      ))}
      <Typography as="li" variant="small" className={`lg:hidden p-1 font-normal ${scrolled ? "text-black" : "text-white"}`}>
        <Link href="/login" passHref>
          <Button fullWidth variant="text" size="sm" className={scrolled ? "text-black" : "text-white"}>
            <span>Log In</span>
          </Button>
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full">
      {/* Navbar Fixed */}
      <Navbar className={`fixed top-0 w-full z-10 h-max rounded-none px-4 py-2 lg:px-8 lg:py-4 ${scrolled ? "bg-white text-black shadow-md" : "bg-[#525866] text-white"} border-0 outline-none transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between">
          <Typography as="a" href="/" className={`font-semibold text-xl hover:text-2xl hover:font-bold mr-4 cursor-pointer  py-1.5 font-medium ${scrolled ? "text-black" : "text-white"}`}>
            IslamicSay.Id
          </Typography>
          <div className="flex items-center gap-4">
            {/* Navbar Desktop */}
            <div className="mr-4 hidden lg:block">{navList}</div>
            {/* Tombol Log In di Desktop */}
            <div className="flex items-center gap-x-1">
              <Link href="/login">
                <Button variant="text" size="sm" className={`hidden lg:inline-block ${scrolled ? "text-black" : "text-white"}`}>
                  <span>Log In</span>
                </Button>
              </Link>
            </div>
            {/* Hamburger Menu Icon */}
            <IconButton
              variant="text"
              className={`lg:hidden mb-6 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent ${scrolled ? "text-black" : "text-white"} transition-transform duration-300 ease-in-out`}
              ripple={false}
              onClick={() => setOpenNav(!openNav)}>
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6 transform rotate-45" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        {/* Collapse Menu untuk Tampilan Mobile */}
        <Collapse open={openNav} className={`lg:hidden transition-transform duration-500 ease-in-out ${openNav ? "transform translate-x-0 opacity-100" : "transform -translate-x-full opacity-0"}`}>
          <div className="flex flex-col gap-2 p-4">
            {openNav && navList} {/* Navigasi tampil sesuai dengan state openNav */}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
