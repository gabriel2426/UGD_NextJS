"use client";

import { useState } from "react";

interface SecurityBannerProps {
  /** "admin" untuk warna violet, "user" untuk warna cyan */
  role?: "admin" | "user";
}

export default function SecurityBanner({ role = "user" }: SecurityBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const isAdmin = role === "admin";
  const accentColor = isAdmin ? "#a855f7" : "#22d3ee";
  const accentBg = isAdmin
    ? "rgba(168,85,247,0.07)"
    : "rgba(34,211,238,0.07)";
  const accentBorder = isAdmin
    ? "rgba(168,85,247,0.20)"
    : "rgba(34,211,238,0.20)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "8px 20px",
        background: accentBg,
        borderBottom: `1px solid ${accentBorder}`,
        minHeight: 36,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
        {/* Shield icon */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>

        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9,
            color: accentColor,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {isAdmin ? "ADMIN ACCESS" : "SECURE ZONE"}
        </span>

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: 12,
            background: accentBorder,
            flexShrink: 0,
          }}
        />

        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9,
            color: "#6b7280",
            letterSpacing: "0.10em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {isAdmin
            ? "Halaman ini hanya dapat diakses oleh administrator yang terautentikasi. Seluruh aktivitas direkam."
            : "Anda berada di area terproteksi. Jangan bagikan kredensial sesi kepada siapapun."}
        </span>
      </div>

      {/* Right side: encryption label + dismiss */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 8,
            color: "#4b5563",
            letterSpacing: "0.12em",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4b5563"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          AES-256 ENCRYPTED
        </span>

        <button
          onClick={() => setDismissed(true)}
          title="Tutup banner"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#4b5563",
            display: "flex",
            alignItems: "center",
            padding: 2,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#9ca3af";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#4b5563";
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
