"use client";
import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only absolute top-2 left-2 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
}
