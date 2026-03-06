import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DetailField {
  label: string;
  value: string | number | React.ReactNode;
}

interface DetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  badge?: { label: string; variant?: "default" | "secondary" | "destructive" | "outline" };
  fields: DetailField[];
}

export const DetailDrawer = ({ open, onOpenChange, title, badge, fields }: DetailDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[480px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-base">{title}</SheetTitle>
            {badge && <Badge variant={badge.variant || "default"} className="text-xs">{badge.label}</Badge>}
          </div>
        </SheetHeader>
        <Separator className="mb-4" />
        <div className="space-y-4">
          {fields.map((field, i) => (
            <div key={i} className="flex justify-between items-start gap-4">
              <span className="text-sm text-muted-foreground shrink-0">{field.label}</span>
              <span className="text-sm font-medium text-right">{field.value}</span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
