'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blogmain" },
  { name: "Contact", href: "/contact" },
];

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the menu

  return (
    <nav className="bg-gray-100 flex items-center justify-between h-16 px-4 md:px-8 shadow-md relative">
      {/* Left Section: Hamburger + Logo */}
      <div className="flex items-center">
        {/* Hamburger Menu */}
        <div className="md:hidden mr-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-md hover:bg-gray-400"
          >
            {menuOpen ? (
              <IoClose size={28} className="text-black" />
            ) : (
              <HiMenuAlt4 size={28} className="text-black" />
            )}
          </button>
        </div>
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.svg"  
            alt="logo"
            width={40}
            height={40}
            className="w-[40px] h-[40px]"
          />
        </Link>
      </div>

      {/* Center Section: Links (Visible for Medium Screens and Larger) */}
      <ul className="hidden md:flex gap-8 list-none font-semibold text-gray-800">
        {links.map((link) => (
          <li key={link.name} className="relative group">
            <Link href={link.href}>
              <span className="block relative z-10 px-3 py-1 transition-colors duration-300 ease-in-out group-hover:text-white group-hover:bg-black rounded-md">
                {link.name}
              </span>
            </Link>
          </li>
        ))} 
      </ul>

      {/* Hamburger Menu Dropdown (Visible on Small Screens) */}
      {menuOpen && (
        <div
          className="absolute top-16 left-0 w-full bg-gray-100 shadow-lg z-10 transition-transform duration-300"
        >
          <ul className="flex flex-col gap-4 p-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <span
                    className="block px-3 py-2 text-black hover:bg-gray-300 rounded-md"
                    onClick={() => setMenuOpen(false)} // Close menu on link click
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            ))} 
          </ul>
        </div>
      )}

      {/* Right Section: User Icon */}
      <Link href="/handler/sign-up">
        <FaUserCircle
          style={{ fontSize: '1.5rem', cursor: 'pointer' }}
          className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
        />
      </Link>
    </nav>
  );
};

export default NavBar;
