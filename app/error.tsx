"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center shadow-2xl shadow-black/40">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-400/10 border border-rose-400/20">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <path d="M12 9v4"/><path d="M12 17h.01"/>
          </svg>
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-rose-400 font-mono">SYSTEM ERROR</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Terjadi Kesalahan</h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300">
          Sistem menemukan masalah saat memproses permintaan Anda. Pastikan data yang dimasukkan valid dan coba lagi.
        </p>
        {error?.message && (
          <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3">
            <p className="font-mono text-xs text-rose-300 break-words">{error.message}</p>
          </div>
        )}
        {error?.digest && (
          <p className="mt-2 font-mono text-[10px] text-slate-600">Error ID: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Muat Ulang Halaman
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20"
          >
            Kembali ke Beranda
          </Link>
        </div>
        <p className="mt-8 font-mono text-[10px] tracking-[0.3em] text-slate-600 uppercase">Serena Sail Maritime Intelligence Network</p>
      </div>
    </main>
  );
}
