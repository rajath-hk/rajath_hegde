"use client";
import React from "react";
import Link from "next/link";
import { Home, User, Briefcase, Mail, Github } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
  { href: "/about", label: "About", icon: <User className="w-4 h-4" /> },
  { href: "/projects", label: "Projects", icon: <Briefcase className="w-4 h-4" /> },
  { href: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  { href: "https://github.com/rajath-hk", label: "GitHub", icon: <Github className="w-4 h-4" />, external: true },
];

export function SidePanel() {
  return (
    <aside className="w-20 bg-secondary/80 border-r border-border flex flex-col items-center py-6 gap-6 fixed left-0 top-0 bottom-0 z-40">
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="flex flex-col items-center group"
        >
          <span className="mb-1">{link.icon}</span>
          <span className="text-xs font-medium group-hover:text-primary transition-colors">{link.label}</span>
        </Link>
      ))}
    </aside>
  );
}
