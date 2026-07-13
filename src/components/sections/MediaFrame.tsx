import type { ProjectMedia } from "@/lib/data";

/**
 * Renders a project's screenshot or screen recording. Placeholder media are
 * SVG mockups; when a real mp4/webm is set on `media.video`, the image
 * becomes its poster automatically.
 */
export function MediaFrame({
  media,
  className,
}: {
  media: ProjectMedia;
  className?: string;
}) {
  if (media.video) {
    return (
      <video
        className={className}
        poster={media.image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
      >
        <source src={media.video} />
      </video>
    );
  }
  return (
    // Placeholder mockups are SVG; a plain img keeps them crisp at any size.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={media.image} alt={media.alt} loading="lazy" className={className} />
  );
}
