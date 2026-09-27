import Link from "next/link";
import { CgGym } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-center text-[#CCFF00] text-4xl shadow-2xl">
        <CgGym />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-mono tracking-widest text-[#CCFF00] uppercase bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
          PAGE NOT FOUND
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
          Looks like you wandered off the training floor. This lift or page
          doesn't exist.
        </p>
      </div>
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#CCFF00] text-neutral-950 font-bold transition hover:opacity-90 shadow-lg shadow-[#CCFF00]/10"
        >
          <span>Back to Library</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}
