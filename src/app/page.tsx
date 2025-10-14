import OsUi from "@/components/retro-os";

export default function Home() {
  return (
    <main>
      <noscript>
        <div className="fixed inset-0 bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6">
            <h1 className="text-3xl font-bold">Rajath Hegde - Full Stack Developer</h1>
            <p className="text-lg text-muted-foreground">
              Welcome to my portfolio. This site is built as an interactive desktop experience.
              To fully experience it, please enable JavaScript in your browser.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#about" className="block p-4 border rounded-lg hover:bg-accent">
                <h2 className="font-semibold">About Me</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn about my background and skills
                </p>
              </a>
              
              <a href="#projects" className="block p-4 border rounded-lg hover:bg-accent">
                <h2 className="font-semibold">Projects</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  View my featured work and projects
                </p>
              </a>
              
              <a href="#experience" className="block p-4 border rounded-lg hover:bg-accent">
                <h2 className="font-semibold">Experience</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  My professional journey and work history
                </p>
              </a>
              
              <a href="#contact" className="block p-4 border rounded-lg hover:bg-accent">
                <h2 className="font-semibold">Contact</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Get in touch with me
                </p>
              </a>
            </div>
            
            <div className="pt-4">
              <a 
                href="/resume.pdf" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </noscript>
      <OsUi />
    </main>
  );
}