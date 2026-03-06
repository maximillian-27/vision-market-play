import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Database, Wifi, HardDrive } from "lucide-react";

const services = [
  { name: "API Gateway", status: "Healthy", uptime: "99.97%", latency: "45ms", icon: Server },
  { name: "Blockchain RPC", status: "Healthy", uptime: "99.92%", latency: "120ms", icon: Wifi },
  { name: "Wallet Service", status: "Degraded", uptime: "98.50%", latency: "380ms", icon: HardDrive },
  { name: "Database", status: "Healthy", uptime: "99.99%", latency: "12ms", icon: Database },
  { name: "Cache Layer", status: "Healthy", uptime: "99.98%", latency: "3ms", icon: Server },
  { name: "Message Queue", status: "Healthy", uptime: "99.95%", latency: "8ms", icon: Server },
];

export const AdminSystemHealth = () => {
  const healthy = services.filter(s => s.status === "Healthy").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Badge className={`text-sm px-3 py-1 border-0 ${healthy === services.length ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
          {healthy === services.length ? "All Systems Operational" : `${services.length - healthy} Service(s) Degraded`}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <Card key={s.name} className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                  <p className="font-semibold text-sm">{s.name}</p>
                </div>
                <div className={`h-2.5 w-2.5 rounded-full ${s.status === "Healthy" ? "bg-success" : "bg-warning"}`} />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={s.status === "Healthy" ? "text-success" : "text-warning"}>{s.status}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Uptime</span><span className="font-medium">{s.uptime}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Latency</span><span>{s.latency}</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
