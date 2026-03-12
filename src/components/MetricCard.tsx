import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
}

export function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight font-mono-data">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          {trend && (
            <p className={`mt-2 text-xs font-medium ${trend.positive ? "text-status-green-text" : "text-status-red-text"}`}>
              {trend.value}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
    </div>
  );
}
