"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Screenshot({
  srcLight,
  srcDark,
  alt,
  width,
  height,
  className,
}) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const theme = document?.documentElement.getAttribute("data-theme");
    if (theme) {
      setSrc(theme === "light" ? srcLight : srcDark || srcLight);
    } else {
      setSrc(srcLight);
    }

    // event listener to detect theme changes
    const handleThemeChange = (e) => {
      const newTheme = e.matches ? "light" : "dark";
      setSrc(newTheme === "light" ? srcLight : srcDark || srcLight);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };

  }, [srcLight, srcDark]);

  if (!src) {
    return (
      <div
        style={{ width, height }}
        className={cn("bg-muted", className)}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      // width={width}
      // height={height}
      className={className}
    />
  );
}
