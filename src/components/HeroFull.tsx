import Image from "next/image";
import React from "react";

/**
 * HeroFull
 * - Fullscreen hero area **under** a fixed/sticky header.
 * - Sets height to: 100vh - headerHeight
 * - Aligns image **top** to match the header bar (object-top).
 *
 * Props:
 * - src: image path (default: /hero-formuleplus.webp, fallback /hero-formuleplus.png in your codebase)
 * - headerHeight: height of your header in px (default 72)
 * - className: pass extra classes to wrapper if needed
 */
export default function HeroFull({
  src = "/hero-formuleplus.webp",
  headerHeight = 72,
  className = "",
}: {
  src?: string;
  headerHeight?: number;
  className?: string;
}) {
  const style = { height: `calc(100vh - ${headerHeight}px)` } as React.CSSProperties;
  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={style}
      aria-label="Hero"
    >
      <Image
        src={src}
        alt="FormulePlus hero"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      {/* No overlay text by default (as requested). Add children if needed. */}
    </section>
  );
}
