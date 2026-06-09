"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  /** Teks tombol trigger. Default: ikon power */
  triggerLabel?: string;
  /** Warna aksen: "rose" untuk admin, "cyan" untuk user */
  variant?: "rose" | "cyan";
}

export default function LogoutModal({
  triggerLabel,
  variant = "rose",
}: LogoutModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const accentColor = variant === "rose" ? "#f43f5e" : "#22d3ee";
  const accentBg =
    variant === "rose"
      ? "rgba(244,63,94,0.12)"
      : "rgba(34,211,238,0.12)";
  const accentBorder =
    variant === "rose"
      ? "rgba(244,63,94,0.30)"
      : "rgba(34,211,238,0.30)";

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore network errors
    }
    router.replace("/login");
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        title="Logout"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          cursor: "pointer",
          color: accentColor,
          borderRadius: variant === "rose" ? "50%" : 4,
          border: `1px solid ${accentBorder}`,
          background: accentBg,
          transition: "all 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            variant === "rose"
              ? "rgba(244,63,94,0.22)"
              : "rgba(34,211,238,0.22)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = accentBg;
        }}
      >
        {triggerLabel ? (
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
            }}
          >
            {triggerLabel}
          </span>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        )}
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          onClick={() => !loading && setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.70)",
            backdropFilter: "blur(6px)",
            padding: "16px",
          }}
        >
          {/* Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 400,
              background:
                "linear-gradient(135deg, rgba(15,12,28,0.98), rgba(8,6,18,0.98))",
              border: `1px solid ${accentBorder}`,
              borderRadius: 16,
              padding: "32px 28px 24px",
              boxShadow: `0 0 60px ${accentBg}, 0 24px 60px rgba(0,0,0,0.6)`,
              position: "relative",
              animation: "fadeInModal 0.18s ease",
            }}
          >
            <style>{`
              @keyframes fadeInModal {
                from { opacity: 0; transform: scale(0.94) translateY(8px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>

            {/* Corner decorators */}
            {[
              { top: -1, left: -1, borderWidth: "2px 0 0 2px" },
              { top: -1, right: -1, borderWidth: "2px 2px 0 0" },
              { bottom: -1, left: -1, borderWidth: "0 0 2px 2px" },
              { bottom: -1, right: -1, borderWidth: "0 2px 2px 0" },
            ].map((style, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 12,
                  height: 12,
                  borderStyle: "solid",
                  borderColor: accentColor,
                  ...style,
                }}
              />
            ))}

            {/* Icon */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: accentBg,
                border: `1px solid ${accentBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                textAlign: "center",
                letterSpacing: "0.18em",
                marginBottom: 10,
              }}
            >
              TERMINATE SESSION
            </h2>

            {/* Body */}
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 11,
                color: "#9ca3af",
                textAlign: "center",
                letterSpacing: "0.08em",
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              Sesi aktif Anda akan dihentikan.
              <br />
              Pastikan semua perubahan sudah disimpan sebelum keluar.
            </p>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.06)",
                marginBottom: 20,
              }}
            />

            {/* Buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                disabled={loading}
                onClick={() => setOpen(false)}
                style={{
                  flex: 1,
                  height: 40,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 8,
                  color: "#9ca3af",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.20)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.10)";
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                BATAL
              </button>

              <button
                disabled={loading}
                onClick={handleLogout}
                style={{
                  flex: 1,
                  height: 40,
                  border: `1px solid ${accentBorder}`,
                  background: accentBg,
                  borderRadius: 8,
                  color: accentColor,
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background =
                      variant === "rose"
                        ? "rgba(244,63,94,0.22)"
                        : "rgba(34,211,238,0.22)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = accentBg;
                }}
              >
                {loading ? "MEMUTUS..." : "YA, KELUAR"}
              </button>
            </div>

            {/* Security note */}
            <p
              style={{
                marginTop: 16,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 8,
                color: "#4b5563",
                textAlign: "center",
                letterSpacing: "0.14em",
              }}
            >
              SERENA SAIL · SECURE SESSION PROTOCOL
            </p>
          </div>
        </div>
      )}
    </>
  );
}
