import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type {
  SeoBlockConfig,
  SeoContentItem,
} from "@/lib/seo-content";

interface SeoContentBlockProps {
  config: SeoBlockConfig;
  className?: string;
}

function RenderItem({ item }: { item: SeoContentItem }) {
  switch (item.type) {
    case "text":
      return (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.content}
        </p>
      );

    case "heading": {
      const Tag = `h${item.level ?? 3}` as keyof JSX.IntrinsicElements;
      return (
        <Tag className="text-sm font-semibold text-foreground pt-1">
          {item.content}
        </Tag>
      );
    }

    case "link":
      return (
        <p className="text-sm">
          <Link
            to={item.href}
            title={item.title}
            className="text-primary hover:underline underline-offset-2 font-medium"
          >
            {item.text}
          </Link>
        </p>
      );

    case "image":
      return (
        <figure className="my-1">
          <img
            src={item.src}
            alt={item.alt}
            title={item.title}
            width={item.width}
            height={item.height}
            loading="lazy"
            className="rounded-lg max-w-full h-auto border border-border/40"
          />
        </figure>
      );

    case "video":
      return (
        <figure className="my-1">
          <video
            src={item.src}
            title={item.title}
            poster={item.poster}
            controls
            preload="none"
            className="rounded-lg max-w-full border border-border/40"
          >
            Your browser does not support the video tag.
          </video>
        </figure>
      );

    default:
      return null;
  }
}

export function SeoContentBlock({ config, className }: SeoContentBlockProps) {
  return (
    <section
      className={`border-t border-border/40 pt-8 pb-4 ${className ?? ""}`}
      aria-label={config.heading}
    >
      <h2 className="text-base font-semibold text-foreground mb-4">
        {config.heading}
      </h2>

      <Accordion type="multiple" className="space-y-1">
        {config.sections.map((section, idx) => (
          <AccordionItem
            key={idx}
            value={`seo-${idx}`}
            className="border border-border/40 rounded-lg px-4 bg-card"
          >
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-3">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pb-4">
              {section.items.map((item, itemIdx) => (
                <RenderItem key={itemIdx} item={item} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
