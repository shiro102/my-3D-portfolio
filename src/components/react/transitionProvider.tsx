"use client";

import { AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
// import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionProvider = ({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathName} className="w-full min-h-screen relative min-w-full">
        {/* <motion.div
          className="h-screen w-screen fixed bg-black rounded-b-[100px] z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-8xl cursor-default z-50 w-fit h-fit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {pathName.substring(1)}
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        /> */}
        {/* {pathName !== `/${locale}` && (
          <div className="w-full">
            <Header />
          </div>
        )} */}

        {/* navbar to stick to the main div */}
        {pathName !== `/${locale}` && (
          <div className="h-[70px] sticky top-0 left-0 right-0 z-50">
            <Navbar locale={locale} />
          </div>
        )}

        <div>{children}</div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
