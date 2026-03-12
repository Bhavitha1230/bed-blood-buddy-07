import { motion } from "framer-motion";
import { Droplets, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { bloodUnits, totalBlood } from "@/data/mockData";

const statusConfig = {
  available: { label: "Available", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  low: { label: "Low Stock", color: "text-warning", bg: "bg-warning/10", icon: Info },
  critical: { label: "Critical", color: "text-emergency", bg: "bg-emergency/10", icon: AlertTriangle },
};

const BloodBank = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8">
      <h1 className="font-display font-bold text-3xl mb-2">Blood Bank</h1>
      <p className="text-muted-foreground">Real-time blood availability across all centers</p>
    </div>

    {/* Summary */}
    <div className="bg-gradient-hero rounded-2xl p-6 mb-8 text-primary-foreground">
      <div className="flex items-center gap-3 mb-2">
        <Droplets className="h-6 w-6" />
        <h2 className="font-display font-bold text-xl">Total Inventory</h2>
      </div>
      <p className="text-4xl font-display font-extrabold">{totalBlood} Units</p>
      <p className="opacity-70 text-sm mt-1">Last updated: just now</p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {bloodUnits.map((b, i) => {
        const config = statusConfig[b.status];
        const StatusIcon = config.icon;
        return (
          <motion.div
            key={b.group}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-5 shadow-card border border-border text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-3">
              <span className="text-xl font-display font-extrabold text-primary">{b.group}</span>
            </div>
            <p className="text-3xl font-display font-bold">{b.units}</p>
            <p className="text-xs text-muted-foreground mb-2">Units</p>
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Legend */}
    <div className="mt-8 bg-card rounded-xl p-5 shadow-card border border-border">
      <h3 className="font-display font-semibold mb-3">Status Guide</h3>
      <div className="flex flex-wrap gap-6 text-sm">
        {Object.entries(statusConfig).map(([key, val]) => {
          const Icon = val.icon;
          return (
            <div key={key} className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${val.color}`} />
              <span className="text-muted-foreground">{val.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default BloodBank;
