import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/logo";
import MobileTopHeader from "../../components/mobile-top-header";
import TopHeader from "../../components/top-header";
import Navbar from "../../components/navbar";
import MobileNavbar from "../../components/mobile-navbar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header({ lineMenu }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (lineMenu) {
      setIsScrolled(true);
    }
  }, [lineMenu]);


  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else if(window.scrollY < 10 && !lineMenu ) {
      setIsScrolled(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 ${
        isMenuHovered || isScrolled
          ? "bg-white border-b border-gray-300 text-black"
          : "bg-transparent text-white"
      }`}
    >
      {/* desktop header */}
      <div>
        <TopHeader />

        {!isScrolled && <Logo isMenuHovered={isMenuHovered} />}
        {/* desktop Navbar */}
        <Navbar
          isMenuHovered={isMenuHovered}
          setIsMenuHovered={setIsMenuHovered}
          isScrolled={isScrolled}
        />
      </div>

      {/* mobile header */}
      <div className="lg:hidden">
        <MobileTopHeader />
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <MobileNavbar />
      </div>
    </header>
  );
}

export default Header;
