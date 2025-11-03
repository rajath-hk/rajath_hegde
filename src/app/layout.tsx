import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WindowProvider } from "@/contexts/window-context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "PortfolioOS",
  description: "A portfolio website that looks like an operating system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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