"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { myProjects } from "@/data/projects";

interface WorksProps {
  is3D?: boolean;
}

const Works = ({ is3D = false }: WorksProps) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { t } = useTranslation("");
  const [isHovered, setIsHovered] = useState(false);

  const currentProject = myProjects[selectedProjectIndex];
  const projectCount = myProjects.length;

  // Track carousel
  useEffect(() => {
    setCarouselIndex(0);
  }, [selectedProjectIndex]);

  useGSAP(() => {
    gsap.fromTo(
      `.animatedText`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
    );
  }, [selectedProjectIndex]);

  // Handle project navigation
  const handleNavigation = (direction: string) => {
    setSelectedProjectIndex((prevIndex) => 
      direction === "previous" 
        ? (prevIndex === 0 ? projectCount - 1 : prevIndex - 1)
        : (prevIndex === projectCount - 1 ? 0 : prevIndex + 1)
    );
  };

  // Handle carousel navigation
  const handleCarouselNav = (dir: string) => {
    setCarouselIndex((prev) =>
      dir === "next"
        ? (prev + 1) % currentProject.images.length
        : (prev - 1 + currentProject.images.length) % currentProject.images.length
    );
  };

  // Auto scroll
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % currentProject.images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentProject, isHovered]);

  const sectionClasses = `${is3D ? "pl-5 pr-10" : "px-5 sm:px-10"} bg-gradient-to-b from-white via-blue-100 to-red-50 pt-20 pb-20 w-full dark:from-[#221c1c] dark:via-[#171d2d] dark:to-[#040211] dark:text-white`;
  const headerClasses = `${is3D ? "text-4xl" : "text-3xl sm:text-4xl"} font-semibold bg-gradient-to-r from-[#353639] via-[#47474c] to-[#47474c] bg-clip-text text-transparent dark:from-[#d2d3d4] dark:via-[#f0f0f0] dark:to-[#c8c8c8] font-[--font-tai-heritage-pro]`;
  const gridClasses = `${is3D ? "grid grid-cols-1" : "grid grid-cols-1 lg:grid-cols-2"} mt-12 gap-5 w-full`;
  const descClasses = `${is3D ? "py-10 px-5" : "py-10 px-5 sm:p-10"} flex flex-col gap-5 relative shadow-2xl shadow-black-200 bg-white dark:bg-[#111112] min-h-[calc(80vh-40px)] justify-between`;
  const titleClasses = `${is3D ? "text-3xl" : "text-2xl"} font-semibold animatedText text-black dark:text-white font-[--font-tai-heritage-pro]`;
  const textClasses = `${is3D ? "text-xl" : ""} animatedText`;
  const carouselClasses = `${is3D ? "h-96" : "h-96 md:h-full"} relative bg-black dark:bg-[#0e0e0e] rounded-lg overflow-hidden flex items-center justify-center shadow-2xl shadow-black-200  max-h-[110vh]`;

  return (
    <section className={sectionClasses}>
      <p className={headerClasses}>{t("work-header")}</p>

      <div className={gridClasses}>
        {/* Project Description */}
        <div className={descClasses}>
          <div className="absolute top-0 right-0">
            <Image
              src={currentProject.spotlight}
              alt="spotlight"
              width={500}
              height={500}
              className="w-full h-96 object-cover rounded-xl filter brightness-110 contrast-125 saturate-150 dark:brightness-100 dark:contrast-110 dark:saturate-130"
            />
          </div>

          <div
            className="backdrop-filter backdrop-blur-3xl w-fit rounded-md"
            style={currentProject.logoStyle}
          >
            <Image
              className="w-15 h-15 shadow-sm"
              src={currentProject.logo}
              alt="logo"
              width={60}
              height={60}
            />
          </div>

          <div className="flex flex-col gap-5 text-neutral-700 dark:text-neutral-300 my-5 min-h-[30vh]">
            <p className={titleClasses}>{t(currentProject.title)}</p>
            <p className={textClasses}>{t(currentProject.desc)}</p>
            <p className={textClasses}>{t(currentProject.subdesc)}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag) => (
                <div key={tag.id} className="tech-logo">
                  <Link href={tag.url}>
                    <Image
                      src={tag.path}
                      alt={tag.name}
                      width={30}
                      height={30}
                      className={`${["Next.js", "ExpressJS", "Three.js", "WebGL"].includes(tag.name) ? "invert-0 dark:invert" : ""}`}
                    />
                  </Link>
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-slate-600 dark:hover:text-white transition"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p className={textClasses}>{t("work-checksite")}</p>
              <Image src="/assets/arrow-up.png" alt="arrow" width={12} height={12} className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              className="w-10 h-10 flex items-center justify-center p-2 cursor-pointer active:scale-95 transition-all rounded-full text-black dark:text-white hover:text-slate-700 dark:hover:text-slate-300"
              onClick={() => handleNavigation("previous")}
            >
              <ArrowLeft />
            </button>

            <button
              className="w-10 h-10 flex items-center justify-center p-2 cursor-pointer active:scale-95 transition-all rounded-full text-black dark:text-white hover:text-slate-700 dark:hover:text-slate-300"
              onClick={() => handleNavigation("next")}
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Image Carousel */}
        <div
          className={carouselClasses}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={currentProject.images[carouselIndex]}
            alt="carousel"
            width={1000}
            height={1000}
            className="w-full h-full object-contain rounded-lg"
            priority
          />

          {/* Bottom bar overlay for image description */}
          <div className="pointer-events-auto absolute bottom-0 left-0 w-full bg-black/70 px-4 py-2 text-sm text-white md:text-base">
            <span className="font-semibold text-sm">
              {t(currentProject.imageDescriptions?.[carouselIndex] || "")}
            </span>
          </div>

          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/20 p-2 rounded-full hover:bg-white dark:hover:bg-black/40 cursor-pointer active:scale-95 transition-all"
            onClick={() => handleCarouselNav("prev")}
          >
            <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
          </button>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/20 p-2 rounded-full hover:bg-white dark:hover:bg-black/40 cursor-pointer active:scale-95 transition-all"
            onClick={() => handleCarouselNav("next")}
          >
            <ArrowRight className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Works;
