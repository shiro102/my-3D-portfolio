import React from "react";
import { Globe } from "lucide-react";
import LanguageChanger from "@/lib/translator/LanguageChanger";
import { useDarkMode } from "./context/DarkModeContext";

const Header = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-end bg-[#323335] dark:bg-white py-1">
      {/* LanguageChanger: Top-Right Corner */}
      <div className="relative flex items-center gap-4 justify-center">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="px-2 py-1 text-sm border rounded-md border-gray-400 dark:border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* LanguageChanger: Bottom-Right Corner */}
        <div className="flex items-center px-2 py-1.5 border border-black dark:border-white rounded-full text-sm font-medium bg-white dark:bg-black text-black dark:text-white">
          <Globe className="h-4 w-4" />
          <LanguageChanger />
        </div>
      </div>
    </div>
  );
};

export default Header;
