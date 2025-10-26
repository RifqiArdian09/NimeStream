export default function Footer() {
  return (
    <footer className="mt-10 border-t py-6 text-center text-xs opacity-60">
      <p>
        © {new Date().getFullYear()} mingane · Built with Next.js
      </p>
    </footer>
  );
}
