export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 w-full px-8 py-12 bg-black">
      <div className="flex gap-8">
        <a
          className="font-headline text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-amber-accent transition-colors duration-75"
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </div>
      <p className="font-headline text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        &copy; 2026 TECHTALK RECORDS
      </p>
    </footer>
  )
}
