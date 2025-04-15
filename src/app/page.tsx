"use client";

import WorkRoom3D from "@/components/react/sections/WorkRoom3D";
import HeroIntro2D from "@/components/react/sections/Hero2D";

const Homepage = () => {
  return (
    <div className="min-h-screen ">
      <HeroIntro2D />
      <section id="work">
        <WorkRoom3D />
      </section>
      {/* <section id="projects">
        <Projects />
      </section> */}
    </div>
  );
};

export default Homepage;
