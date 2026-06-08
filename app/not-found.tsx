import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found | Serena Sail",
  description: "Halaman tidak ditemukan. Kembali ke beranda Serena Sail.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center shadow-2xl shadow-black/40">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400 font-mono">404 ERROR</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Halaman Tidak Ditemukan</h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan. Pastikan URL sudah benar atau kembali ke beranda.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/30"
          >
            Ke Halaman Login
          </Link>
        </div>
        <p className="mt-8 font-mono text-[10px] tracking-[0.3em] text-slate-600 uppercase">Serena Sail Maritime Intelligence Network</p>
      </div>
    </main>
  );
}
