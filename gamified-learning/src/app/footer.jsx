export default function Footer() {
  return (
    <footer className="bg-sky-700 dark:bg-sky-900 text-white text-sm">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0">© {new Date().getFullYear()} Gamified Learning by Michele Schimd. All rights reserved.</p>
      </div>
    </footer>
  );
}
