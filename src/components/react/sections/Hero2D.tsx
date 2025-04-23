import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../navbar";

const HeroIntro2D = () => {
  return (
    <motion.div
      className="h-screen bg-gradient-to-b from-white to-blue-100 dark:from-[#212121] dark:to-[#171d2d] dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Sticky Navbar */}
      <div className="h-[70px] sticky top-0 left-0 right-0 z-40" >
        <Navbar />
      </div>
      <div className="h-[1px] bg-white z-[999] dark:bg-black" />

      {/* Main Content */}
      <div className="h-[calc(100vh-70px)] flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* IMAGE CONTAINER */}
        <div className="h-[45%] lg:h-full lg:w-1/2 relative [@media(max-height:700px)_and_(max-width:40rem)]:h-1/4 [@media(max-height:800px)_and_(max-width:40rem)_and_(min-height:701rem)]:h-1/3">
          <Image
            src="/hero.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* TEXT CONTAINER */}
        <div className="h-[55%] lg:h-full lg:w-1/2 flex flex-col gap-4 md:gap-6 lg:gap-8 items-center justify-center pt-1 [@media(max-height:700px)_and_(max-width:40rem)]:h-3/4 [@media(max-height:800px)_and_(max-width:40rem)_and_(min-height:701rem)]:h-2/3">
          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] lg:leading-[1]">
            Crafting Digital Experiences, Designing Tomorrow.
          </h1>
          {/* DESC */}
          <p className="md:text-xl">
            Welcome to my digital canvas, where innovation and creativity
            converge. With a keen eye for aesthetics and a mastery of code, my
            portfolio showcases a diverse collection of projects that reflect my
            commitment to excellence.
          </p>
          {/* BUTTONS */}
          <div className="w-full flex gap-4">
            <Link href="#work">
              <button className="p-4 rounded-lg ring-1 ring-black bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-slate-300">
                View My Work
              </button>
            </Link>
            <Link href="/about">
              <button className="p-4 rounded-lg ring-1 ring-black dark:ring-white hover:bg-slate-300 dark:hover:bg-slate-700">
                About Me
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroIntro2D;
