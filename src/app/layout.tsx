import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WindowProvider } from "@/contexts/window-context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "PortfolioOS - Rajath Hegde",
    template: "%s | PortfolioOS - Rajath Hegde"
  },
  description: "A portfolio website that looks like an operating system. Explore projects, skills, and experience through an interactive desktop environment.",
  keywords: ["portfolio", "operating system", "developer", "full-stack", "web development", "react", "nextjs"],
  authors: [{ name: "Rajath Hegde" }],
  creator: "Rajath Hegde",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rajath-hk.github.io/rajath_hegde/",
    title: "PortfolioOS - Rajath Hegde",
    description: "A portfolio website that looks like an operating system. Explore projects, skills, and experience through an interactive desktop environment.",
    siteName: "PortfolioOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "PortfolioOS - Rajath Hegde",
    description: "A portfolio website that looks like an operating system. Explore projects, skills, and experience through an interactive desktop environment.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Rajath Hegde",
            url: "https://rajath-hk.github.io/rajath_hegde/",
            jobTitle: "Full-Stack Web Developer",
            worksFor: {
              "@type": "Organization",
              name: "MCA Student"
            },
            sameAs: [
              "https://github.com/rajath-hk",
              // Add other social profiles here
            ]
          })
        }} />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WindowProvider>
            {children}
            <Toaster />
          </WindowProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}