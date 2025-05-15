import "./globals.css";

export const metadata = {
  title: "Gamified Learning by ProfSchimd",
  description: "Gamified Learning Experience (Study, Play, and Learn material)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">

      <body className="bg-sky-50 dark:bg-sky-950 text-neutral-950 dark:text-neutral-50">
        <div className="flex flex-col min-h-screen">
          <Header />
          <Main>{children}</Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Header({ children }) {
  return (
    <div>Header</div>
  );
}

function Main({ children }) {
  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </main>
  );
}

function Footer({ children }) {
  return (
    <div>Footer</div>
  );
}