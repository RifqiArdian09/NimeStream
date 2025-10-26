export default function Empty({ children = "No data" }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="mb-4 rounded-full bg-gradient-to-br from-muted/50 to-muted/20 p-6">
        <div className="text-4xl opacity-60">📭</div>
      </div>
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold text-muted-foreground">{children}</h3>
        <p className="text-sm text-muted-foreground/60 max-w-md">
          Tidak ada konten yang tersedia saat ini. Silakan coba lagi nanti atau jelajahi konten lainnya.
        </p>
      </div>
    </div>
  );
}
