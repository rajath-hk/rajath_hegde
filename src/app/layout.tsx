
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import MainHeader from '@/components/main-header';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="preload" href="/images/headshot.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" as="image" type="image/webp" href="/images/project1.webp" fetchPriority="low" />
        <link rel="preload" href="/resume.pdf" as="document" fetchPriority="low" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        {/* GA4 placeholder - replace with your measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} />

        {/* JSON-LD structured data for SEO (Person) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Rajath Hegde",
          "url": "https://your-domain.example",
          "image": (process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.example') + '/images/headshot.jpg',
          "sameAs": [
            "https://linkedin.com/in/rajath-hegde",
            "https://github.com/rajath-hk",
            "https://twitter.com/rajath_hegde"
          ],
          "jobTitle": "Full-Stack Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "Tech Solutions Inc."
          },
          "email": "mailto:mail4rajathhegde@gmail.com",
          "description": "Full Stack Developer specializing in thoughtful, user-centric web experiences."
        }) }} />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MainHeader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
