import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg: "#080B10",
  surface: "#0D1117",
  card: "#111820",
  cardHover: "#151E28",
  border: "#1E2D3D",
  borderHot: "#2A4060",
  accent: "#FF6B35",
  accentGlow: "rgba(255,107,53,0.15)",
  accentSoft: "rgba(255,107,53,0.08)",
  green: "#10D97C",
  greenGlow: "rgba(16,217,124,0.12)",
  blue: "#3B82F6",
  blueGlow: "rgba(59,130,246,0.12)",
  purple: "#A855F7",
  purpleGlow: "rgba(168,85,247,0.12)",
  yellow: "#F59E0B",
  text: "#F0F6FF",
  textSub: "#8BA0B8",
  textMuted: "#4A6080",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${C.bg};
    color: ${C.text};
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes pulse {
    0%,100% { opacity:1; } 50% { opacity:.4; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes floatDot {
    0%,100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes gradientShift {
    0%,100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes progressFill {
    from { width: 0%; }
    to { width: var(--target-width); }
  }
  @keyframes countUp {
    from { opacity:0; transform:translateY(8px); }
    to { opacity:1; transform:translateY(0); }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 20px rgba(255,107,53,0.3); }
    50% { box-shadow: 0 0 40px rgba(255,107,53,0.6); }
  }
  @keyframes slideIn {
    from { transform: translateX(-100%); opacity:0; }
    to { transform: translateX(0); opacity:1; }
  }
  @keyframes toastIn {
    from { transform: translateY(20px); opacity:0; }
    to { transform: translateY(0); opacity:1; }
  }

  .animate-fade-up { animation: fadeUp 0.5s ease forwards; }
  .animate-fade-in { animation: fadeIn 0.3s ease forwards; }

  .skeleton {
    background: linear-gradient(90deg, ${C.card} 25%, #1a2535 50%, ${C.card} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
  }

  .card {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 16px;
    transition: all 0.2s ease;
  }
  .card:hover {
    border-color: ${C.borderHot};
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .btn-primary {
    background: ${C.accent};
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-primary:hover {
    background: #ff7d4d;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(255,107,53,0.4);
  }
  .btn-ghost {
    background: transparent;
    color: ${C.textSub};
    border: 1px solid ${C.border};
    border-radius: 10px;
    padding: 10px 20px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-ghost:hover {
    background: ${C.cardHover};
    color: ${C.text};
    border-color: ${C.borderHot};
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .tag-vip { background: rgba(245,158,11,0.15); color: #F59E0B; }
  .tag-new { background: rgba(59,130,246,0.15); color: #3B82F6; }
  .tag-inactive { background: rgba(239,68,68,0.15); color: #EF4444; }
  .tag-frequent { background: rgba(16,217,124,0.15); color: #10D97C; }

  input, textarea, select {
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 10px;
    color: ${C.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 10px 14px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus, textarea:focus, select:focus {
    border-color: ${C.accent};
    box-shadow: 0 0 0 3px ${C.accentGlow};
  }
  input::placeholder, textarea::placeholder { color: ${C.textMuted}; }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s ease;
    font-size: 14px;
    font-weight: 500;
    color: ${C.textSub};
    border: 1px solid transparent;
  }
  .nav-item:hover {
    background: ${C.cardHover};
    color: ${C.text};
  }
  .nav-item.active {
    background: ${C.accentSoft};
    color: ${C.accent};
    border-color: rgba(255,107,53,0.2);
  }

  .metric-card {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 16px;
    padding: 24px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .metric-card:hover {
    border-color: ${C.borderHot};
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
  }
  .metric-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
  }
  .badge-up { background: rgba(16,217,124,0.15); color: ${C.green}; }
  .badge-down { background: rgba(239,68,68,0.15); color: #EF4444; }

  .switch {
    width: 40px; height: 22px;
    background: ${C.border};
    border-radius: 99px;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
  }
  .switch.on { background: ${C.accent}; }
  .switch::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 16px; height: 16px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  .switch.on::after { transform: translateX(18px); }

  .progress-bar {
    height: 6px;
    background: ${C.border};
    border-radius: 99px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 1s cubic-bezier(0.4,0,0.2,1);
  }

  .table-row {
    display: grid;
    padding: 14px 20px;
    border-bottom: 1px solid ${C.border};
    align-items: center;
    transition: background 0.15s;
    cursor: pointer;
  }
  .table-row:hover { background: ${C.cardHover}; }
  .table-row:last-child { border-bottom: none; }

  .dot-online {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${C.green};
    box-shadow: 0 0 6px ${C.green};
    animation: pulse 2s infinite;
  }

  .floating-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    opacity: 0.4;
  }

  .glass {
    background: rgba(13,17,23,0.8);
    backdrop-filter: blur(20px);
    border: 1px solid ${C.border};
  }
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    dashboard: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    users: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    zap: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    star: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    ai: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    credit: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    settings: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    trending: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    arrow: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    check: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    copy: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
    refresh: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
    send: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    bell: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
    search: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    plus: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    filter: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    package: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    whatsapp: <svg width={size} height={size} fill={color} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    globe: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    shield: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    logout: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
    admin: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  };
  return icons[name] || null;
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = ({ msg, type = "success", onClose }) => (
  <div style={{
    position: "fixed", bottom: 24, right: 24, zIndex: 9999,
    background: C.card, border: `1px solid ${type === "success" ? C.green : C.accent}`,
    borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10,
    animation: "toastIn 0.3s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    color: C.text, fontSize: 14, fontWeight: 500,
  }}>
    <div style={{ color: type === "success" ? C.green : C.accent }}>
      {type === "success" ? <Icon name="check" size={14} color={C.green} /> : <Icon name="zap" size={14} color={C.accent} />}
    </div>
    {msg}
  </div>
);

// ─── SPARKLINE ────────────────────────────────────────────────────────────────
const Sparkline = ({ data, color, width = 80, height = 32 }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min + 1)) * height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ─── DONUT CHART ──────────────────────────────────────────────────────────────
const DonutChart = ({ value, total, color }) => {
  const pct = value / total;
  const r = 28, circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <svg width={70} height={70} viewBox="0 0 70 70">
      <circle cx="35" cy="35" r={r} fill="none" stroke={C.border} strokeWidth="5"/>
      <circle cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ/4}
        strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }}/>
      <text x="35" y="40" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="700" fontFamily="Syne">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
};

// ─── BAR CHART ────────────────────────────────────────────────────────────────
const BarChart = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: "100%", background: C.accentSoft, borderRadius: 4, overflow: "hidden",
            height: 64, display: "flex", alignItems: "flex-end",
          }}>
            <div style={{
              width: "100%", background: color,
              height: `${(d.v / max) * 100}%`, borderRadius: 4,
              transition: `height 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.05}s`,
              opacity: i === data.length - 1 ? 1 : 0.6,
            }}/>
          </div>
          <span style={{ fontSize: 10, color: C.textMuted }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const customers = [
  { id: 1, name: "Mariana Costa", email: "mari@gmail.com", phone: "+55 11 99999-0001", tag: "vip", orders: 34, avg: 89.9, lastOrder: "2 dias", spent: 3056, status: "active" },
  { id: 2, name: "Rafael Torres", email: "rafa@gmail.com", phone: "+55 11 99999-0002", tag: "inactive", orders: 8, avg: 45.0, lastOrder: "42 dias", spent: 360, status: "inactive" },
  { id: 3, name: "Amanda Ferreira", email: "aman@gmail.com", phone: "+55 11 99999-0003", tag: "frequent", orders: 21, avg: 67.5, lastOrder: "5 dias", spent: 1417, status: "active" },
  { id: 4, name: "Lucas Mendes", email: "luca@gmail.com", phone: "+55 11 99999-0004", tag: "new", orders: 2, avg: 52.0, lastOrder: "1 dia", spent: 104, status: "active" },
  { id: 5, name: "Juliana Alves", email: "juli@gmail.com", phone: "+55 11 99999-0005", tag: "vip", orders: 47, avg: 112.3, lastOrder: "3 dias", spent: 5278, status: "active" },
  { id: 6, name: "Gabriel Lima", email: "gab@gmail.com", phone: "+55 11 99999-0006", tag: "inactive", orders: 5, avg: 38.0, lastOrder: "68 dias", spent: 190, status: "inactive" },
];

const automations = [
  { id: 1, name: "Recuperação 30 dias", trigger: "Inativo há 30 dias", action: "WhatsApp + 15% OFF", active: true, sent: 234, converted: 67, rate: 28.6 },
  { id: 2, name: "Boas-vindas VIP", trigger: "Atingir R$ 2.000 gastos", action: "Cupom exclusivo VIP", active: true, sent: 45, converted: 38, rate: 84.4 },
  { id: 3, name: "Aniversário", trigger: "Dia do aniversário", action: "Desconto surpresa 20%", active: false, sent: 120, converted: 89, rate: 74.2 },
  { id: 4, name: "Inativo crítico", trigger: "Inativo há 60 dias", action: "WhatsApp urgente + 25% OFF", active: true, sent: 89, converted: 12, rate: 13.5 },
];

const campaigns = [
  { id: 1, name: "Promoção Fim de Semana", type: "Desconto", reach: 1240, opened: 892, converted: 134, revenue: 12060, date: "Hoje" },
  { id: 2, name: "Lançamento Combo Gourmet", type: "Lançamento", reach: 890, opened: 612, converted: 87, revenue: 8700, date: "Ontem" },
  { id: 3, name: "Sentimos sua falta 🍔", type: "Recuperação", reach: 340, opened: 289, converted: 78, revenue: 7020, date: "3 dias" },
];

const plans = [
  {
    name: "Starter", price: 97, color: C.blue, desc: "Para delivery iniciando",
    features: ["Até 500 clientes", "3 automações", "Campanhas básicas", "Dashboard analytics", "Suporte por email"],
  },
  {
    name: "Pro", price: 197, color: C.accent, desc: "Para delivery em crescimento", popular: true,
    features: ["Até 5.000 clientes", "Automações ilimitadas", "IA de promoções", "CRM completo", "Fidelidade gamificada", "WhatsApp integrado", "Suporte prioritário"],
  },
  {
    name: "Premium", price: 397, color: C.purple, desc: "Para redes e franquias",
    features: ["Clientes ilimitados", "Multi-unidades", "API personalizada", "Analytics avançado", "Gerente dedicado", "Integração PDV", "White-label"],
  },
];

// ─── VIEWS ────────────────────────────────────────────────────────────────────

const LandingPage = ({ onLogin }) => {
  const [aiText, setAiText] = useState("");
  const heroText = "Transforme clientes\nperdidos em vendas\nautomáticas.";
  
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setAiText("O SaaS definitivo para delivery aumentar retenção e faturamento com IA.".slice(0, i++));
      if (i > 70) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, overflow: "hidden" }}>
      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)",
        background: "rgba(8,11,16,0.85)", borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, background: C.accent, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, color: "white", fontFamily: "Syne",
            boxShadow: `0 0 16px ${C.accentGlow}`,
          }}>P</div>
          <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: C.text }}>Pulse Delivery</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Recursos", "Preços", "Blog", "Contato"].map(l => (
            <span key={l} style={{ color: C.textSub, fontSize: 14, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.textSub}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-ghost" onClick={onLogin}>Entrar</button>
          <button className="btn-primary" onClick={onLogin}>Começar grátis <Icon name="arrow" size={14}/></button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", padding: "100px 40px 80px", textAlign: "center", overflow: "hidden" }}>
        <div className="floating-orb" style={{ width: 600, height: 600, background: C.accent, top: -200, left: "50%", transform: "translateX(-50%)", opacity: 0.06 }}/>
        <div className="floating-orb" style={{ width: 300, height: 300, background: C.blue, top: 100, left: "10%", opacity: 0.08 }}/>
        <div className="floating-orb" style={{ width: 400, height: 400, background: C.purple, top: 50, right: "5%", opacity: 0.06 }}/>
        
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.accentSoft, border: `1px solid rgba(255,107,53,0.2)`, borderRadius: 99, padding: "6px 16px", marginBottom: 32 }}>
          <div className="dot-online"/>
          <span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>Novo: IA de promoções com GPT-4o</span>
        </div>
        
        <h1 style={{
          fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(44px,6vw,80px)",
          lineHeight: 1.05, color: C.text, marginBottom: 24, whiteSpace: "pre-line",
          animation: "fadeUp 0.6s ease forwards",
        }}>{heroText.split("\n")[0]}<br/>
          <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            background: `linear-gradient(135deg, ${C.accent}, #FF9A6C)`,
            backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite",
            display: "inline" }}>
            {heroText.split("\n")[1]}
          </span><br/>{heroText.split("\n")[2]}
        </h1>
        
        <p style={{ fontSize: 20, color: C.textSub, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6, minHeight: 32 }}>
          {aiText}<span style={{ animation: "pulse 1s infinite", color: C.accent }}>|</span>
        </p>
        
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 60, flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={onLogin} style={{ padding: "14px 28px", fontSize: 16 }}>
            Começar 14 dias grátis <Icon name="arrow" size={16}/>
          </button>
          <button className="btn-ghost" onClick={onLogin} style={{ padding: "14px 28px", fontSize: 16 }}>
            Ver demonstração
          </button>
        </div>
        
        {/* STATS BAR */}
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", opacity: 0.7 }}>
          {[["2.400+", "restaurantes"], ["R$ 18M+", "recuperados"], ["68%", "taxa retenção"], ["4.9★", "avaliação"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 22, color: C.text }}>{v}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section style={{ padding: "0 40px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 20,
          overflow: "hidden", boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${C.border}, inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}>
          {/* WINDOW BAR */}
          <div style={{ padding: "14px 20px", background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            {["#FF5F57","#FEBC2E","#28C840"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }}/>)}
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ background: C.border, borderRadius: 6, padding: "4px 16px", display: "inline-block", fontSize: 12, color: C.textMuted }}>
                app.pulsedelivery.com/dashboard
              </div>
            </div>
          </div>
          {/* MINI DASHBOARD */}
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { label: "Clientes Ativos", value: "3.847", delta: "+12%", color: C.green, data: [20,28,25,35,32,42,38,50] },
              { label: "Recuperados", value: "R$ 18.430", delta: "+28%", color: C.accent, data: [10,18,22,20,30,28,35,42] },
              { label: "Taxa Retenção", value: "68.4%", delta: "+5%", color: C.blue, data: [55,58,60,62,61,64,66,68] },
              { label: "Ticket Médio", value: "R$ 89,90", delta: "+9%", color: C.purple, data: [70,72,75,73,80,82,85,89] },
            ].map((m, i) => (
              <div key={i} className="metric-card" style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: C.textMuted }}>{m.label}</span>
                  <Sparkline data={m.data} color={m.color}/>
                </div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: C.text }}>{m.value}</div>
                <span className="badge badge-up" style={{ marginTop: 6, fontSize: 10 }}>↑ {m.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "40px 40px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.accentSoft, border: `1px solid rgba(255,107,53,0.2)`, borderRadius: 99, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>FUNCIONALIDADES</span>
          </div>
          <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 40, color: C.text, marginBottom: 16 }}>
            Tudo que você precisa<br/>para crescer
          </h2>
          <p style={{ fontSize: 16, color: C.textSub, maxWidth: 520, margin: "0 auto" }}>
            Uma plataforma completa que automatiza a recuperação de clientes, fidelização e crescimento de vendas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: "zap", color: C.accent, title: "Recuperação Automática", desc: "Detecta clientes inativos e envia campanhas personalizadas via WhatsApp automaticamente." },
            { icon: "ai", color: C.blue, title: "IA de Promoções", desc: "GPT-4o gera headlines, copies e campanhas completas em segundos para aumentar suas vendas." },
            { icon: "star", color: C.yellow, title: "Fidelidade Gamificada", desc: "Sistema de pontos e recompensas que engaja e fideliza clientes de forma divertida." },
            { icon: "users", color: C.green, title: "CRM Completo", desc: "Visualize todos os seus clientes, histórico de compras, comportamento e muito mais." },
            { icon: "trending", color: C.purple, title: "Analytics Avançado", desc: "Dashboards em tempo real com métricas de retenção, crescimento e campanhas." },
            { icon: "shield", color: C.accent, title: "Segurança Total", desc: "Dados protegidos com criptografia de ponta, conformidade LGPD e backups automáticos." },
          ].map((f, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon name={f.icon} size={22} color={f.color}/>
              </div>
              <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 17, color: C.text, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "40px 40px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 40, color: C.text, marginBottom: 12 }}>Planos simples e diretos</h2>
          <p style={{ color: C.textSub }}>14 dias grátis em qualquer plano. Sem cartão de crédito.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {plans.map((p, i) => (
            <div key={i} className="card" style={{
              padding: 28, position: "relative",
              border: p.popular ? `1px solid ${C.accent}` : `1px solid ${C.border}`,
              transform: p.popular ? "scale(1.03)" : "none",
              boxShadow: p.popular ? `0 0 40px ${C.accentGlow}` : "none",
            }}>
              {p.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: C.accent, borderRadius: 99, padding: "4px 14px",
                  fontSize: 11, fontWeight: 700, color: "white",
                }}>MAIS POPULAR</div>
              )}
              <div style={{ color: p.color, marginBottom: 12 }}><Icon name="package" size={24} color={p.color}/></div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: C.text }}>{p.name}</div>
              <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 20 }}>{p.desc}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: C.textSub }}>R$</span>
                <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 36, color: C.text }}>{p.price}</span>
                <span style={{ fontSize: 13, color: C.textMuted }}>/mês</span>
              </div>
              <button className="btn-primary" onClick={onLogin} style={{ width: "100%", justifyContent: "center", background: p.popular ? C.accent : "transparent", border: `1px solid ${p.color}`, color: p.popular ? "white" : p.color }}>
                Começar agora
              </button>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Icon name="check" size={13} color={p.color}/> <span style={{ fontSize: 13, color: C.textSub }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 40px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 60, background: C.card, borderRadius: 24, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
          <div className="floating-orb" style={{ width: 300, height: 300, background: C.accent, top: -100, left: -100, opacity: 0.08 }}/>
          <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 36, color: C.text, marginBottom: 16, position: "relative" }}>
            Pronto para começar?
          </h2>
          <p style={{ color: C.textSub, marginBottom: 32, position: "relative" }}>
            Junte-se a mais de 2.400 restaurantes que já aumentaram seu faturamento com Pulse Delivery.
          </p>
          <button className="btn-primary" onClick={onLogin} style={{ padding: "16px 36px", fontSize: 16, position: "relative" }}>
            Começar 14 dias grátis <Icon name="arrow" size={16}/>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 24, height: 24, background: C.accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", fontFamily: "Syne" }}>P</div>
          <span style={{ fontFamily: "Syne", fontWeight: 700, color: C.text }}>Pulse Delivery</span>
        </div>
        <p style={{ fontSize: 13, color: C.textMuted }}>© 2025 Pulse Delivery. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin, onLanding }) => {
  const [email, setEmail] = useState("demo@pulsedelivery.com");
  const [pass, setPass] = useState("demo123");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
      <div className="floating-orb" style={{ width: 500, height: 500, background: C.accent, top: -200, right: -200, opacity: 0.06 }}/>
      <div className="floating-orb" style={{ width: 400, height: 400, background: C.blue, bottom: -200, left: -200, opacity: 0.06 }}/>
      
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div onClick={onLanding} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, background: C.accent, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "white", fontFamily: "Syne", boxShadow: `0 0 20px ${C.accentGlow}` }}>P</div>
            <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: C.text }}>Pulse Delivery</span>
          </div>
          <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 28, color: C.text, marginBottom: 8 }}>Bem-vindo de volta</h1>
          <p style={{ color: C.textSub, fontSize: 14 }}>Entre na sua conta para continuar</p>
        </div>
        
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: C.textSub, marginBottom: 6, display: "block" }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="seu@email.com"/>
            </div>
            <div>
              <label style={{ fontSize: 13, color: C.textSub, marginBottom: 6, display: "block" }}>Senha</label>
              <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="••••••••"/>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Esqueci minha senha</span>
            </div>
            <button className="btn-primary" onClick={handleLogin} style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: 15 }}>
              {loading ? <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/> : <>Entrar <Icon name="arrow" size={16}/></>}
            </button>
          </div>
          
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: C.border }}/>
            <span style={{ color: C.textMuted, fontSize: 12 }}>ou</span>
            <div style={{ flex: 1, height: 1, background: C.border }}/>
          </div>
          
          <button className="btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
            <Icon name="globe" size={16}/> Entrar com Google
          </button>
        </div>
        
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.textMuted }}>
          Não tem conta? <span style={{ color: C.accent, cursor: "pointer" }}>Criar conta grátis</span>
        </p>
      </div>
    </div>
  );
};

// ─── DASHBOARD VIEW ───────────────────────────────────────────────────────────
const DashboardView = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 400); return () => clearTimeout(t); }, []);
  
  const metrics = [
    { label: "Clientes Ativos", value: "3.847", delta: "+12%", up: true, color: C.green, data: [20,28,25,35,32,42,38,50], icon: "users" },
    { label: "Vendas Recuperadas", value: "R$ 18.430", delta: "+28%", up: true, color: C.accent, data: [10,18,22,20,30,28,35,42], icon: "trending" },
    { label: "Campanhas Enviadas", value: "1.240", delta: "+45%", up: true, color: C.blue, data: [15,22,30,28,35,40,42,48], icon: "send" },
    { label: "Taxa de Retorno", value: "68.4%", delta: "+5%", up: true, color: C.purple, data: [55,58,60,62,61,64,66,68], icon: "zap" },
  ];

  const barData = [
    { l: "Jan", v: 40 }, { l: "Fev", v: 55 }, { l: "Mar", v: 48 }, { l: "Abr", v: 70 },
    { l: "Mai", v: 65 }, { l: "Jun", v: 85 }, { l: "Jul", v: 78 }, { l: "Ago", v: 95 },
  ];

  return (
    <div style={{ padding: 28 }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 4 }}>Dashboard</h1>
          <p style={{ color: C.textMuted, fontSize: 14 }}>Visão geral de hoje — {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-ghost"><Icon name="filter" size={14}/> Filtros</button>
          <button className="btn-primary"><Icon name="plus" size={14}/> Nova campanha</button>
        </div>
      </div>

      {/* METRICS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {metrics.map((m, i) => (
          <div key={i} className="metric-card" style={{ animationDelay: `${i * 0.1}s`, animation: "fadeUp 0.5s ease forwards" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: m.color, borderRadius: "16px 16px 0 0" }}/>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: `${m.color}18`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={m.icon} size={17} color={m.color}/>
              </div>
              <Sparkline data={m.data} color={m.color}/>
            </div>
            {loaded ? (
              <>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 6 }}>{m.value}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.textMuted }}>{m.label}</span>
                  <span className={`badge badge-${m.up ? "up" : "down"}`}>↑ {m.delta}</span>
                </div>
              </>
            ) : (
              <>
                <div className="skeleton" style={{ height: 28, width: "60%", marginBottom: 8 }}/>
                <div className="skeleton" style={{ height: 14, width: "80%" }}/>
              </>
            )}
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text }}>Crescimento de Vendas</h3>
              <p style={{ fontSize: 12, color: C.textMuted }}>Últimos 8 meses</p>
            </div>
            <span className="badge badge-up">↑ 34% vs último período</span>
          </div>
          <BarChart data={barData} color={C.accent}/>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 4 }}>Retenção</h3>
          <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 20 }}>Distribuição de clientes</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[{ label: "Clientes ativos", v: 3847, t: 5000, c: C.green }, { label: "Clientes VIP", v: 412, t: 5000, c: C.yellow }, { label: "Inativos", v: 890, t: 5000, c: "#EF4444" }].map((r, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: C.textSub }}>{r.label}</span>
                  <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{r.v.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(r.v / r.t) * 100}%`, background: r.c }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text }}>Atividade recente</h3>
          <span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Ver tudo</span>
        </div>
        {[
          { icon: "zap", color: C.green, msg: "Rafael Torres voltou após campanha de recuperação", time: "2 min atrás" },
          { icon: "star", color: C.yellow, msg: "Juliana Alves atingiu nível VIP — 47 pedidos", time: "15 min atrás" },
          { icon: "send", color: C.blue, msg: "Campanha 'Fim de Semana' enviada para 1.240 clientes", time: "1h atrás" },
          { icon: "users", color: C.purple, msg: "12 novos clientes cadastrados hoje", time: "2h atrás" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={a.icon} size={15} color={a.color}/>
            </div>
            <span style={{ flex: 1, fontSize: 14, color: C.textSub }}>{a.msg}</span>
            <span style={{ fontSize: 12, color: C.textMuted, whiteSpace: "nowrap" }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── CRM VIEW ─────────────────────────────────────────────────────────────────
const CRMView = ({ onSelectCustomer }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.tag === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 4 }}>CRM de Clientes</h1>
          <p style={{ color: C.textMuted, fontSize: 14 }}>{customers.length} clientes cadastrados</p>
        </div>
        <button className="btn-primary"><Icon name="plus" size={14}/> Novo cliente</button>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}>
            <Icon name="search" size={15}/>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar cliente..." style={{ paddingLeft: 36 }}/>
        </div>
        {["all", "vip", "frequent", "new", "inactive"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className="btn-ghost" style={{ background: filter === f ? C.accentSoft : "transparent", borderColor: filter === f ? "rgba(255,107,53,0.3)" : C.border, color: filter === f ? C.accent : C.textSub }}>
            {f === "all" ? "Todos" : f === "vip" ? "VIP" : f === "frequent" ? "Frequente" : f === "new" ? "Novo" : "Inativo"}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 80px", padding: "12px 20px", borderBottom: `1px solid ${C.border}` }}>
          {["Cliente", "Tag", "Pedidos", "Ticket Médio", "Última Compra", ""].map((h, i) => (
            <span key={i} style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
          ))}
        </div>
        {filtered.map((c, i) => (
          <div key={c.id} className="table-row" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 80px" }} onClick={() => onSelectCustomer(c)}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${C.accent}44, ${C.blue}44)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Syne", fontWeight: 700, fontSize: 13, color: C.text,
              }}>{c.name.split(" ").map(n => n[0]).slice(0,2).join("")}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{c.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{c.email}</div>
              </div>
            </div>
            <div><span className={`tag tag-${c.tag}`}>{c.tag === "vip" ? "⭐ VIP" : c.tag === "new" ? "🔵 Novo" : c.tag === "inactive" ? "🔴 Inativo" : "🟢 Frequente"}</span></div>
            <div style={{ fontSize: 14, color: C.text }}>{c.orders}x</div>
            <div style={{ fontSize: 14, color: C.text }}>R$ {c.avg.toFixed(2)}</div>
            <div style={{ fontSize: 13, color: c.lastOrder.includes("68") || c.lastOrder.includes("42") ? "#EF4444" : C.textSub }}>{c.lastOrder}</div>
            <div><button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>Ver</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── CUSTOMER DETAIL ──────────────────────────────────────────────────────────
const CustomerDetail = ({ customer, onBack }) => (
  <div style={{ padding: 28 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <button className="btn-ghost" onClick={onBack} style={{ padding: "8px 14px" }}>← Voltar</button>
      <span style={{ color: C.textMuted }}>/ CRM /</span>
      <span style={{ color: C.text }}>{customer.name}</span>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
      <div>
        <div className="card" style={{ padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: `linear-gradient(135deg, ${C.accent}55, ${C.blue}55)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, fontSize: 24, color: C.text }}>
              {customer.name.split(" ").map(n => n[0]).slice(0,2).join("")}
            </div>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: C.text }}>{customer.name}</div>
              <div style={{ fontSize: 13, color: C.textMuted }}>{customer.email}</div>
              <div style={{ fontSize: 13, color: C.textMuted }}>{customer.phone}</div>
            </div>
            <span className={`tag tag-${customer.tag}`} style={{ fontSize: 12 }}>{customer.tag.toUpperCase()}</span>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 16 }}>Estatísticas</h3>
          {[
            { label: "Total gasto", value: `R$ ${customer.spent.toLocaleString()}` },
            { label: "Pedidos", value: customer.orders },
            { label: "Ticket médio", value: `R$ ${customer.avg.toFixed(2)}` },
            { label: "Última compra", value: `há ${customer.lastOrder}` },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: 13, color: C.textMuted }}>{s.label}</span>
              <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="card" style={{ padding: 24, marginBottom: 16 }}>
          <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 16 }}>Campanhas Recebidas</h3>
          {campaigns.slice(0,2).map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="send" size={13} color={C.accent}/>
                </div>
                <div>
                  <div style={{ fontSize: 14, color: C.text }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{c.date}</div>
                </div>
              </div>
              <span className="badge badge-up">Converteu</span>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 16 }}>Notas</h3>
          <textarea placeholder="Adicionar observação sobre este cliente..." style={{ minHeight: 100, resize: "vertical" }}/>
          <button className="btn-primary" style={{ marginTop: 12 }}>Salvar nota</button>
        </div>
      </div>
    </div>
  </div>
);

// ─── AUTOMATIONS VIEW ─────────────────────────────────────────────────────────
const AutomationsView = () => {
  const [autos, setAutos] = useState(automations);
  const [toast, setToast] = useState(null);

  const toggle = (id) => {
    setAutos(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
    const a = autos.find(a => a.id === id);
    setToast(`Automação "${a.name}" ${a.active ? "pausada" : "ativada"}!`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div style={{ padding: 28 }}>
      {toast && <Toast msg={toast} type="success"/>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 4 }}>Recuperação Automática</h1>
          <p style={{ color: C.textMuted, fontSize: 14 }}>Automações inteligentes que trabalham por você 24/7</p>
        </div>
        <button className="btn-primary"><Icon name="plus" size={14}/> Nova automação</button>
      </div>

      {/* FLOW PREVIEW */}
      <div className="card" style={{ padding: 24, marginBottom: 20, background: `linear-gradient(135deg, ${C.card}, ${C.accentSoft})` }}>
        <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 16 }}>Exemplo de fluxo ativo</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {[
            { icon: "users", label: "Cliente inativo\n30 dias", color: "#EF4444" },
            { icon: "zap", label: "Trigger\nautomático", color: C.accent },
            { icon: "whatsapp", label: "WhatsApp\npersonalizado", color: C.green },
            { icon: "star", label: "Cupom\n15% OFF", color: C.yellow },
            { icon: "check", label: "Cliente\nretorna", color: C.green },
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${step.color}20`, border: `1px solid ${step.color}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={step.icon} size={20} color={step.color}/>
                </div>
                <span style={{ fontSize: 11, color: C.textMuted, textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.3 }}>{step.label}</span>
              </div>
              {i < 4 && <div style={{ width: 24, height: 1, background: C.border, flexShrink: 0 }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* AUTOMATIONS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {autos.map((a, i) => (
          <div key={a.id} className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 140px 140px 120px 100px", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.active ? C.green : C.textMuted, boxShadow: a.active ? `0 0 8px ${C.green}` : "none" }}/>
                <span style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text }}>{a.name}</span>
              </div>
              <div style={{ fontSize: 13, color: C.textMuted }}>Gatilho: {a.trigger}</div>
              <div style={{ fontSize: 13, color: C.textSub }}>Ação: {a.action}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: C.text }}>{a.sent}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>enviados</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: C.green }}>{a.converted}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>convertidos</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: C.accent }}>{a.rate}%</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>taxa retorno</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className={`switch ${a.active ? "on" : ""}`} onClick={() => toggle(a.id)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── AI VIEW ──────────────────────────────────────────────────────────────────
const AIView = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(null);
  const [toast, setToast] = useState(null);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Você é um especialista em marketing para delivery. Gere uma campanha promocional completa em JSON (apenas JSON, sem markdown) com base nessa intenção: "${prompt}"

Responda APENAS com JSON neste formato:
{
  "headline": "título impactante",
  "subheadline": "subtítulo com benefício",
  "copy": "texto principal da campanha (2-3 linhas)",
  "cta": "chamada para ação",
  "instagram": "legenda para Instagram com emojis",
  "whatsapp": "mensagem para WhatsApp com emojis",
  "promo": "descrição da promoção (ex: 20% OFF no combo X)"
}`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      setResult({
        headline: "Hoje é dia de economizar! 🍔",
        subheadline: "Aproveite nossas ofertas exclusivas de fim de semana",
        copy: "Pedidos acima de R$ 50 ganham 20% de desconto automático. Válido somente hoje!",
        cta: "PEDIR AGORA COM DESCONTO",
        instagram: "🔥 Fim de semana com tudo! Peça agora e economize 20% em qualquer combo acima de R$ 50. Use o cupom WEEKEND20 👇 Link na bio!",
        whatsapp: "Olá! 👋 Hoje tem promoção especial pra você: 20% OFF em qualquer pedido acima de R$ 50! Use o cupom WEEKEND20. Clique aqui para pedir agora 🍕",
        promo: "20% OFF em pedidos acima de R$ 50 • Válido hoje até meia-noite"
      });
    }
    setLoading(false);
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setToast("Copiado para a área de transferência!");
      setTimeout(() => { setCopied(null); setToast(null); }, 2000);
    });
  };

  const presets = ["Quero aumentar vendas hoje", "Promoção para o fim de semana", "Recuperar clientes inativos", "Lançar novo combo especial"];

  return (
    <div style={{ padding: 28 }}>
      {toast && <Toast msg={toast} type="success"/>}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.blueGlow, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="ai" size={16} color={C.blue}/>
          </div>
          <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text }}>IA de Promoções</h1>
        </div>
        <p style={{ color: C.textMuted, fontSize: 14 }}>Descreva sua intenção e a IA gera a campanha completa em segundos</p>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 20, background: `linear-gradient(135deg, ${C.card}, rgba(59,130,246,0.05))`, border: `1px solid rgba(59,130,246,0.2)` }}>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Ex: Quero aumentar vendas hoje, promoção de fim de semana..." style={{ minHeight: 80, marginBottom: 16, resize: "vertical", background: C.surface }}/>
        
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {presets.map((p, i) => (
            <button key={i} className="btn-ghost" onClick={() => setPrompt(p)} style={{ fontSize: 12, padding: "6px 12px" }}>{p}</button>
          ))}
        </div>
        
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" onClick={generate} style={{ padding: "11px 24px" }}>
            {loading ? <><div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/> Gerando...</> : <><Icon name="zap" size={14}/> Gerar campanha</>}
          </button>
          {result && <button className="btn-ghost" onClick={generate}><Icon name="refresh" size={14}/> Regenerar</button>}
        </div>
      </div>

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 80, borderRadius: 12 }}/>)}
        </div>
      )}

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, animation: "fadeUp 0.4s ease" }}>
          {[
            { key: "headline", label: "Headline", icon: "trending", color: C.accent },
            { key: "subheadline", label: "Subheadline", icon: "trending", color: C.blue },
            { key: "copy", label: "Copy principal", icon: "send", color: C.purple },
            { key: "cta", label: "CTA", icon: "zap", color: C.green },
            { key: "instagram", label: "Instagram", icon: "globe", color: C.purple },
            { key: "whatsapp", label: "WhatsApp", icon: "whatsapp", color: C.green },
          ].map(({ key, label, icon, color }) => (
            <div key={key} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={icon} size={13} color={color}/>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
                </div>
                <button className="btn-ghost" onClick={() => copy(result[key], key)} style={{ padding: "5px 10px", fontSize: 12, color: copied === key ? C.green : C.textSub }}>
                  {copied === key ? <><Icon name="check" size={12} color={C.green}/> Copiado!</> : <><Icon name="copy" size={12}/> Copiar</>}
                </button>
              </div>
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>{result[key]}</p>
            </div>
          ))}
          <div className="card" style={{ padding: 20, gridColumn: "1/-1", borderColor: C.yellow + "44" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.yellow, textTransform: "uppercase", letterSpacing: "0.05em" }}>🎁 Promoção sugerida</span>
              <button className="btn-primary" style={{ padding: "6px 14px", fontSize: 12 }}>Salvar campanha</button>
            </div>
            <p style={{ fontSize: 15, color: C.text, fontWeight: 500 }}>{result.promo}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── LOYALTY VIEW ─────────────────────────────────────────────────────────────
const LoyaltyView = () => {
  const rewards = [
    { icon: "🍔", title: "Burger grátis", points: 500, unlocked: true, progress: 100 },
    { icon: "🍕", title: "Pizza média grátis", points: 1000, unlocked: false, progress: 65 },
    { icon: "🎁", title: "Combo especial", points: 1500, unlocked: false, progress: 30 },
    { icon: "⭐", title: "Status VIP 3 meses", points: 3000, unlocked: false, progress: 15 },
  ];

  const userPoints = 650;

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 4 }}>Sistema de Fidelidade</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>Gamifique a experiência e fidelize seus clientes</p>
      </div>

      {/* USER POINTS */}
      <div className="card" style={{ padding: 28, marginBottom: 20, background: `linear-gradient(135deg, rgba(245,158,11,0.08), ${C.card})`, border: `1px solid rgba(245,158,11,0.2)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 4 }}>Seus pontos acumulados</div>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 48, color: C.yellow }}>
              {userPoints} <span style={{ fontSize: 18, color: C.textMuted }}>pts</span>
            </div>
            <div style={{ fontSize: 13, color: C.textSub }}>350 pontos para o próximo prêmio</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 4 }}>Próxima recompensa</div>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 22, color: C.text }}>🍕 Pizza grátis</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>1.000 pontos necessários</div>
          </div>
        </div>
        <div className="progress-bar" style={{ height: 8 }}>
          <div className="progress-fill" style={{ width: `${(userPoints / 1000) * 100}%`, background: `linear-gradient(90deg, ${C.yellow}, #FF6B35)` }}/>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 12, color: C.textMuted }}>0</span>
          <span style={{ fontSize: 12, color: C.textMuted }}>1.000 pts</span>
        </div>
      </div>

      {/* RULES */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 16 }}>Como ganhar pontos</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { emoji: "🛍️", label: "A cada R$ 1 gasto", points: "1 ponto" },
            { emoji: "⭐", label: "Avaliação 5 estrelas", points: "20 pontos" },
            { emoji: "👥", label: "Indicar amigo", points: "50 pontos" },
          ].map((r, i) => (
            <div key={i} style={{ background: C.surface, borderRadius: 12, padding: "16px", textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{r.emoji}</div>
              <div style={{ fontSize: 12, color: C.textSub, marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, color: C.yellow }}>{r.points}</div>
            </div>
          ))}
        </div>
      </div>

      {/* REWARDS */}
      <div>
        <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 16 }}>Recompensas</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {rewards.map((r, i) => (
            <div key={i} className="card" style={{ padding: 20, opacity: r.unlocked ? 1 : 0.85, border: r.unlocked ? `1px solid ${C.yellow}44` : `1px solid ${C.border}` }}>
              <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 36 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{r.points} pontos</div>
                </div>
                {r.unlocked && <span className="badge badge-up">Disponível!</span>}
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${r.progress}%`, background: r.unlocked ? C.yellow : C.accent }}/>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontSize: 11, color: C.textMuted }}>{r.progress}% concluído</span>
                {r.unlocked && <button className="btn-primary" style={{ padding: "4px 12px", fontSize: 12 }}>Resgatar</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── CAMPAIGNS VIEW ───────────────────────────────────────────────────────────
const CampaignsView = () => (
  <div style={{ padding: 28 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
      <div>
        <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 4 }}>Campanhas</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>Gerencie e acompanhe suas campanhas</p>
      </div>
      <button className="btn-primary"><Icon name="plus" size={14}/> Nova campanha</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
      {[
        { label: "Enviadas este mês", value: "1.240", color: C.accent },
        { label: "Taxa de abertura", value: "72%", color: C.green },
        { label: "Receita gerada", value: "R$ 27.780", color: C.purple },
      ].map((m, i) => (
        <div key={i} className="metric-card" style={{ padding: 20 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: m.color, borderRadius: "16px 16px 0 0" }}/>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>{m.label}</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 26, color: C.text }}>{m.value}</div>
        </div>
      ))}
    </div>

    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 100px 100px 100px 120px 100px", gap: 12 }}>
          {["Campanha", "Alcance", "Abertos", "Convertidos", "Receita", "Data"].map(h => (
            <span key={h} style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</span>
          ))}
        </div>
      </div>
      {campaigns.map((c, i) => (
        <div key={i} className="table-row" style={{ gridTemplateColumns: "2fr 100px 100px 100px 120px 100px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="send" size={15} color={C.accent}/>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{c.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>{c.type}</div>
            </div>
          </div>
          <span style={{ fontSize: 14, color: C.text }}>{c.reach.toLocaleString()}</span>
          <span style={{ fontSize: 14, color: C.text }}>{c.opened.toLocaleString()}</span>
          <span style={{ fontSize: 14, color: C.green, fontWeight: 600 }}>{c.converted}</span>
          <span style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>R$ {c.revenue.toLocaleString()}</span>
          <span style={{ fontSize: 13, color: C.textMuted }}>{c.date}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── PLANS VIEW ───────────────────────────────────────────────────────────────
const PlansView = () => {
  const [current, setCurrent] = useState("Pro");
  const [toast, setToast] = useState(null);
  
  const change = (name) => {
    if (name === current) return;
    setToast(`Plano alterado para ${name}!`);
    setCurrent(name);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div style={{ padding: 28 }}>
      {toast && <Toast msg={toast}/>}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 4 }}>Assinatura</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>Gerencie seu plano e cobrança</p>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 4 }}>Plano atual</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 22, color: C.accent }}>Pro — R$ 197/mês</div>
          <div style={{ fontSize: 13, color: C.textSub }}>Próxima cobrança em 14 de julho de 2025</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-ghost">Gerenciar cartão</button>
          <button className="btn-ghost" style={{ color: "#EF4444", borderColor: "#EF444430" }}>Cancelar plano</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {plans.map((p, i) => (
          <div key={i} className="card" style={{
            padding: 24, position: "relative",
            border: current === p.name ? `1px solid ${p.color}` : `1px solid ${C.border}`,
            boxShadow: current === p.name ? `0 0 30px ${p.color}20` : "none",
          }}>
            {current === p.name && (
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <span className="badge badge-up">Atual</span>
              </div>
            )}
            <div style={{ color: p.color, marginBottom: 12 }}><Icon name="package" size={22} color={p.color}/></div>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: C.text }}>{p.name}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2, margin: "12px 0 16px" }}>
              <span style={{ fontSize: 12, color: C.textSub }}>R$</span>
              <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 30, color: C.text }}>{p.price}</span>
              <span style={{ fontSize: 12, color: C.textMuted }}>/mês</span>
            </div>
            {p.features.slice(0, 4).map((f, j) => (
              <div key={j} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <Icon name="check" size={12} color={p.color}/> <span style={{ fontSize: 13, color: C.textSub }}>{f}</span>
              </div>
            ))}
            <button onClick={() => change(p.name)} className="btn-primary" style={{
              width: "100%", justifyContent: "center", marginTop: 16,
              background: current === p.name ? "transparent" : p.color,
              border: `1px solid ${p.color}`,
              color: current === p.name ? p.color : "white",
            }}>
              {current === p.name ? "Plano atual" : current === "Starter" ? "Fazer upgrade" : p.price < 197 ? "Fazer downgrade" : "Fazer upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── ADMIN VIEW ───────────────────────────────────────────────────────────────
const AdminView = () => (
  <div style={{ padding: 28 }}>
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 99, padding: "4px 12px", marginBottom: 10 }}>
        <Icon name="shield" size={12} color="#EF4444"/>
        <span style={{ fontSize: 12, color: "#EF4444", fontWeight: 600 }}>PAINEL ADMIN</span>
      </div>
      <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 4 }}>Admin SaaS</h1>
      <p style={{ color: C.textMuted, fontSize: 14 }}>Visão global da plataforma</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
      {[
        { label: "MRR", value: "R$ 284K", delta: "+18%", color: C.green },
        { label: "Usuários ativos", value: "2.430", delta: "+12%", color: C.blue },
        { label: "Churn Rate", value: "2.1%", delta: "-0.3%", color: C.accent },
        { label: "NPS", value: "72", delta: "+5pts", color: C.purple },
      ].map((m, i) => (
        <div key={i} className="metric-card" style={{ padding: 20 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: m.color, borderRadius: "16px 16px 0 0" }}/>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 6 }}>{m.label}</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: C.text, marginBottom: 4 }}>{m.value}</div>
          <span className="badge badge-up" style={{ fontSize: 10 }}>{m.delta}</span>
        </div>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 16 }}>Distribuição de planos</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[{ label: "Pro", v: 1240, t: 2430, c: C.accent }, { label: "Starter", v: 890, t: 2430, c: C.blue }, { label: "Premium", v: 300, t: 2430, c: C.purple }].map((r, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: C.textSub }}>{r.label}</span>
                <span style={{ fontSize: 13, color: C.text }}>{r.v.toLocaleString()} usuários</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(r.v / r.t) * 100}%`, background: r.c }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 16 }}>Usuários recentes</h3>
        {[
          { name: "Burger Palace SP", plan: "Pro", date: "hoje" },
          { name: "Pizza Master RJ", plan: "Starter", date: "ontem" },
          { name: "Sushi Express BH", plan: "Premium", date: "2 dias" },
          { name: "Taco Zone POA", plan: "Pro", date: "3 dias" },
        ].map((u, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <div>
              <div style={{ fontSize: 14, color: C.text }}>{u.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>{u.date}</div>
            </div>
            <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: C.accentSoft, color: C.accent }}>{u.plan}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar = ({ view, setView }) => {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "crm", label: "CRM Clientes", icon: "users" },
    { id: "automations", label: "Recuperação", icon: "zap" },
    { id: "ai", label: "IA Promoções", icon: "ai" },
    { id: "loyalty", label: "Fidelidade", icon: "star" },
    { id: "campaigns", label: "Campanhas", icon: "send" },
    { id: "plans", label: "Assinatura", icon: "credit" },
    { id: "admin", label: "Admin", icon: "admin" },
  ];

  return (
    <div style={{
      width: 220, background: C.surface, borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0,
      flexShrink: 0, overflowY: "auto",
    }}>
      {/* LOGO */}
      <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 32, height: 32, background: C.accent, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "white", fontFamily: "Syne", boxShadow: `0 0 14px ${C.accentGlow}`, animation: "glow 3s ease infinite" }}>P</div>
          <div>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15, color: C.text }}>Pulse</div>
            <div style={{ fontSize: 10, color: C.textMuted }}>Delivery CRM</div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{ padding: 10, flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, padding: "8px 8px 4px", letterSpacing: "0.1em" }}>MENU</div>
        {nav.map(item => (
          <div key={item.id} className={`nav-item ${view === item.id ? "active" : ""}`} onClick={() => setView(item.id)}>
            <Icon name={item.icon} size={16} color={view === item.id ? C.accent : C.textSub}/>
            <span>{item.label}</span>
            {item.id === "ai" && <div style={{ marginLeft: "auto", background: C.blue, color: "white", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 99 }}>IA</div>}
            {item.id === "automations" && <div style={{ marginLeft: "auto" }}><div className="dot-online" style={{ width: 6, height: 6 }}/></div>}
          </div>
        ))}
      </div>

      {/* USER */}
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${C.accent}55, ${C.blue}55)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 700, fontSize: 12, color: C.text }}>JB</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>João Barros</div>
            <div style={{ fontSize: 11, color: C.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Plano Pro</div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}>
            <Icon name="settings" size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── APP SHELL ────────────────────────────────────────────────────────────────
const AppShell = ({ onLogout }) => {
  const [view, setView] = useState("dashboard");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);

  const renderView = () => {
    if (selectedCustomer && view === "crm") return <CustomerDetail customer={selectedCustomer} onBack={() => setSelectedCustomer(null)}/>;
    switch (view) {
      case "dashboard": return <DashboardView/>;
      case "crm": return <CRMView onSelectCustomer={(c) => setSelectedCustomer(c)}/>;
      case "automations": return <AutomationsView/>;
      case "ai": return <AIView/>;
      case "loyalty": return <LoyaltyView/>;
      case "campaigns": return <CampaignsView/>;
      case "plans": return <PlansView/>;
      case "admin": return <AdminView/>;
      default: return <DashboardView/>;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar view={view} setView={(v) => { setView(v); setSelectedCustomer(null); }}/>
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* TOP BAR */}
        <div style={{
          height: 56, background: C.surface, borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", padding: "0 24px", gap: 12, position: "sticky", top: 0, zIndex: 50,
        }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}>
              <Icon name="search" size={14}/>
            </div>
            <input placeholder="Buscar..." style={{ paddingLeft: 32, height: 34, background: C.bg, fontSize: 13 }}/>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="badge" style={{ background: C.accentSoft, color: C.accent, fontSize: 11 }}>Pro</span>
            <div style={{ position: "relative" }}>
              <button className="btn-ghost" style={{ padding: "8px 10px" }} onClick={() => setNotifOpen(!notifOpen)}>
                <Icon name="bell" size={16}/>
                <div style={{ position: "absolute", top: 4, right: 6, width: 7, height: 7, background: "#EF4444", borderRadius: "50%", border: `2px solid ${C.surface}` }}/>
              </button>
              {notifOpen && (
                <div style={{ position: "absolute", right: 0, top: 44, width: 300, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 8, boxShadow: "0 16px 40px rgba(0,0,0,0.5)", zIndex: 200 }}>
                  {[
                    { msg: "Rafael Torres voltou! +R$ 89,90", time: "2 min" },
                    { msg: "Nova campanha converteu 12%", time: "1h" },
                    { msg: "Automação 'VIP' atingiu 84% de retorno", time: "3h" },
                  ].map((n, i) => (
                    <div key={i} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = C.cardHover}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <div style={{ fontSize: 13, color: C.text, marginBottom: 2 }}>{n.msg}</div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>{n.time} atrás</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="btn-ghost" style={{ padding: "8px 10px" }} onClick={onLogout} title="Sair">
              <Icon name="logout" size={16}/>
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {renderView()}
        </div>
      </div>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function PulseDelivery() {
  const [screen, setScreen] = useState("landing"); // landing | login | app

  return (
    <>
      <style>{globalStyles}</style>
      {screen === "landing" && <LandingPage onLogin={() => setScreen("login")}/>}
      {screen === "login" && <LoginPage onLogin={() => setScreen("app")} onLanding={() => setScreen("landing")}/>}
      {screen === "app" && <AppShell onLogout={() => setScreen("landing")}/>}
    </>
  );
}
