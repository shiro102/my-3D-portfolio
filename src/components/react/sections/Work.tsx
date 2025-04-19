"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { myProjects } from "@/data/projects";

interface WorksProps {
  is3D?: boolean;
}

const projectCount = myProjects.length;

const Works = ({ is3D = false }: WorksProps) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

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
    <section className={`${is3D ? "pl-5 pr-10" : "px-5 sm:px-10"} bg-gradient-to-b from-white via-blue-100 to-red-50 pt-20 pb-20 w-full`}>
      <p className={`${is3D ? "text-4xl" : "text-3xl sm:text-4xl"} font-semibold bg-gradient-to-r from-[#353639] from-60% via-[#47474c] via-60% to-[#47474c] to-100% bg-clip-text text-transparent`}>
        My Selected Work
      </p>

      <div className={`${is3D ? "grid grid-cols-1" : "grid grid-cols-1 lg:grid-cols-2"} mt-12 gap-5 w-full`}>
        {/* Project Description */}
        <div className={`${is3D ? "py-10 px-5" : "py-10 px-5 sm:p-10"} flex flex-col gap-5 relative  shadow-2xl shadow-black-200 bg-white min-h-[calc(80vh-40px)] justify-between`}>
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProject.logoStyle}
          >
            <img
              className="w-10 h-10 shadow-sm"
              src={currentProject.logo}
              alt="logo"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5 min-h-[30vh]">
            <p className={`${is3D ? "text-3xl" : "text-2xl"} text-black text-2xl font-semibold animatedText`}>
              {currentProject.title}
            </p>

            <p className={`${is3D ? "text-xl" : ""} animatedText `}>{currentProject.desc}</p>
            <p className={`${is3D ? "text-xl" : ""} animatedText `}>{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p className={`${is3D ? "text-xl" : ""} hover:text-slate-600`}>Check Live Site</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              className="w-10 h-10 flex items-center justify-center p-2 cursor-pointer active:scale-95 transition-all rounded-full text-black hover:text-slate-700"
              onClick={() => handleNavigation("previous")}
            >
              <ArrowLeft />
            </button>

            <button
              className="w-10 h-10 flex items-center justify-center p-2 cursor-pointer active:scale-95 transition-all rounded-full text-black hover:text-slate-700"
              onClick={() => handleNavigation("next")}
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Image Carousel */}
        <div className={`${is3D ? "h-96" : "h-96 md:h-full"} relative bg-black-200 rounded-lg overflow-hidden flex items-center justify-center shadow-2xl shadow-black-200`}>
          <img
            src={currentProject.images[carouselIndex]}
            alt="carousel"
            className="object-cover h-full w-full rounded-lg"
          />

          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white cursor-pointer active:scale-95 transition-all"
            onClick={() => handleCarouselNav("prev")}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white cursor-pointer active:scale-95 transition-all"
            onClick={() => handleCarouselNav("next")}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Works;
