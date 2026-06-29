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
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#d6ff3f" }} />
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
