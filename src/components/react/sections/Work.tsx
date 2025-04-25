"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface WorksProps {
  is3D?: boolean;
}

const Works = ({ is3D = false }: WorksProps) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { t } = useTranslation("");

  const myProjects = [
    {
      title: "project1-title",
      desc: "project1-desc",
      subdesc: "project1-subdesc",
      href: "https://www.vietvibe.org",
      logo: "/assets/project-VVF.png",
      logoStyle: {
        backgroundColor: "transparent",
        border: "0.2px solid transparent",
        boxShadow: "0px 0px 10px 0px #AA3C304D",
      },
      spotlight: "/assets/spotlight1.png",
      tags: [
        {
          id: 1,
          name: "Next.js",
          path: "/assets/nextjs.png",
          url: "https://nextjs.org/",
        },
        {
          id: 2,
          name: "TailwindCSS",
          path: "/assets/tailwindcss.png",
          url: "https://tailwindcss.com/",
        },
        {
          id: 3,
          name: "TypeScript",
          path: "/assets/typescript.png",
          url: "https://www.typescriptlang.org/",
        },
        {
          id: 4,
          name: "Framer Motion",
          path: "/assets/framer.png",
          url: "https://www.framer.com/motion/",
        },
        {
          id: 5,
          name: "Prisma",
          path: "/assets/prisma.png",
          url: "https://www.prisma.io/",
        },
        {
          id: 6,
          name: "Stripe",
          path: "/assets/stripe.png",
          url: "https://stripe.com/",
        },
      ],
      images: [
        is3D
          ? "https://drive.google.com/thumbnail?id=1-bCTpz-cDtDDofBBgUvPhRaUIcnroxJt&sz=w2000"
          : "https://drive.google.com/thumbnail?id=1FnuM2P5A4iVxwZ9DMOI-DQoXdP44OZ_9&sz=w3000",
        "https://drive.google.com/thumbnail?id=1joLQ1KQJXUX5Ku2af_QH7hzGOvGzdUut&sz=w1000",
        "https://drive.google.com/thumbnail?id=1_Hta1UcGoU0-4NuY98bgxUUtZaZIA14u&sz=w1000",
        "https://drive.google.com/thumbnail?id=16XAcVNqxotko0u5vP3TlRiA5WvreKrej&sz=w2000",
      ],
    },
    {
      title: "project2-title",
      desc: "project2-desc",
      subdesc: "project2-subdesc",
      href: "https://github.com/shiro102/my-3D-portfolio",
      logo: "/assets/3DW.jpeg",
      logoStyle: {
        backgroundColor: "#transparent",
        border: "0.2px solid transparent",
        boxShadow: "0px 0px 60px 0px #2F67B64D",
      },
      spotlight: "/assets/spotlight4.png",
      tags: [
        {
          id: 1,
          name: "React.js",
          path: "/assets/react.svg",
          url: "https://reactjs.org/",
        },
        {
          id: 2,
          name: "TailwindCSS",
          path: "/assets/tailwindcss.png",
          url: "https://tailwindcss.com/",
        },
        {
          id: 3,
          name: "Three.js",
          path: "/assets/threejs.svg",
          url: "https://threejs.org/",
        },
        {
          id: 4,
          name: "Framer Motion",
          path: "/assets/framer.png",
          url: "https://www.framer.com/motion/",
        },
        {
          id: 5,
          name: "Blender",
          path: "/assets/blender.png",
          url: "https://www.blender.org/",
        },
      ],
      images: [
        "https://drive.google.com/thumbnail?id=1nzNRwx31d0DBkIU00Mx_32j3zHB7sg7w&sz=w2000",
        "https://drive.google.com/thumbnail?id=1bb6FjHgkaq-kPFqRhA0zHxs7mERsqeYb&sz=w2000",
        "https://drive.google.com/thumbnail?id=1ZFwVuZPkz3jbzfUhLxqt_D1JcU-ipN4V&sz=w2000",
      ],
    },
    {
      title: "project3-title",
      desc: "project3-desc",
      subdesc: "project3-subdesc",
      href: "https://yoga-pose-classification-e8kg76w54mzxlgzkb8z3jb.streamlit.app/",
      logo: "/assets/project-logo3.png",
      logoStyle: {
        backgroundColor: "#60f5a1",
        background:
          "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
        border: "0.2px solid rgba(208, 213, 221, 1)",
        boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
      },
      spotlight: "/assets/spotlight3.png",
      tags: [
        {
          id: 1,
          name: "Python",
          path: "/assets/python.svg",
          url: "https://www.python.org/",
        },
        {
          id: 2,
          name: "TensorFlow",
          path: "/assets/tensorflow.png",
          url: "https://www.tensorflow.org/",
        },
        {
          id: 3,
          name: "OpenPose",
          path: "/assets/openpose.png",
          url: "https://github.com/CMU-Perceptual-Computing-Lab/openpose",
        },
        {
          id: 4,
          name: "OpenCV",
          path: "/assets/opencv.svg",
          url: "https://opencv.org/",
        },
      ],
      images: [
        "https://drive.google.com/thumbnail?id=1nZOYdbbxH7nTJQ1qGPmoRvutDyfgtfON&sz=w2000",
        "https://drive.google.com/thumbnail?id=1SmO4jVUoOja9x6YKZLZ8biw_b8Yth6IW&sz=w2000",
        "https://drive.google.com/thumbnail?id=1vPAuyoPigeFyiL_nCUPbiQNG0rRohrWi&sz=w2000",
        "https://drive.google.com/thumbnail?id=1ai5KRHdA3JRiHjryYSQ9EdLXrc96TXaC&sz=w2000",
      ],
    },
    {
      title: "project4-title",
      desc: "project4-desc",
      subdesc: "project4-subdesc",
      href: "https://ncra.ca/",
      logo: "/assets/project-ncra.gif",
      logoStyle: {
        backgroundColor: "#13202F",
        border: "0.2px solid #17293E",
        boxShadow: "0px 0px 60px 0px #2F6DB54D",
      },
      spotlight: "/assets/spotlight2.png",
      tags: [
        {
          id: 1,
          name: "React.js",
          path: "/assets/react.svg",
          url: "https://reactjs.org/",
        },
        {
          id: 2,
          name: "NodeJS",
          path: "/assets/nodejs.png",
          url: "https://nodejs.org/",
        },
        {
          id: 3,
          name: "ExpressJS",
          path: "https://img.icons8.com/ios/50/express-js.png",
          url: "https://expressjs.com/",
        },
        {
          id: 4,
          name: "PassportJS",
          path: "/assets/passportjs.svg",
          url: "https://expressjs.com/",
        },
      ],
      images: [
        "https://drive.google.com/thumbnail?id=1Xd0i1Clc8INyPknOGWUmyqE2hCwVjnnD&sz=w2000",
        "https://drive.google.com/thumbnail?id=1TBpKt8ksUtgvuwpmxRqkXbq3f68S1wFE&sz=w2000",
      ],
    },
  ];

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

  const currentProject = myProjects[selectedProjectIndex];
  const projectCount = myProjects.length;

  // Handle project navigation
  const handleNavigation = (direction: string) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  // Handle carousel navigation
  const handleCarouselNav = (dir: string) => {
    const imgs = currentProject.images;
    setCarouselIndex((prev) =>
      dir === "next"
        ? (prev + 1) % imgs.length
        : (prev - 1 + imgs.length) % imgs.length
    );
  };

  return (
    <section
      className={`${is3D ? "pl-5 pr-10" : "px-5 sm:px-10"} bg-gradient-to-b from-white via-blue-100 to-red-50 pt-20 pb-20 w-full dark:from-[#212121] dark:via-[#171d2d] dark:to-[#040211] dark:text-white`}
    >
      <p
        className={`${is3D ? "text-4xl" : "text-3xl sm:text-4xl"} font-semibold bg-gradient-to-r from-[#353639] via-[#47474c] to-[#47474c] bg-clip-text text-transparent 
    dark:from-[#d2d3d4] dark:via-[#f0f0f0] dark:to-[#c8c8c8] font-[--font-tai-heritage-pro]`}
      >
        {t("work-header")}
      </p>

      <div
        className={`${is3D ? "grid grid-cols-1" : "grid grid-cols-1 lg:grid-cols-2"} mt-12 gap-5 w-full`}
      >
        {/* Project Description */}
        <div
          className={`${is3D ? "py-10 px-5" : "py-10 px-5 sm:p-10"} flex flex-col gap-5 relative shadow-2xl shadow-black-200 bg-white dark:bg-[#111112] min-h-[calc(80vh-40px)] justify-between`}
        >
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl filter brightness-110 contrast-125 saturate-150 
             dark:brightness-100 dark:contrast-110 dark:saturate-130"
            />
          </div>

          <div
            className="backdrop-filter backdrop-blur-3xl w-fit rounded-md"
            style={currentProject.logoStyle}
          >
            <img
              className="w-15 h-15 shadow-sm"
              src={currentProject.logo}
              alt="logo"
            />
          </div>

          <div className="flex flex-col gap-5 text-neutral-700 dark:text-neutral-300 my-5 min-h-[30vh]">
            <p
              className={`${is3D ? "text-3xl" : "text-2xl"} font-semibold animatedText text-black dark:text-white font-[--font-tai-heritage-pro]`}
            >
              {t(currentProject.title)}
            </p>

            <p className={`${is3D ? "text-xl" : ""} animatedText`}>
              {t(currentProject.desc)}
            </p>
            <p className={`${is3D ? "text-xl" : ""} animatedText`}>
              {t(currentProject.subdesc)}
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
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
              <p className={`${is3D ? "text-xl" : ""}`}>
                {t("work-checksite")}
              </p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
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
          className={`${is3D ? "h-96" : "h-96 md:h-full"} relative bg-neutral-200 dark:bg-[#0e0e0e] rounded-lg overflow-hidden flex items-center justify-center shadow-2xl shadow-black-200`}
        >
          <Image
            src={currentProject.images[carouselIndex]}
            alt="carousel"
            fill
            className="object-contain rounded-lg"
          />

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
