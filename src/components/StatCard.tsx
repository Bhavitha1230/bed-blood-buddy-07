import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "primary" | "success" | "warning";
}

const variantStyles = {
  default: "bg-card shadow-card",
  primary: "bg-gradient-hero text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
};

const iconBgStyles = {
  default: "bg-secondary",
  primary: "bg-primary-foreground/20",
  success: "bg-success-foreground/20",
  warning: "bg-warning-foreground/20",
};

const StatCard = ({ icon: Icon, label, value, subtitle, variant = "default" }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-xl p-6 ${variantStyles[variant]}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm font-medium ${variant === "default" ? "text-muted-foreground" : "opacity-80"}`}>
          {label}
        </p>
        <p className="text-3xl font-display font-bold mt-1">{value}</p>
        {subtitle && (
          <p className={`text-xs mt-1 ${variant === "default" ? "text-muted-foreground" : "opacity-70"}`}>
            {subtitle}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${iconBgStyles[variant]}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </motion.div>
);

export default StatCard;
