"use client";
import React from "react";

export function LazyImage({ src, alt, className = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={src} alt={alt} className={className} loading="lazy" {...props} />;
}
