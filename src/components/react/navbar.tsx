"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import NavLink from "./navLink";
import { motion } from "framer-motion";
import NavbarLogo, { NavbarLogoHandle } from "./NavBarLogo";
import { useDarkMode } from "./context/DarkModeContext";

const links = [
  { url: "/", title: "Home" },
  { url: "/work", title: "Work" },
  { url: "/about", title: "About" },
  { url: "/contact", title: "Contact" },
];

interface NavbarProps {
  is3D?: boolean;
}

const Navbar = ({ is3D = false }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const logoRef = useRef<NavbarLogoHandle>(null);

  const { isDark, toggleDarkMode, logoClickRef } = useDarkMode();

  // Sync shared animation ref for .dev blob animation
  useEffect(() => {
    if (logoRef.current?.handleLogoClick && !is3D) {
      logoClickRef.current = logoRef.current.handleLogoClick;
    }
  }, []);

  const topVariants = {
    closed: { rotate: 0 },
    opened: { rotate: 45 },
  };
  const centerVariants = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };
  const bottomVariants = {
    closed: { rotate: 0 },
    opened: { rotate: -45 },
  };
  const listVariants = {
    closed: { x: "100vw" },
    opened: {
      x: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.2 },
    },
  };
  const listItemVariants = {
    closed: { x: -10, opacity: 0 },
    opened: { x: 0, opacity: 1 },
  };

  return (
    <div
      className={`${
        is3D
          ? "px-4 sm:px-8"
          : "px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48"
      } h-full flex items-center justify-between text-xl shadow-md bg-white dark:bg-black dark:text-white`}
    >
      {/* LINKS */}
      <div className={`${is3D? "flex gap-4 w-1/3": "hidden md:flex gap-4 w-1/3"}`}>
        {links.map((link) => (
          <NavLink link={link} key={link.title} is3D={is3D} />
        ))}
      </div>

      {/* LOGO */}
      <div
        className={`${
          is3D ? "hidden" : "md:hidden lg:flex xl:w-1/3 xl:justify-center"
        }`}
      >
        <NavbarLogo ref={logoRef} />
      </div>

      {/* SOCIAL + THEME TOGGLE */}
      <div className={`${is3D? "flex gap-4 w-1/3 items-center justify-center": "hidden md:flex gap-4 w-1/3 md:items-center md:justify-center"}`}>
        <Link href="/">
          <Image
            src="/github.png"
            alt="GitHub"
            width={24}
            height={24}
            className="invert-0 dark:invert"
          />
        </Link>
        <Link href="/">
          <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
        </Link>
        <Link href="/">
          <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
        </Link>
        <Link href="/">
          <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 px-2 py-1 text-sm border rounded-md border-gray-400 dark:border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {/* RESPONSIVE MENU */}
      <div className={`${
          is3D ? "hidden": "md:hidden"}`}>
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black dark:bg-white rounded origin-left"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black dark:bg-white rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black dark:bg-white rounded origin-left"
          ></motion.div>
        </button>

        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="absolute top-0 left-0 w-screen h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center gap-8 text-4xl z-40"
          >
            {links.map((link) => (
              <motion.div variants={listItemVariants} key={link.title}>
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
            <motion.button
              variants={listItemVariants}
              onClick={toggleDarkMode}
              className="text-lg px-4 py-2 rounded bg-white text-black dark:bg-black dark:text-white border border-gray-400 dark:border-gray-300"
            >
              {isDark ? "🌙 Dark" : "☀️ Light"}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;