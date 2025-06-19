export interface Project {
  title: string;
  shortTitle: string;
  desc: string;
  subdesc: string;
  href: string;
  logo: string;
  logoStyle: {
    backgroundColor: string;
    border: string;
    boxShadow: string;
    background?: string;
  };
  projectType: "Web/Fullstack Development" | "Backend Development" | "Machine Learning";
  spotlight: string;
  tags: {
    id: number;
    name: string;
    path: string;
    url: string;
  }[];
  images: string[];
  imageDescriptions?: string[];
}

export const myProjects: Project[] = [
  {
    title: "project1-title",
    shortTitle: "Viet Vibe Web",
    desc: "project1-desc",
    subdesc: "project1-subdesc",
    href: "https://www.vietvibe.org",
    logo: "/assets/project-VVF.png",
    projectType: "Web/Fullstack Development",
    logoStyle: {
      backgroundColor: "transparent",
      border: "0.2px solid transparent",
      boxShadow: "0px 0px 10px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight2.png",
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
      "https://drive.google.com/thumbnail?id=1FnuM2P5A4iVxwZ9DMOI-DQoXdP44OZ_9&sz=w3000",
      "https://drive.google.com/thumbnail?id=1_Hta1UcGoU0-4NuY98bgxUUtZaZIA14u&sz=w1000",
      "https://drive.google.com/thumbnail?id=1zkXmIpmQMhIVmJ5gJ3zx0Altj2zVJKfx&sz=w2000",
      "https://drive.google.com/thumbnail?id=1bnAuesMb0sKMktS4txoTsZSHQfGVIWvF&sz=w2000",
    ],
    imageDescriptions: [
      "project1-imageDescription1",
      "project1-imageDescription2",
      "project1-imageDescription3",
      "project1-imageDescription4",
    ],
  },
  {
    title: "project2-title",
    shortTitle: "3D Worlds",
    desc: "project2-desc",
    subdesc: "project2-subdesc",
    href: "https://github.com/shiro102/my-3D-portfolio",
    logo: "/assets/3DW.jpeg",
    projectType: "Web/Fullstack Development",
    logoStyle: {
      backgroundColor: "#transparent",
      border: "0px solid transparent",
      boxShadow: "0px 0px 60px 0px #2F67B64D",
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
      "https://drive.google.com/thumbnail?id=12KOo5Z1he9zahibu_kdjA7SigU7I6D4D&sz=w2000",
      "https://drive.google.com/thumbnail?id=1nzNRwx31d0DBkIU00Mx_32j3zHB7sg7w&sz=w2000",
      "https://drive.google.com/thumbnail?id=1bmXcPQJA-LhfUeHI1ei6ctSg4Zp__7sL&sz=w2000",
      "https://drive.google.com/thumbnail?id=1ZFwVuZPkz3jbzfUhLxqt_D1JcU-ipN4V&sz=w2000",
    ],
    imageDescriptions: [
      "project2-imageDescription1",
      "project2-imageDescription4",
      "project2-imageDescription5",
      "project2-imageDescription3",
    ],
  },
  {
    title: "project3-title",
    shortTitle: "Yoga Pose Classification",
    desc: "project3-desc",
    subdesc: "project3-subdesc",
    href: "https://yoga-pose-classification-e8kg76w54mzxlgzkb8z3jb.streamlit.app/",
    logo: "/assets/project-logo3.png",
    projectType: "Machine Learning",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    spotlight: "/assets/spotlight5.png",
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
    imageDescriptions: [
      "project3-imageDescription1",
      "project3-imageDescription2",
      "project3-imageDescription3",
      "project3-imageDescription4",
    ],
  },
  {
    title: "project5-title",
    shortTitle: "Automated Summary Bot",
    desc: "project5-desc",
    subdesc: "project5-subdesc",
    href: "https://github.com/shiro102/automated-summary-bot",
    logo: "/assets/project-automatedChatbot.png",
    projectType: "Backend Development",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 1,
        name: "JavaScript",
        path: "/assets/javascript.png",
        url: "https://www.javascript.com/",
      },
      {
        id: 2,
        name: "Cloudflare Workers",
        path: "/assets/cloudflare-worker.png",
        url: "https://workers.cloudflare.com/",
      },
      {
        id: 3,
        name: "NodeJS",
        path: "/assets/nodejs.png",
        url: "https://nodejs.org/",
      },
      {
        id: 4,
        name: "ChatGPT",
        path: "/assets/chatgpt.png",
        url: "https://chatgpt.com/",
      },
    ],
    images: [
      "https://drive.google.com/thumbnail?id=1NNBKHBXXipsGp0O78dFGE5I52wvi1b3X&sz=w2000",
    ],
    imageDescriptions: [
      "project5-imageDescription1",
    ],
  },
  {
    title: "project6-title",
    shortTitle: "My Duc Dental",
    desc: "project6-desc",
    subdesc: "project6-subdesc",
    href: "https://nhakhoamyduc.vn/",
    logo: "/assets/myduclogo.jpg",
    projectType: "Web/Fullstack Development",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0px solid #17293E",
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
        name: "AWS Amplify",
        path: "/assets/aws-amplify.png",
        url: "https://aws.amazon.com/amplify/",
      },
      {
        id: 3,
        name: "ExpressJS",
        path: "https://img.icons8.com/ios/50/express-js.png",
        url: "https://expressjs.com/",
      },
      {
        id: 4,
        name: "NodeJS",
        path: "/assets/nodejs.png",
        url: "https://nodejs.org/",
      },
    ],
    images: [
      "https://drive.google.com/thumbnail?id=1bm2cJBRrYRHltcdDpmEsAdAwGqN5wWP7&sz=w2000",
      "https://drive.google.com/thumbnail?id=1917WZiL6sMhR5d1wXbp6codoGM5AEWVW&sz=w2000",
    ],
    imageDescriptions: [
      "project6-imageDescription1",
      "project6-imageDescription2",
    ],
  },
  {
    title: "project7-title",
    shortTitle: "My Duc Dental Backend",
    desc: "project7-desc",
    subdesc: "project7-subdesc",
    href: "https://github.com/shiro102/nhakhoamyduc",
    logo: "/assets/myduclogo.jpg",
    projectType: "Backend Development",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 1,
        name: "Render",
        path: "/assets/render.jpg",
        url: "https://render.com/",
      },
      {
        id: 2,
        name: "ExpressJS",
        path: "https://img.icons8.com/ios/50/express-js.png",
        url: "https://expressjs.com/",
      },
      {
        id: 3,
        name: "NodeJS",
        path: "/assets/nodejs.png",
        url: "https://nodejs.org/",
      },
    ],
    images: [
      "https://drive.google.com/thumbnail?id=1917WZiL6sMhR5d1wXbp6codoGM5AEWVW&sz=w2000",
    ],
    imageDescriptions: [
      "project7-imageDescription1",
    ],
  },
  {
    title: "project4-title",
    shortTitle: "NCRAs",
    desc: "project4-desc",
    subdesc: "project4-subdesc",
    href: "https://ncra.ca/",
    logo: "/assets/project-ncra.gif",
    projectType: "Web/Fullstack Development",
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
    imageDescriptions: [
      "project4-imageDescription1",
      "project4-imageDescription2",
    ],
  },
];
