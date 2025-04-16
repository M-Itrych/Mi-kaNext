"use client";

import { Facebook, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col w-full bg-[#f80] text-black relative">
      <div className="w-full h-[60px]"></div>
      <div className="bg-white py-4 px-4 md:py-6 md:px-10 flex justify-between items-center">
        <Link href="/">
          <Image src="/mika-logo.svg" alt="Logo" width={120} height={66} />
        </Link>

        <button
          className="md:hidden text-black focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex gap-4 font-bold text-lg">
          <a href="/o-nas" className="hover:text-[#f80]">
            O nas
          </a>
          <a href="/dostawcy" className="hover:text-[#f80]">
            Dostawcy
          </a>
          <a href="/aktualnosci" className="hover:text-[#f80]">
            Aktualności
          </a>
          <a href="/kontakt" className="hover:text-[#f80]">
            Kontakt
          </a>
          <a
            href="https://www.facebook.com/p/MI-KA-sp-z-oo-100048134066214/"
            target="_blank"
            className="hover:text-[#f80]"
          >
            <Facebook />
          </a>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full z-50 shadow-lg top-[calc(60px+66px+16px)]">
          <div className="flex flex-col justify-center items-center py-2">
            <a
              href="/"
              className="w-full text-center px-4 py-2 font-bold hover:bg-gray-100 hover:text-[#f80]"
            >
              O nas
            </a>
            <a
              href="/dostawcy"
              className="w-full text-center px-4 py-2 font-bold hover:bg-gray-100 hover:text-[#f80]"
            >
              Dostawcy
            </a>
            <a
              href="/aktualnosci"
              className="w-full text-center px-4 py-2 font-bold hover:bg-gray-100 hover:text-[#f80]"
            >
              Aktualności
            </a>
            <a
              href="/kontakt"
              className="w-full text-center px-4 py-2 font-bold hover:bg-gray-100 hover:text-[#f80]"
            >
              Kontakt
            </a>
            <a
              href="https://www.facebook.com/p/MI-KA-sp-z-oo-100048134066214/"
              target="_blank"
              className="w-full text-center px-4 py-2 font-bold hover:bg-gray-100 hover:text-[#f80]"
            >
              <div className="flex items-center justify-center gap-2">
                <Facebook size={20} />
                <span>Facebook</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
