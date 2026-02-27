import { Link } from "react-router-dom";

export interface SeoLink {
  text: string;
  href: string;
  title: string;
}

export interface SeoMedia {
  type: "image" | "icon" | "video";
  src: string;
  alt: string;
  title: string;
  width?: number;
  height?: number;
}

export interface SeoSection {
  heading?: string;
  paragraphs: string[];
  links?: SeoLink[];
  media?: SeoMedia[];
}

interface SeoContentBlockProps {
  title: string;
  sections: SeoSection[];
}

export function SeoContentBlock({ title, sections }: SeoContentBlockProps) {
  return (
    <section className="w-full border-t border-border/40 mt-8 sm:mt-12 pt-6 sm:pt-8 pb-8 sm:pb-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">{title}</h2>

        {sections.map((section, sIdx) => (
          <article key={sIdx} className="space-y-3">
            {section.heading && (
              <h3 className="text-sm sm:text-base font-semibold text-foreground/90">
                {section.heading}
              </h3>
            )}

            {section.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-xs sm:text-sm leading-relaxed text-muted-foreground"
              >
                {p}
              </p>
            ))}

            {/* Internal links */}
            {section.links && section.links.length > 0 && (
              <nav className="flex flex-wrap gap-2 pt-1">
                {section.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    to={link.href}
                    title={link.title}
                    className="text-xs font-medium text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>
            )}

            {/* Media: images, icons, videos */}
            {section.media && section.media.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {section.media.map((m, mIdx) => {
                  if (m.type === "video") {
                    return (
                      <video
                        key={mIdx}
                        src={m.src}
                        title={m.title}
                        aria-label={m.alt}
                        controls
                        preload="metadata"
                        className="rounded-lg border border-border/40 max-w-full"
                        width={m.width || 320}
                        height={m.height || 180}
                      >
                        {m.alt}
                      </video>
                    );
                  }
                  return (
                    <img
                      key={mIdx}
                      src={m.src}
                      alt={m.alt}
                      title={m.title}
                      width={m.width || 120}
                      height={m.height || 80}
                      loading="lazy"
                      className="rounded-lg border border-border/40 object-cover"
                    />
                  );
                })}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
