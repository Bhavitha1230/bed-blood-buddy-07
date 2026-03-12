import { AppLayout } from "@/components/AppLayout";
import { StatusPill } from "@/components/StatusPill";
import { alerts, formatTimeAgo } from "@/data/mockData";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const AlertsPage = () => {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "resolved">("all");

  const filtered = alerts.filter((a) => {
    if (filter === "all") return !a.resolved;
    if (filter === "resolved") return a.resolved;
    return a.severity === filter && !a.resolved;
  });

  return (
    <AppLayout title="Emergency Alerts" subtitle={`${alerts.filter(a => !a.resolved).length} active alerts`}>
      <div className="flex items-center gap-2 mb-6">
        {(["all", "critical", "warning", "resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors duration-150 ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground shadow-card"
            }`}
          >
            {f === "all" ? "Active" : f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <CheckCircle2 className="h-10 w-10 text-status-green-ring mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">No alerts in this category</p>
            <p className="text-xs text-muted-foreground mt-1">All clear.</p>
          </div>
        )}
        {filtered.map((alert) => (
          <div key={alert.id} className={`bg-card rounded-xl shadow-card p-5 flex items-start gap-4 ${alert.severity === "critical" && !alert.resolved ? "border-l-4 border-status-red-ring animate-pulse-alert" : ""}`}>
            <div className={`rounded-full p-2 flex-shrink-0 ${alert.severity === "critical" ? "bg-status-red-bg" : alert.resolved ? "bg-accent" : "bg-status-yellow-bg"}`}>
              {alert.resolved ? (
                <CheckCircle2 className="h-4 w-4 text-status-green-text" />
              ) : (
                <AlertTriangle className={`h-4 w-4 ${alert.severity === "critical" ? "text-status-red-text" : "text-status-yellow-text"}`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{alert.hospital_name}</p>
                <StatusPill
                  status={alert.resolved ? "green" : alert.severity === "critical" ? "red" : "yellow"}
                  label={alert.resolved ? "Resolved" : alert.severity === "critical" ? "Critical" : "Warning"}
                />
                <span className="ml-auto text-[10px] font-mono-data text-muted-foreground flex-shrink-0">{formatTimeAgo(alert.created_at)}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
              <p className="mt-1 text-xs text-muted-foreground capitalize">{alert.resource_type} resource</p>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default AlertsPage;
