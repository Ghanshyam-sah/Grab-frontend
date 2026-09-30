export default function Footer() {
  return (
    <footer className="border-t border-stone/30 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm text-ink/60">
        <p className="font-display text-lg text-ink">Grab</p>
        <p>Considered fashion, made to last. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
