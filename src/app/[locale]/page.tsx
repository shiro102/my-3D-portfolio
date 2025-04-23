import WorkRoom3D from "@/components/react/sections/WorkRoom3D";
import HeroIntro2D from "@/components/react/sections/Hero2D";

const Homepage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      <section id="hero">
        <HeroIntro2D locale={locale} />
      </section>
      <section id="work" className="">
        <WorkRoom3D />
      </section>

      {/* <section id="projects">
        <Projects />
      </section> */}
    </div>
  );
};

export default Homepage;
