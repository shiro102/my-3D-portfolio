"use client";

import HeroIntro from "@/components/react/sections/HeroIntro";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-50">
      <section id="hero">
        <HeroIntro />
      </section>
      {/* <section id="projects">
        <Projects />
      </section> */}
    </div>
  );
};

export default Homepage;
