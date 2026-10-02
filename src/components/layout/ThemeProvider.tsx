"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: ReactNode;
}

/** Persists the selected class-based theme in localStorage under the `theme` key. */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="theme">{children}</NextThemesProvider>;
}
