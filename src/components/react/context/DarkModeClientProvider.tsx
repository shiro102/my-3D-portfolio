"use client";

import { DarkModeProvider } from "./DarkModeContext";

export default function DarkModeClientProvider({ children }: { children: React.ReactNode }) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}