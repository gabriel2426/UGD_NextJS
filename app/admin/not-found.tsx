import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found | Admin Serena Sail",
};

export default function AdminNotFound() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center shadow-2xl shadow-black/40">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-400/10 border border-violet-400/20">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/>
          </svg>
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-violet-400 font-mono">ADMIN — 404</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Halaman Admin Tidak Ditemukan</h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300">
          Halaman admin yang Anda akses tidak tersedia. Kembali ke dashboard admin untuk navigasi yang benar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            Ke Dashboard Admin
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-400/30"
          >
            Ke Beranda
          </Link>
        </div>
        <p className="mt-8 font-mono text-[10px] tracking-[0.3em] text-slate-600 uppercase">Serena Sail Admin Control System</p>
      </div>
    </main>
  );
}
