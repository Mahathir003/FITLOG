import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#121212] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
        <div className="flex items-center gap-2 text-neutral-100 font-bold tracking-wider">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <span>FITLOG</span>
        </div>

        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
