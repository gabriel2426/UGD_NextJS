"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LogoutModal from "@/app/ui/LogoutModal";
import SecurityBanner from "@/app/ui/SecurityBanner";
import NotificationDropdown from "@/app/ui/NotificationDropdown";
import ProfilePopup from "@/app/ui/ProfilePopup";

export default function SereneSailTopbar() {
  const router = useRouter();
  const path = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const navs = [
    { label: "CARGO MANAGEMENT", href: "/admin" },
    { label: "USER MANAGEMENT", href: "/admin/user-management" },
    { label: "FLEET & LOGISTICS", href: "/admin/fleet-logistics" },
    { label: "SECURITY & ACCOUNTS", href: "/admin/security-accounts" },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Navigate to admin page with search query
    router.push(`/admin?query=${encodeURIComponent(searchQuery.trim())}`);
  }

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <style>{`
        .admin-nav-btn:hover { color: #fff !important; }
        .admin-nav-btn::after {
          content: ''; position: absolute; bottom: 0; left: 50%; width: 0;
          height: 2px; background: #a855f7; transition: all 0.3s ease; transform: translateX(-50%);
          box-shadow: 0 0 8px #a855f7;
        }
        .admin-nav-btn.active::after { width: 100%; }
        .admin-logo:hover { text-shadow: 0 0 12px #a855f7; }
      `}</style>

      <SecurityBanner role="admin" />

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 48, padding: "0 24px",
        background: "rgba(10, 10, 20, 0.95)",
        borderBottom: "1px solid rgba(168, 85, 247, 0.2)",
        backdropFilter: "blur(10px)",
      }}>

        {/* LEFT: Logo + Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div
            className="admin-logo"
            onClick={() => router.push("/admin")}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 16, fontWeight: 900,
              color: "#a855f7", letterSpacing: "0.1em", cursor: "pointer",
              transition: "all 0.3s ease", whiteSpace: "nowrap",
            }}
          >
            SERENE<span style={{ color: "#fff", marginLeft: 4 }}>SAIL</span>
          </div>

          <nav style={{ display: "flex", height: 48 }}>
            {navs.map((n) => (
              <button
                key={n.label}
                className={`admin-nav-btn ${path === n.href ? "active" : ""}`}
                onClick={() => router.push(n.href)}
                style={{
                  fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
                  letterSpacing: "0.15em",
                  color: path === n.href ? "#fff" : "#6b7280",
                  padding: "0 16px", cursor: "pointer", position: "relative",
                  textTransform: "uppercase", border: "none", background: "none",
                  height: "100%", display: "flex", alignItems: "center",
                  transition: "color 0.3s ease",
                }}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT: Search + Notif + Logout + Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ display: "flex" }}>
            <div style={{
              display: "flex", alignItems: "center",
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${searchFocused ? "rgba(168,85,247,0.55)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 6, padding: "0 10px", height: 28,
              width: searchFocused ? 180 : 130,
              transition: "all 0.3s ease",
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke={searchFocused ? "#a855f7" : "#6b7280"} strokeWidth="2.5"
                style={{ marginRight: 6, flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="CARI CARGO..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{
                  background: "none", border: "none", outline: "none",
                  color: "#fff", fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 9, width: "100%", letterSpacing: "0.1em",
                }}
              />
            </div>
          </form>

          {/* Notification dropdown */}
          <NotificationDropdown variant="admin" />

          {/* Logout modal */}
          <LogoutModal variant="rose" />

          {/* Profile popup */}
          <ProfilePopup variant="admin" />
        </div>
      </div>
    </div>
  );
}
