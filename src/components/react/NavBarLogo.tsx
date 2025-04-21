"use client";

import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { useDarkMode } from "./context/DarkModeContext";

export interface NavbarLogoHandle {
  handleLogoClick: (futureDark: boolean) => void;
}

const NavbarLogo = forwardRef<NavbarLogoHandle>((_, ref) => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [animating, setAnimating] = useState(false);
  const [blobColor, setBlobColor] = useState("#ffffff");
  const [letterColors, setLetterColors] = useState<string[]>([]);

  const devRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    handleLogoClick,
  }));

  const text = "KhaiHung".split("");

  const x = useMotionValue(0);
  const width = useMotionValue(0);
  const paddedX = useTransform(x, (v) => v - 10);
  const paddedWidth = useTransform(width, (v) => v + 6);

  // Update letters during animation
  useEffect(() => {
    if (!animating || !containerRef.current) return;

    const unsubscribe = x.on("change", (latestX) => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const blobEnd = latestX + width.get();

      const newColors = [...letterColors];

      text.forEach((_, i) => {
        const el = letterRefs.current[i];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const letterStart = rect.left - containerRect.left;
        const letterEnd = letterStart + rect.width;
        const covered = letterEnd <= blobEnd;

        if (covered) {
          newColors[i] = isDark ? "#ffffff" : "#000000";
        }
      });

      setLetterColors(newColors);
    });

    return unsubscribe;
  }, [animating, isDark, letterColors]);

  // handle click
  const handleLogoClick = (futureDark: boolean) => {
    if (!devRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const khaiFirst = letterRefs.current[0]?.getBoundingClientRect();
    const khaiLast =
      letterRefs.current[text.length - 1]?.getBoundingClientRect();
    if (!khaiFirst || !khaiLast) return;

    const blobStartX =
      devRef.current.getBoundingClientRect().right - containerRect.left - 80;
    const textStartX = khaiFirst.left - containerRect.left;
    const textEndX = khaiLast.right - containerRect.left;
    const blobWidthFinal = textEndX - textStartX;
    const animColor = futureDark ? "#ffffff" : "#000000";

    console.log(futureDark)
    setLetterColors(new Array(text.length).fill(animColor));
    setBlobColor(animColor);
    setAnimating(true);

    x.set(blobStartX);
    width.set(blobWidthFinal);

    console.log(x, textStartX)
    animate(x, textStartX, { duration: 0.5, ease: "easeInOut" });

    setTimeout(() => {
      setAnimating(false);
      setLetterColors([]);
    }, 600);
  };

  return (
    <button
      ref={containerRef}
      onClick={toggleDarkMode}
      className="relative z-0 flex items-center font-semibold px-1 py-1 rounded-md overflow-hidden text-[15px] bg-black dark:bg-white p-1 justify-center"
    >
      {animating && (
        <motion.div
          className="absolute top-1 left-2 h-8 rounded-md z-0"
          style={{
            x: paddedX,
            width: paddedWidth,
            backgroundColor: blobColor,
          }}
        />
      )}

      <span className="relative z-10 flex">
        {text.map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            style={{
              color: letterColors[index] ?? (isDark ? "#000000" : "#ffffff"),
              transition: "color 0.1s linear",
              paddingRight: char === "i" ? "4px" : "0",
            }}
          >
            {char}
          </span>
        ))}
      </span>

      <span
        ref={devRef}
        className="w-12 h-8 ml-1 relative z-10 flex items-center justify-center rounded"
        style={{
          backgroundColor: animating
            ? "transparent"
            : isDark
              ? "#000000"
              : "#ffffff",
          color: animating
            ? isDark
              ? "#000000"
              : "#ffffff"
            : isDark
              ? "#ffffff"
              : "#000000",
          backgroundClip: animating ? "text" : "unset",
          WebkitBackgroundClip: animating ? "text" : "unset",
          fontWeight: 600,
          transition: "all 0.3s ease",
        }}
      >
        .dev
      </span>
    </button>
  );
});

NavbarLogo.displayName = "NavbarLogo";
export default NavbarLogo;