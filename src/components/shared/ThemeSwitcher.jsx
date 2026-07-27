"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-md bg-muted animate-pulse" />;
  }

  return (
    <div className="flex items-center space-x-1 border rounded-md p-1 bg-background">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-sm ${theme === "light" ? "bg-muted" : "hover:bg-muted/50"}`}
        aria-label="Light theme"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-sm ${theme === "dark" ? "bg-muted" : "hover:bg-muted/50"}`}
        aria-label="Dark theme"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-sm ${theme === "system" ? "bg-muted" : "hover:bg-muted/50"}`}
        aria-label="System theme"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
}
