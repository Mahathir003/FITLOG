import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-sky-950/60 bg-[#020612] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5 text-white font-bold tracking-wider">
          <Image
            src="/logo.png"
            alt="Healthycise Logo"
            width={22}
            height={22}
            className="object-contain drop-shadow-[0_0_8px_rgba(0,163,255,0.7)]"
          />
          <span>HEALTHYCISE</span>
        </div>

        <p>© 2026 Healthycise — Train with intent, eat with accuracy.</p>
      </div>
    </footer>
  );
}
