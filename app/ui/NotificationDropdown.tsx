"use client";

import { useState, useRef, useEffect } from "react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "WEATHER WARNING",
    color: "#f87171",
    time: "10:45 UTC",
    body: "Tropical Cyclone Alert: Region IV-B. Reroute mandatory for vessels in sector 7.",
  },
  {
    id: 2,
    type: "ENGINE ISSUE",
    color: "#f59e0b",
    time: "09:12 UTC",
    body: "Vessel PL-992-ALPHA: P04- Engine Temp High. Cooling system bypass initiated.",
  },
  {
    id: 3,
    type: "SECURITY ALERT",
    color: "#f87171",
    time: "08:30 UTC",
    body: "Unauthorized drone activity detected near sector 12. Increase surveillance.",
  },
  {
    id: 4,
    type: "CARGO UPDATE",
    color: "#22d3ee",
    time: "07:55 UTC",
    body: "Cargo batch LUT-1234 successfully loaded on V-902 AQUILA. Departure on schedule.",
  },
];

interface NotificationDropdownProps {
  variant?: "admin" | "user";
}

export default function NotificationDropdown({ variant = "user" }: NotificationDropdownProps) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState<Set<number>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = variant === "admin";
  const accentColor = isAdmin ? "#a855f7" : "#22d3ee";
  const accentBg    = isAdmin ? "rgba(168,85,247,0.10)" : "rgba(34,211,238,0.08)";
  const accentBorder= isAdmin ? "rgba(168,85,247,0.22)" : "rgba(34,211,238,0.20)";

  const unreadCount = NOTIFICATIONS.length - read.size;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function markAll() {
    setRead(new Set(NOTIFICATIONS.map((n) => n.id)));
  }

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      {/* Bell button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Notifikasi"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isAdmin ? 32 : 28,
          height: isAdmin ? 32 : 28,
          cursor: "pointer",
          color: open ? accentColor : "#6b7280",
          borderRadius: isAdmin ? "50%" : 4,
          transition: "all 0.2s",
          border: open
            ? `1px solid ${accentBorder}`
            : `1px solid ${isAdmin ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)"}`,
          background: open ? accentBg : isAdmin ? "transparent" : "rgba(255,255,255,0.02)",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.color = "#6b7280"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span style={{
            position: "absolute",
            top: -3, right: -3,
            width: 14, height: 14,
            borderRadius: "50%",
            background: "#f43f5e",
            border: "2px solid #0a0a10",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 7, color: "#fff", fontWeight: 700,
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          width: 300,
          background: "linear-gradient(135deg, rgba(12,10,24,0.99), rgba(8,6,18,0.99))",
          border: `1px solid ${accentBorder}`,
          borderRadius: 12,
          boxShadow: `0 0 40px ${accentBg}, 0 20px 50px rgba(0,0,0,0.7)`,
          zIndex: 9000,
          overflow: "hidden",
          animation: "fadeInPopup 0.16s ease",
        }}>
          <style>{`
            @keyframes fadeInPopup {
              from { opacity: 0; transform: translateY(-6px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${accentBorder}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: accentBg,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke={accentColor} strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 10, fontWeight: 700,
                color: "#fff", letterSpacing: "0.12em",
              }}>
                NOTIFIKASI SISTEM
              </span>
              {unreadCount > 0 && (
                <span style={{
                  background: "#f43f5e",
                  borderRadius: 10, padding: "1px 6px",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 8, color: "#fff",
                }}>
                  {unreadCount} BARU
                </span>
              )}
            </div>
            <button
              onClick={markAll}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 8, color: "#6b7280",
                background: "none", border: "none", cursor: "pointer",
                letterSpacing: "0.10em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; }}
            >
              TANDAI SEMUA
            </button>
          </div>

          {/* Notification list */}
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {NOTIFICATIONS.map((notif) => {
              const isRead = read.has(notif.id);
              return (
                <div
                  key={notif.id}
                  onClick={() => setRead((prev) => new Set([...prev, notif.id]))}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    cursor: "pointer",
                    background: isRead ? "transparent" : "rgba(255,255,255,0.02)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = accentBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = isRead ? "transparent" : "rgba(255,255,255,0.02)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{
                      display: "flex", alignItems: "center", gap: 5,
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: 8, color: notif.color,
                      letterSpacing: "0.14em",
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: isRead ? "#4b5563" : notif.color,
                        boxShadow: isRead ? "none" : `0 0 5px ${notif.color}`,
                        flexShrink: 0,
                      }} />
                      {notif.type}
                    </span>
                    <span style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: 8, color: "#4b5563", letterSpacing: "0.08em",
                    }}>
                      {notif.time}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 9, color: isRead ? "#6b7280" : "#9ca3af",
                    letterSpacing: "0.04em", lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {notif.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{
            padding: "8px 16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8, color: "#374151", letterSpacing: "0.12em",
            }}>
              SERENA SAIL · LIVE MONITORING FEED
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
