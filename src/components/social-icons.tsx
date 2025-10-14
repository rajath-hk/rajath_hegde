"use client";
import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/rajath-hk", icon: <Github />, label: "GitHub", color: "hover:text-black dark:hover:text-white" },
  { href: "https://linkedin.com/in/rajath-hk", icon: <Linkedin />, label: "LinkedIn", color: "hover:text-blue-600" },
  { href: "https://twitter.com/rajath_hk", icon: <Twitter />, label: "Twitter", color: "hover:text-blue-400" },
  { href: "mailto:rajath@example.com", icon: <Mail />, label: "Email", color: "hover:text-red-500" },
];

export function SocialIcons() {
  return (
    <div className="flex gap-4">
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={`text-foreground/70 ${s.color} transition-all duration-300 group`}
        >
          <span className="inline-block group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300 transform-gpu">
            {s.icon}
          </span>
        </a>
      ))}
    </div>
  );
}