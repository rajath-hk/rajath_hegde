"use client";
import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/rajath-hk", icon: <Github />, label: "GitHub" },
  { href: "https://linkedin.com/in/rajath-hk", icon: <Linkedin />, label: "LinkedIn" },
  { href: "https://twitter.com/rajath_hk", icon: <Twitter />, label: "Twitter" },
  { href: "mailto:rajath@example.com", icon: <Mail />, label: "Email" },
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
          className="text-foreground/70 hover:text-primary transition-colors duration-200 group"
        >
          <span className="inline-block group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200">
            {s.icon}
          </span>
        </a>
      ))}
    </div>
  );
}
