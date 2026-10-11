"use client";

import { useEffect, useState } from "react";

const breakpoints = [
  { name: "2xl", min: 1536 },
  { name: "xl", min: 1280 },
  { name: "lg", min: 1024 },
  { name: "md", min: 768 },
  { name: "sm", min: 640 },
] as const;

const getBreakpoint = () => {
  const w = window.innerWidth;
  return breakpoints.find((b) => w >= b.min)?.name ?? "base";
};

export default function ScreenSize() {
  const [size, setSize] = useState<string>("base");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const onResize = () => setSize(getBreakpoint());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <span
      onDoubleClick={() => setHide(true)}
      className={`fixed top-5 right-60 z-100 bg-green-400 p-3 rounded-2xl ${hide && "hidden"}`}
    >
      {size}
    </span>
  );
}
