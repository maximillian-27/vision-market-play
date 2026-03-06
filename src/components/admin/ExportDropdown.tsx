import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface ExportDropdownProps {
  data: Record<string, any>[];
  filename: string;
  className?: string;
  pdfTitle?: string; // kept for API compat, unused
}

const exportCsv = (data: Record<string, any>[], filename: string) => {
  if (!data.length) { toast.error("No data to export"); return; }
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map(row => headers.map(h => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${filename}.csv`; a.click();
  URL.revokeObjectURL(url);
  toast.success(`Exported ${data.length} rows as CSV`);
};

export const ExportDropdown = ({ data, filename, className }: ExportDropdownProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`h-7 text-xs gap-1.5 ${className || ""}`}
      onClick={() => exportCsv(data, filename)}
    >
      <Download className="h-3 w-3" /> Export CSV
    </Button>
  );
};
