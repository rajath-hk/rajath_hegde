import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Rajath Hegde | Full Stack Developer',
  description: "Full Stack Developer specializing in thoughtful, user-centric web experiences. Explore my journey, projects, and expertise in modern web development.",
  openGraph: {
    type: 'website',
    title: 'Rajath Hegde | Full Stack Developer',
    description: 'Full Stack Developer specializing in thoughtful, user-centric web experiences.',
    images: ['https://img.playbook.com/mj3J7by3sHCDWk50s2eAK_qN5_wOe2va96cBxM6anIM/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2YxZGU5NWZk/LTIxOGUtNDY5Zi1i/M2ZjLTg1MWI1NDNi/Y2Y1Zg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen w-screen overflow-hidden">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}