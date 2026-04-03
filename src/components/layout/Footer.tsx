export function Footer() {
  return (
    <footer className="bg-wavestone-deep text-white/70 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
                fill="#00C853"
                stroke="#00C853"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold text-white">Électrification France</span>
            <span className="text-white/40 mx-2">|</span>
            <span>Powered by <span className="font-semibold text-white/90">Wavestone</span></span>
          </div>
          <p className="text-white/50 text-xs text-center sm:text-right">
            Source : <span className="text-white/70">SDES — Bilan énergétique de la France 2022</span>
            <span className="mx-2">·</span>ODRE · RTE · Eurostat
          </p>
        </div>
      </div>
    </footer>
  );
}
