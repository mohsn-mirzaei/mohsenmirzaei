"use client";

import { useId } from "react";

/**
 * The "M" brand mark — cropped from the master wordmark logo (public
 * source: my-logo/logo mohsen1.svg). Gradient ids are namespaced per
 * instance via useId so multiple copies (Header + Footer) can render on
 * the same page without id collisions.
 */
export function LogoMark({ className }: { className?: string }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;

  return (
    <svg
      viewBox="225 5 555 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="4" y1="-4" x2="278" y2="-4" transform="matrix(0.824459 0.565921 -0.582645 0.812727 256.254 39.9062)" stroke={`url(#${id("p0")})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="4" y1="-4" x2="306" y2="-4" transform="matrix(0.823845 0.566815 -0.583539 0.812085 244 86.6465)" stroke={`url(#${id("p1")})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="4" y1="-4" x2="286" y2="-4" transform="matrix(0.000267423 -1 1 0.000256051 251.098 369.953)" stroke={`url(#${id("p2")})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="344" y1="366" x2="344" y2="207" stroke={`url(#${id("p3")})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="662" y1="366" x2="662" y2="207" stroke={`url(#${id("p4")})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="748" y1="366" x2="748" y2="84" stroke={`url(#${id("p5")})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="4" y1="-4" x2="278" y2="-4" transform="matrix(-0.824459 0.565921 0.582645 0.812727 745.156 39.9062)" stroke={`url(#${id("p6")})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="4" y1="-4" x2="305" y2="-4" transform="matrix(-0.815304 0.579034 -0.59575 -0.80317 747.977 79.6699)" stroke={`url(#${id("p7")})`} strokeWidth="8" strokeLinecap="round" />
      <rect x="492.5" y="193.5" width="16" height="16" rx="8" fill={`url(#${id("p8")})`} />
      <rect x="492.5" y="193.5" width="16" height="16" rx="8" stroke={`url(#${id("p9")})`} />
      <rect x="744.5" y="20.5" width="16" height="16" rx="8" fill={`url(#${id("p10")})`} />
      <rect x="744.5" y="20.5" width="16" height="16" rx="8" stroke={`url(#${id("p11")})`} />
      <rect x="242.5" y="20.5" width="16" height="16" rx="8" fill={`url(#${id("p12")})`} />
      <rect x="242.5" y="20.5" width="16" height="16" rx="8" stroke={`url(#${id("p13")})`} />
      <rect x="335.5" y="141.5" width="16" height="16" rx="8" fill={`url(#${id("p14")})`} />
      <rect x="335.5" y="141.5" width="16" height="16" rx="8" stroke={`url(#${id("p15")})`} />
      <rect x="337" y="143" width="13" height="13" rx="6.5" fill="#FCFBF6" />
      <rect x="653.5" y="138.5" width="16" height="16" rx="8" fill={`url(#${id("p16")})`} />
      <rect x="653.5" y="138.5" width="16" height="16" rx="8" stroke={`url(#${id("p17")})`} />
      <rect x="655" y="140" width="13" height="13" rx="6.5" fill="#FCFBF6" />
      <defs>
        <linearGradient id={id("p0")} x1="8.97379" y1="-0.598199" x2="239.18" y2="-10.63" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#C4C0AD" />
        </linearGradient>
        <linearGradient id={id("p1")} x1="305.095" y1="-6.25281" x2="283.46" y2="52.8684" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#C4C0AD" />
        </linearGradient>
        <linearGradient id={id("p2")} x1="289.952" y1="-5.1752" x2="4.95309" y2="-0.0989798" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#FFFEFA" />
        </linearGradient>
        <linearGradient id={id("p3")} x1="348.5" y1="370" x2="348.5" y2="203" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#FFFEFA" />
        </linearGradient>
        <linearGradient id={id("p4")} x1="666.5" y1="370" x2="666.5" y2="203" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#FFFEFA" />
        </linearGradient>
        <linearGradient id={id("p5")} x1="745" y1="80" x2="746" y2="370" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#FFFEFA" />
        </linearGradient>
        <linearGradient id={id("p6")} x1="0" y1="0.5" x2="282" y2="0.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#C4C0AD" />
        </linearGradient>
        <linearGradient id={id("p7")} x1="152.92" y1="-12.737" x2="301.171" y2="-12.4703" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#FFFEFA" />
        </linearGradient>
        <linearGradient id={id("p8")} x1="500.5" y1="193" x2="500.5" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#C4C0AD" />
        </linearGradient>
        <linearGradient id={id("p9")} x1="500.5" y1="193" x2="500.5" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#999896" />
        </linearGradient>
        <linearGradient id={id("p10")} x1="752.5" y1="20" x2="752.5" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#C4C0AD" />
        </linearGradient>
        <linearGradient id={id("p11")} x1="752.5" y1="20" x2="752.5" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#999896" />
        </linearGradient>
        <linearGradient id={id("p12")} x1="250.5" y1="20" x2="250.5" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#C4C0AD" />
        </linearGradient>
        <linearGradient id={id("p13")} x1="250.5" y1="20" x2="250.5" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#999896" />
        </linearGradient>
        <linearGradient id={id("p14")} x1="342.82" y1="141" x2="343" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#F5F3EC" />
        </linearGradient>
        <linearGradient id={id("p15")} x1="343.5" y1="141" x2="343.5" y2="158" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#FFFEFA" />
        </linearGradient>
        <linearGradient id={id("p16")} x1="660.82" y1="138" x2="661" y2="152" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#F5F3EC" />
        </linearGradient>
        <linearGradient id={id("p17")} x1="661.5" y1="138" x2="661.5" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C0AD" />
          <stop offset="1" stopColor="#FFFEFA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
