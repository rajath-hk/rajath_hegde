"use client";
import React from "react";

export function SvgIcon({ src, alt, className = "w-6 h-6" }: { src: string; alt: string; className?: string }) {
  return (
    <img src={src} alt={alt} className={className} loading="lazy" aria-hidden="true" />
  );
}
