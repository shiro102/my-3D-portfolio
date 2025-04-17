import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../navbar";

const HeroIntro2D = () => {
  return (
    <motion.div
      className="h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Sticky Navbar */}
      <div className="h-[70px] sticky top-0 left-0 right-0 z-40" >
        <Navbar />
      </div>
      <div className="h-[1px] bg-white z-[999]" />

      {/* Main Content */}
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 bg-gradient-to-b from-white to-blue-100">
        {/* IMAGE CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 relative">
          <Image
            src="/hero.png"
            alt=""
            fill
            className="object-contain max-h-[90vh]"
            priority
          />
        </div>
        {/* TEXT CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-8 items-center justify-center">
          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-bold">
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
              <button className="p-4 rounded-lg ring-1 ring-black bg-black text-white">
                View My Work
              </button>
            </Link>
            <Link href="/about">
              <button className="p-4 rounded-lg ring-1 ring-black">
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
