"use client";

import { Button } from "@/components/shared/Button";
import { useTheme } from "next-themes";
import { isThemeName } from "@/lib/theme";
import { BiMoon, BiSun } from "react-icons/bi";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = isThemeName(resolvedTheme) ? resolvedTheme : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  return (
    <Button
      type="button"
      onClick={() => setTheme(nextTheme)}
      variant="secondary"
      size="icon"
      radius="lg"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <span aria-hidden="true" className="text-lg leading-none">
        {currentTheme === "dark" ? <BiSun /> : <BiMoon />}
      </span>
    </Button>
  );
}
