import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet, File } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportDropdownProps {
  data: Record<string, any>[];
  filename: string;
  className?: string;
  pdfTitle?: string;
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

const exportXlsx = (data: Record<string, any>[], filename: string) => {
  if (!data.length) { toast.error("No data to export"); return; }
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, `${filename}.xlsx`);
  toast.success(`Exported ${data.length} rows as XLSX`);
};

const exportPdf = (data: Record<string, any>[], filename: string, title?: string) => {
  if (!data.length) { toast.error("No data to export"); return; }
  const doc = new jsPDF({ orientation: "landscape" });
  if (title) {
    doc.setFontSize(16);
    doc.text(title, 14, 20);
  }
  const headers = Object.keys(data[0]);
  autoTable(doc, {
    head: [headers],
    body: data.map(row => headers.map(h => String(row[h] ?? ""))),
    startY: title ? 30 : 14,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 41, 41] },
  });
  doc.save(`${filename}.pdf`);
  toast.success(`Exported ${data.length} rows as PDF`);
};

export const ExportDropdown = ({ data, filename, className, pdfTitle }: ExportDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`h-7 text-xs gap-1.5 ${className || ""}`}>
          <Download className="h-3 w-3" /> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuItem className="gap-2 text-xs" onClick={() => exportCsv(data, filename)}>
          <FileText className="h-3.5 w-3.5" /> CSV
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-xs" onClick={() => exportXlsx(data, filename)}>
          <FileSpreadsheet className="h-3.5 w-3.5" /> XLSX
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-xs" onClick={() => exportPdf(data, filename, pdfTitle)}>
          <File className="h-3.5 w-3.5" /> PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Dashboard-specific PDF export
export const exportDashboardPdf = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Platform Performance Report", 14, 20);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

  // Financial Overview
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text("Financial Overview", 14, 40);
  autoTable(doc, {
    startY: 45,
    head: [["Metric", "Value"]],
    body: [
      ["Trading Volume", "$4.15M"],
      ["Fee Revenue (3%)", "$124.5K"],
      ["Creator Earnings (20%)", "$24.9K"],
      ["Affiliate Earnings (20%)", "$10.1K"],
      ["Gross Platform Revenue", "$124.5K"],
      ["Net Platform Revenue", "$89.5K"],
      ["ARPU", "$2.76"],
      ["Avg Trade Size", "$92.40"],
    ],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 41, 41] },
  });

  // Top Markets
  const y1 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.text("Top Markets", 14, y1);
  autoTable(doc, {
    startY: y1 + 5,
    head: [["Market", "Creator", "Volume", "Fees"]],
    body: [
      ["Bitcoin Price EOY", "CryptoGuru", "$525K", "$15.8K"],
      ["US Election 2024", "PoliticalPredict", "$498K", "$14.9K"],
      ["ETH Merge Impact", "TechOracle", "$267K", "$8.0K"],
      ["AI Breakthrough 2025", "TechOracle", "$154K", "$4.6K"],
      ["Fed Rate Decision", "MarketMaven", "$145K", "$4.4K"],
    ],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 41, 41] },
  });

  // Top Creators
  const y2 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.text("Top Creators", 14, y2);
  autoTable(doc, {
    startY: y2 + 5,
    head: [["Creator", "Markets", "Volume", "Earnings"]],
    body: [
      ["SportsAnalyst", "15", "$1.2M", "$7.2K"],
      ["CryptoGuru", "12", "$890K", "$5.3K"],
      ["TechOracle", "8", "$456K", "$2.7K"],
      ["PoliticalPredict", "5", "$312K", "$1.9K"],
    ],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 41, 41] },
  });

  // Top Affiliates
  const y3 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.text("Top Affiliates", 14, y3);
  autoTable(doc, {
    startY: y3 + 5,
    head: [["Affiliate", "Referred", "Volume", "Earnings"]],
    body: [
      ["PromoQueen", "312", "$567K", "$3.4K"],
      ["ReferKing", "145", "$234K", "$1.4K"],
      ["GrowthHacker", "89", "$156K", "$936"],
      ["MarketingPro", "67", "$98K", "$588"],
    ],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 41, 41] },
  });

  doc.save("platform-report.pdf");
  toast.success("Dashboard report exported as PDF");
};
