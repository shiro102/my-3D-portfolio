"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";

interface DarkModeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  logoClickRef: React.RefObject<((futureDark: boolean) => void) | null>;
  secondaryLogoClickRef: React.RefObject<
    ((futureDark: boolean) => void) | null
  >;
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDark, setIsDark] = useState(true);
  const logoClickRef = useRef<((futureDark: boolean) => void) | null>(null);
  const secondaryLogoClickRef = useRef<((futureDark: boolean) => void) | null>(
    null
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const nextTheme = !document.documentElement.classList.contains("dark");
    console.log(logoClickRef.current);
    // First, play the animation via ref
    logoClickRef.current?.(nextTheme);
    secondaryLogoClickRef.current?.(nextTheme);

    // Then delay the actual theme change until the animation finishes (e.g. 600ms)
    setTimeout(() => {
      const enableDark = !document.documentElement.classList.contains("dark");

      if (enableDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      setIsDark(enableDark);
    }, 600); // match this with your animation duration
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode, logoClickRef, secondaryLogoClickRef }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used inside DarkModeProvider");
  return context;
};
