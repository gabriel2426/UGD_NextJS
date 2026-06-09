"use client";

import { useState, useEffect, useRef } from "react";

interface UserInfo {
  id: string;
  name: string;
  role: string;
  status: string;
  avatar: string;
}

// Mapping role ke info pekerjaan & shift
const roleInfo: Record<string, { jobTitle: string; department: string; shift: string }> = {
  "SYS-ADMIN":     { jobTitle: "System Administrator",  department: "IT Operations",       shift: "ALL SHIFTS" },
  "FLEET-MANAGER": { jobTitle: "Fleet Manager",          department: "Fleet Management",    shift: "MORNING (06:00–14:00)" },
  "CARGO-OFFICER": { jobTitle: "Cargo Operations Officer", department: "Cargo Division",    shift: "SWING (14:00–22:00)" },
  "STANDARD":      { jobTitle: "Fleet Operator",         department: "Operations Center",   shift: "MORNING (06:00–14:00)" },
  "GUEST":         { jobTitle: "Guest User",             department: "External",            shift: "—" },
};

function getRoleInfo(role: string) {
  return roleInfo[role.toUpperCase()] ?? {
    jobTitle: role,
    department: "Serena Sail",
    shift: "STANDARD",
  };
}

interface ProfilePopupProps {
  variant?: "admin" | "user";
}

export default function ProfilePopup({ variant = "user" }: ProfilePopupProps) {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const isAdmin = variant === "admin";
  const accentColor = isAdmin ? "#a855f7" : "#22d3ee";
  const accentBg    = isAdmin ? "rgba(168,85,247,0.10)" : "rgba(34,211,238,0.10)";
  const accentBorder= isAdmin ? "rgba(168,85,247,0.25)" : "rgba(34,211,238,0.25)";

  // Fetch session on mount
  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.user) setUserInfo(data.user); })
      .catch(() => {});
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const info = userInfo ? getRoleInfo(userInfo.role) : null;
  const avatarLetter = userInfo?.avatar ?? userInfo?.name?.[0]?.toUpperCase() ?? "U";

  return (
    <div ref={popupRef} style={{ position: "relative" }}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Profil saya"
        style={{
          width: isAdmin ? 32 : 30,
          height: isAdmin ? 32 : 30,
          borderRadius: "50%",
          background: isAdmin
            ? "linear-gradient(135deg, #a855f7, #6366f1)"
            : "linear-gradient(135deg, #7c3aed, #22d3ee)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 11,
          fontWeight: "bold",
          color: "#fff",
          cursor: "pointer",
          border: isAdmin
            ? "2px solid rgba(255,255,255,0.1)"
            : "2px solid #0a0a10",
          boxShadow: isAdmin
            ? "0 0 10px rgba(168,85,247,0.4)"
            : "0 0 0 1px rgba(168,85,247,0.5)",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {avatarLetter}
      </button>

      {/* Popup Card */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            width: 280,
            background: "linear-gradient(135deg, rgba(15,12,28,0.99), rgba(8,6,18,0.99))",
            border: `1px solid ${accentBorder}`,
            borderRadius: 14,
            boxShadow: `0 0 40px ${accentBg}, 0 20px 50px rgba(0,0,0,0.7)`,
            zIndex: 9000,
            overflow: "hidden",
            animation: "fadeInPopup 0.16s ease",
          }}
        >
          <style>{`
            @keyframes fadeInPopup {
              from { opacity: 0; transform: translateY(-6px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div style={{
            padding: "18px 18px 14px",
            borderBottom: `1px solid ${accentBorder}`,
            background: accentBg,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            {/* Big avatar */}
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: isAdmin
                ? "linear-gradient(135deg, #a855f7, #6366f1)"
                : "linear-gradient(135deg, #7c3aed, #22d3ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Orbitron', sans-serif", fontSize: 16,
              fontWeight: "bold", color: "#fff",
              border: `2px solid ${accentColor}`,
              boxShadow: `0 0 14px ${accentBg}`,
              flexShrink: 0,
            }}>
              {avatarLetter}
            </div>

            <div style={{ minWidth: 0 }}>
              <p style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 12, fontWeight: 700,
                color: "#fff", letterSpacing: "0.08em",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {userInfo?.name ?? "—"}
              </p>
              <p style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 9, color: accentColor,
                letterSpacing: "0.14em", marginTop: 2,
              }}>
                {userInfo?.id ?? "—"}
              </p>
            </div>
          </div>

          {/* Info rows */}
          <div style={{ padding: "14px 18px" }}>
            {[
              {
                label: "JABATAN",
                icon: "M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zM2 20c0-4 4-7 10-7s10 3 10 7",
                value: info?.jobTitle ?? "—",
              },
              {
                label: "DEPARTEMEN",
                icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
                value: info?.department ?? "—",
              },
              {
                label: "SHIFT KERJA",
                icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2",
                value: info?.shift ?? "—",
              },
              {
                label: "STATUS",
                icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4 12 14.01l-3-3",
                value: userInfo?.status ?? "—",
                valueColor: userInfo?.status?.toLowerCase() === "active" ? "#4ade80" : "#f87171",
              },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                marginBottom: 12,
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: accentBg,
                  border: `1px solid ${accentBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={row.icon} />
                  </svg>
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 8, color: "#4b5563",
                    letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 2,
                  }}>
                    {row.label}
                  </p>
                  <p style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 11, color: row.valueColor ?? "#e5e7eb",
                    letterSpacing: "0.06em",
                  }}>
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            padding: "8px 18px 12px",
            borderTop: `1px solid rgba(255,255,255,0.05)`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8, color: "#374151", letterSpacing: "0.12em",
            }}>
              SERENA SAIL · {isAdmin ? "ADMIN PORTAL" : "USER PORTAL"}
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 8, color: "#6b7280",
                background: "none", border: "none", cursor: "pointer",
                letterSpacing: "0.12em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#9ca3af"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; }}
            >
              TUTUP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
