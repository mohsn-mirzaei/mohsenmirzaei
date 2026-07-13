import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, #d6ff3f 0%, rgba(214,255,63,0) 70%)",
            opacity: 0.5,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#82827c", fontSize: 26, letterSpacing: 6 }}>
          <svg width="40" height="27" viewBox="225 5 555 370" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="-4" x2="278" y2="-4" transform="matrix(0.824459 0.565921 -0.582645 0.812727 256.254 39.9062)" stroke="#d6ff3f" strokeWidth="8" strokeLinecap="round" />
            <line x1="4" y1="-4" x2="306" y2="-4" transform="matrix(0.823845 0.566815 -0.583539 0.812085 244 86.6465)" stroke="#d6ff3f" strokeWidth="8" strokeLinecap="round" />
            <line x1="4" y1="-4" x2="286" y2="-4" transform="matrix(0.000267423 -1 1 0.000256051 251.098 369.953)" stroke="#d6ff3f" strokeWidth="8" strokeLinecap="round" />
            <line x1="344" y1="366" x2="344" y2="207" stroke="#d6ff3f" strokeWidth="8" strokeLinecap="round" />
            <line x1="662" y1="366" x2="662" y2="207" stroke="#d6ff3f" strokeWidth="8" strokeLinecap="round" />
            <line x1="748" y1="366" x2="748" y2="84" stroke="#d6ff3f" strokeWidth="8" strokeLinecap="round" />
            <line x1="4" y1="-4" x2="278" y2="-4" transform="matrix(-0.824459 0.565921 0.582645 0.812727 745.156 39.9062)" stroke="#d6ff3f" strokeWidth="8" strokeLinecap="round" />
            <line x1="4" y1="-4" x2="305" y2="-4" transform="matrix(-0.815304 0.579034 -0.59575 -0.80317 747.977 79.6699)" stroke="#d6ff3f" strokeWidth="8" strokeLinecap="round" />
            <rect x="492.5" y="193.5" width="16" height="16" rx="8" fill="#d6ff3f" />
            <rect x="744.5" y="20.5" width="16" height="16" rx="8" fill="#d6ff3f" />
            <rect x="242.5" y="20.5" width="16" height="16" rx="8" fill="#d6ff3f" />
            <rect x="335.5" y="141.5" width="16" height="16" rx="8" fill="#d6ff3f" />
            <rect x="337" y="143" width="13" height="13" rx="6.5" fill="#08080a" />
            <rect x="653.5" y="138.5" width="16" height="16" rx="8" fill="#d6ff3f" />
            <rect x="655" y="140" width="13" height="13" rx="6.5" fill="#08080a" />
          </svg>
          PORTFOLIO · {new Date().getFullYear()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 132, color: "#ededed", fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, color: "#d6ff3f", fontWeight: 600 }}>
            {site.roleLong}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#b7b7b2", fontSize: 28 }}>
          <span>React · TypeScript · Next.js · Real-time · AI</span>
          <span style={{ color: "#82827c" }}>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
