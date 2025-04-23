"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import NavLink from "./navLink";
import { motion } from "framer-motion";
import NavbarLogo, { NavbarLogoHandle } from "./NavBarLogo";
import { useDarkMode } from "./context/DarkModeContext";
import { Globe } from "lucide-react";
import LanguageChanger from "@/lib/translator/LanguageChanger";
import { useTranslation } from 'react-i18next'

const links = [
  { url: "/", title: "Home" },
  { url: "/work", title: "Work" },
  { url: "/about", title: "About" },
  { url: "/contact", title: "Contact" },
];

interface NavbarProps {
  is3D?: boolean;
  locale: string;
}

const Navbar = ({ is3D = false, locale }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const logoRef = useRef<NavbarLogoHandle>(null);

  const { isDark, toggleDarkMode, logoClickRef } = useDarkMode();
  const { t } = useTranslation('')

  // Sync shared animation ref for .dev blob animation
  useEffect(() => {
    if (logoRef.current?.handleLogoClick && !is3D) {
      logoClickRef.current = logoRef.current.handleLogoClick;
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // disable touch scroll on mobile
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [open]);

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
          : "pl-4 pr-1 sm:pl-8 md:pl-7 md:pr-5 lg:pl-15 lg:pr-10"
      } h-full flex items-center justify-between text-xl shadow-md bg-white dark:bg-black dark:text-white`}
    >
      {/* LINKS */}
      <div
        className={`${is3D ? "flex gap-4 w-1/3" : "hidden md:flex gap-4 w-1/3"} text-lg`}
      >
        {links.map((link) => (
          <NavLink link={link} key={link.title} is3D={is3D} locale={locale} />
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
      <div
        className={`${is3D ? "flex gap-4 w-1/3 items-center justify-center" : "hidden md:flex gap-4 w-1/6 md:items-center md:justify-center"}`}
      >
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
      </div>

      {/* LanguageChanger: Top-Right Corner */}
      {!is3D && (
        <div
          className={`hidden md:flex relative items-center md:gap-2 lg:gap-3 w-1/6 justify-center`}
        >
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="px-1 py-1 text-sm border rounded-md border-gray-400 dark:border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition min-w-[75px] whitespace-nowrap"
          >
            {isDark ? `🌙 ${t("darkmodetoggle-dark")}` : `☀️ ${t("darkmodetoggle-white")}`}
          </button>

          {/* LanguageChanger: Bottom-Right Corner */}
          <div className="flex items-center px-2 py-1 border border-gray-400 dark:border-white rounded-full text-sm font-medium bg-white dark:bg-black text-black dark:text-white">
            <Globe className="h-4 w-4" />
            <LanguageChanger />
          </div>
        </div>
      )}

      {/* RESPONSIVE MENU */}
      <div className={`${is3D ? "hidden" : "md:hidden"}`}>
        <button
          className="w-10 h-8 flex flex-col justify-between z-60 relative"
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
            className="absolute top-0 left-0 w-screen h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center gap-8 text-4xl z-50"
          >
            {links.map((link) => (
              <motion.div variants={listItemVariants} key={link.title}>
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
            <motion.button
              variants={listItemVariants}
              onClick={toggleDarkMode}
              className="text-lg px-3 py-1 rounded-full bg-white text-black dark:bg-black dark:text-white border border-gray-400 dark:border-gray-300 cursor-pointer"
            >
              {isDark ? `🌙 ${t("darkmodetoggle-dark")}` : `☀️ ${t("darkmodetoggle-white")}`}
            </motion.button>

            {/* LanguageChanger: Bottom-Right Corner */}
            <motion.div
              variants={listItemVariants}
              className="flex items-center px-2 py-1.5 border border-gray-400 dark:border-white rounded-full font-medium bg-white dark:bg-black text-black dark:text-white"
            >
              <Globe className="h-4 w-4" />
              <LanguageChanger />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
