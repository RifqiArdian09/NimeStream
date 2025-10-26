export default function Footer() {
  return (
    <footer className="mt-8 sm:mt-10 border-t py-4 sm:py-6 text-center text-xs sm:text-sm opacity-60">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} Nimestream 
        </p>
      </div>
    </footer>
  );
}
