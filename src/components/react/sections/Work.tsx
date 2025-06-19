"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { myProjects } from "@/data/projects";
import AnimatedButton from "@/components/3D/components/AnimatedButton";
import { useDarkMode } from "@/components/react/context/DarkModeContext";

interface WorksProps {
  is3D?: boolean;
  hasScrolled?: boolean;
}

const colorMappingType = {
  "Web/Fullstack Development": {
    light: "#90caf9",
    medium: "#42a5f5",
    dark: "#1976d2",
    darker: "#1565c0",
  },
  "Backend Development": {
    light: "#80deea", // Light Cyan/Teal
    medium: "#26c6da", // Cyan/Teal
    dark: "#00838f", // Dark Cyan/Teal
    darker: "#00838f",
  },
  "Machine Learning": {
    light: "#f3e5f5",    // Lilac Mist
    medium: "#ce93d8",   // Soft Lavender
    dark: "#ba68c8",     // Muted Orchid
    darker: "#ab47bc",
  },
};

const Works = ({ is3D = false, hasScrolled = false }: WorksProps) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { t } = useTranslation("");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string>(
    "Web/Fullstack Development"
  );
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [initialAnimation, setInitialAnimation] = useState(true);
  const { isDark } = useDarkMode();

  // Ref and state for dynamic height
  const descRef = useRef<HTMLDivElement>(null);
  const [descHeight, setDescHeight] = useState<number | undefined>(undefined);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const currentProject = myProjects[selectedProjectIndex];
  // const projectCount = myProjects.length;

  // Get unique project types
  const projectTypes: string[] = [
    "Web/Fullstack Development",
    "Backend Development",
    "Machine Learning",
  ];

  // Get projects of selected type
  const projectsOfSelectedType = myProjects.filter(
    (project) => project.projectType === selectedProjectType
  );

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

  // Set selectedProjectIndex to the first project of the default type on mount
  useEffect(() => {
    const firstIndex = myProjects.findIndex(
      (p) => p.projectType === selectedProjectType
    );
    if (firstIndex !== -1) {
      setSelectedProjectIndex(firstIndex);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setInitialAnimation(false), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (descRef.current) {
      setDescHeight(descRef.current.offsetHeight);
    }
  }, [selectedProjectIndex, selectedProjectType, currentProject, is3D]);

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle project navigation
  // const handleNavigation = (direction: string) => {
  //   setSelectedProjectIndex((prevIndex) =>
  //     direction === "previous"
  //       ? prevIndex === 0
  //         ? projectCount - 1
  //         : prevIndex - 1
  //       : prevIndex === projectCount - 1
  //         ? 0
  //         : prevIndex + 1
  //   );
  // };

  // Handle carousel navigation
  const handleCarouselNav = (dir: string) => {
    setCarouselIndex((prev) =>
      dir === "next"
        ? (prev + 1) % currentProject.images.length
        : (prev - 1 + currentProject.images.length) %
          currentProject.images.length
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
  const descClasses = `${is3D ? "py-10 px-5" : "py-10 px-5 sm:p-10"} flex flex-col gap-5 relative shadow-2xl shadow-black-200 bg-white dark:bg-[#111112] justify-between md:min-h-[700px]`;
  const titleClasses = `${is3D ? "text-3xl" : "text-2xl"} font-semibold animatedText text-black dark:text-white font-[--font-tai-heritage-pro]`;
  const textClasses = `${is3D ? "text-xl" : ""} animatedText`;
  const carouselClasses = `${is3D ? "h-96" : "h-96 md:h-full"} relative bg-black dark:bg-[#0e0e0e] rounded-lg overflow-hidden flex items-center justify-center shadow-2xl shadow-black-200  max-h-[110vh]`;

  return (
    <section
      className={sectionClasses}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Animated background for the whole section */}
      {/* <span className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60">
        <AnimatedButton />
      </span> */}
      {/* Header */}
      <p className={headerClasses}>{t("work-header")}</p>

      {/* Project Type Tabs */}
      <div
        className={`flex flex-col md:flex-row items-center justify-center md:items-stretch md:justify-start gap-y-4 md:gap-y-0 ${is3D ? "md:gap-x-6" : "md:gap-x-12"} md:-mt-8 py-8 md:py-16 w-full md:w-[120%] md:-ml-10 md:pl-10 md:-mb-6`}
      >
        {projectTypes.map((type) => {
          const count = myProjects.filter(
            (p) => p.projectType.toLowerCase() === type.toLowerCase()
          ).length;
          const isActive =
            selectedProjectType.toLowerCase() === type.toLowerCase();
          const colorMap =
            colorMappingType[type as keyof typeof colorMappingType] ||
            colorMappingType["Web/Fullstack Development"];
          const tabBgColor = isDark
            ? isActive
              ? colorMap.medium
              : colorMap.dark
            : isActive
              ? colorMap.light
              : colorMap.medium;
          return (
            <button
              key={type}
              onClick={() => {
                setSelectedProjectType(type);
                setSelectedProjectIndex(
                  myProjects.findIndex(
                    (p) => p.projectType.toLowerCase() === type.toLowerCase()
                  )
                );
              }}
              onMouseEnter={() => setHoveredType(type)}
              onMouseLeave={() => setHoveredType(null)}
              className={`
                relative flex items-center justify-center focus:outline-none bg-transparent border-none
                ${is3D ? "w-[180px] max-w-[180px]" : "w-2/3 md:w-full max-w-[350px]"} min-w-0  ${is3D ? "h-10 md:h-12" : "h-14 md:min-h-[56px]"}
                transition-all duration-300 rounded-xl
                ${isActive || hoveredType === type ? "scale-105 z-10" : ""}
              `}
              style={{
                background: tabBgColor,
                boxShadow: isDark
                  ? isActive || hoveredType === type
                    ? `0 0 12px ${colorMap.light}, 0 0 24px ${colorMap.medium}, 0 0 48px ${colorMap.dark}`
                    : `0 0 8px ${colorMap.dark}, 0 0 16px ${colorMap.medium}, 0 0 32px ${colorMap.light}`
                  : isActive || hoveredType === type
                    ? `0 0 6px ${colorMap.medium}, 0 0 12px ${colorMap.dark}, 0 0 18px ${colorMap.light}`
                    : `0 0 2px ${colorMap.dark}, 0 0 4px ${colorMap.medium}, 0 0 8px ${colorMap.light}`,
                border:
                  isActive || hoveredType === type
                    ? `2px solid ${colorMap.medium}`
                    : `2px solid #221c1c`,
                transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
              }}
            >
              <span
                className={`
                  absolute inset-0 w-full h-full z-0 rounded-lg overflow-hidden pointer-events-none
                  transition-opacity duration-300
                  ${isActive || hoveredType === type ? "opacity-95" : "opacity-70"}
                `}
              >
                {is3D ? (
                  hasScrolled ? (
                    <AnimatedButton
                      animate={
                        initialAnimation || isActive || hoveredType === type
                      }
                      is3D={is3D}
                      color={colorMap.dark}
                    />
                  ) : (
                    <span
                      className="block w-full h-full"
                      style={{
                        background: colorMap.dark,
                        boxShadow: `0 0 24px ${colorMap.medium}, 0 0 48px ${colorMap.dark}, 0 0 96px ${colorMap.light}`,
                        borderRadius: "inherit",
                      }}
                    />
                  )
                ) : (
                  <AnimatedButton
                    animate={
                      initialAnimation || isActive || hoveredType === type
                    }
                    is3D={is3D}
                    color={colorMap.dark}
                  />
                )}
              </span>
              {/* Button content */}
              <span
                className={`
                  relative z-10 flex items-center justify-center ${is3D ? "px-1" : "px-3 lg:px-6"} py-3 gap-2 uppercase tracking-wider font-bold transition-colors cursor-pointer
                  text-white w-full ${is3D ? "text-xs md:text-xs" : "text-xs md:text-sm"}
                `}
              >
                {is3D
                  ? type.replace(" Development", "").replace(" Development", "")
                  : type}
                <span className="ml-2 text-xs text-[#90caf9] font-normal">
                  [{count}]
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Project Name Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto p-1">
        {projectsOfSelectedType.map((project, index) => {
          const isActive = selectedProjectIndex === myProjects.indexOf(project);
          const colorMap = colorMappingType[selectedProjectType as keyof typeof colorMappingType] || colorMappingType["Web/Fullstack Development"];
          const tabBorder = `2px solid ${isActive ? colorMap.medium : colorMap.light}`;
          return (
            <button
              id={`project-${index}`}
              key={project.title}
              onClick={() =>
                setSelectedProjectIndex(myProjects.indexOf(project))
              }
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all whitespace-nowrap border focus:outline-none
                bg-white dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800/60 hover:text-blue-700 dark:hover:text-blue-200
                ${isActive ? "shadow-sm" : ""}
                hover:scale-[1.04] active:scale-100`}
              style={{
                border: tabBorder,
                background: isActive ? colorMap.darker : undefined,
                color: isActive ? '#fff' : undefined,
                boxShadow: isActive
                  ? "0 2px 8px 0 rgba(33, 76, 217, 0.06)"
                  : undefined,
              }}
            >
              {t(project.shortTitle)}
            </button>
          );
        })}
      </div>

      <div className={gridClasses}>
        {/* Project Description */}
        <div className={descClasses} ref={descRef}>
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
              <Image
                src="/assets/arrow-up.png"
                alt="arrow"
                width={12}
                height={12}
                className="w-3 h-3"
              />
            </a>
          </div>
        </div>

        {/* Image Carousel */}
        <div
          className={carouselClasses}
          style={{ height: !is3D && windowWidth >= 768 ? descHeight : undefined }}
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
