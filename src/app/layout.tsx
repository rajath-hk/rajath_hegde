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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Single Page Apps for GitHub Pages
              // MIT License
              // https://github.com/rafgraph/spa-github-pages
              // This script checks to see if a redirect is present in the query string,
              // converts it back into the correct url and adds it to the browser's history using
              // window.history.replaceState(...), which won't cause the browser to attempt to load
              // the new url. When the single page app is loaded further down in this file,
              // the correct url will be waiting in the browser's history for the app to route accordingly.
              (function(l) {
                if (l.search) {
                  var q = {};
                  l.search.slice(1).split('&').forEach(function(v) {
                    var a = v.split('=');
                    q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
                  });
                  if (q.p !== undefined) {
                    window.history.replaceState(null, null,
                      l.pathname.slice(0, -1) + (q.p || '') +
                      (q.q ? ('?' + q.q) : '') +
                      l.hash
                    );
                  }
                }
              }(window.location))
            `
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}