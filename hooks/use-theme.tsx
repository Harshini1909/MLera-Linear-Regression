"use client";

import { useCallback } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

type Theme = "light" | "dark" | "system";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="mlera-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const { theme = "dark", setTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = useCallback(() => {
    const nextTheme = (theme === "dark" ? "light" : "dark") as Theme;
    setTheme(nextTheme);
  }, [setTheme, theme]);

  return {
    theme: (theme === "system" ? resolvedTheme ?? "dark" : theme) as Exclude<Theme, "system">,
    setTheme,
    toggleTheme,
  };
};
