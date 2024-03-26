"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'


export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }


  return (
    <button
      className={`w-fit p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-50 dark:bg-slate-700`}
      onClick={() =>
        {
          setTheme(theme === "dark" ? "light" : "dark")
          document.getElementsByTagName('html')[0].setAttribute("data-theme",theme === "dark" ? "light" : "dark")
        }
      }
    >
      {theme === "light" ?
        <MoonIcon className="h-5 w-5 flex-none text-slate-800" aria-hidden="true" /> : 
        <SunIcon className="h-5 w-5 flex-none text-slate-100" aria-hidden="true" />
      }
    </button>
  );
}; 