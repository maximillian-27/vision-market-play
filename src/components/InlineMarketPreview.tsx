import { useState } from "react";
import { MarketDialog } from "@/components/MarketDialog";

interface InlineMarketPreviewProps {
  id: string;
  title: string;
  image: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
}

export function InlineMarketPreview({ id, title, image, yesPrice, noPrice, volume }: InlineMarketPreviewProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors text-left group mt-2"
      >
        <img
          src={image}
          alt=""
          className="h-6 w-6 rounded object-cover flex-shrink-0"
        />
        <span className="text-sm truncate flex-1 group-hover:text-foreground text-foreground/90">
          {title}
        </span>
        <span className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-success/10 text-success">
            Yes {yesPrice}¢
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
            No {noPrice}¢
          </span>
        </span>
      </button>
      <MarketDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        market={{
          id,
          title,
          image,
          creator: { name: "Unknown", avatar: "" },
          outcomes: [
            { label: "Yes", price: yesPrice },
            { label: "No", price: noPrice },
          ],
          volume,
          endsIn: "TBD",
        }}
      />
    </>
  );
}
