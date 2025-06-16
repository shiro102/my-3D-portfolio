"use client";

import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Link from "next/link";
import Navbar from "../navbar";
// import { useTranslation } from "react-i18next";

const HeroIntro2D = ({ locale }: { locale: string }) => {
  // const { t } = useTranslation("");

  // const buttonBaseStyles = "p-4 rounded-lg ring-1";
  // const primaryButtonStyles = `${buttonBaseStyles} ring-black bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-slate-300`;
  // const secondaryButtonStyles = `${buttonBaseStyles} ring-black dark:ring-white hover:bg-slate-300 dark:hover:bg-slate-700`;

  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 1 }}
    // >
    <div className="h-[100px] bg-blue-100 dark:bg-[#221c1c]">
      {/* Sticky Navbar */}
      <div className="h-[70px] sticky top-0 left-0 right-0 z-40">
        <Navbar locale={locale} />
      </div>

      {/* Main Content */}

      {/* <div className="h-[calc(100vh-70px)] flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">

        <div className="h-[45%] lg:h-full lg:w-1/2 relative [@media(max-height:700px)_and_(max-width:40rem)]:h-1/4 [@media(max-height:800px)_and_(max-width:40rem)_and_(min-height:701px)]:h-1/3">
          <Image
            src="https://drive.google.com/thumbnail?id=17R13H65ccXJ6U4POHungzxX_YlL_TNgs&sz=w2000"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="h-[55%] lg:h-full lg:w-1/2 flex flex-col gap-4 md:gap-6 lg:gap-8 items-center justify-center pt-1 [@media(max-height:700px)_and_(max-width:40rem)]:h-3/4 [@media(max-height:800px)_and_(max-width:40rem)_and_(min-height:701px)]:h-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] lg:leading-[1] font-[--font-tai-heritage-pro]">
            {t("hero2D-header")}
          </h1>
          <p className="md:text-xl font-[--font-tai-heritage-pro]">{t("hero2D-description")} </p>
          <div className="w-full flex gap-4">
            <Link href="#work">
              <button className={primaryButtonStyles}>
                {t("hero2D-viewwork")}
              </button>
            </Link>
            <Link href="/about">
              <button className={secondaryButtonStyles}>
                {t("hero2D-aboutme")}
              </button>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
    // </motion.div>
  );
};

export default HeroIntro2D;
