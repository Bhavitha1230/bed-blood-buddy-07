import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Droplets,
  AlertTriangle,
  MapPin,
  MessageSquare,
  BedDouble,
  LogIn,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/beds", label: "Bed Availability", icon: BedDouble },
  { to: "/blood", label: "Blood Inventory", icon: Droplets },
  { to: "/alerts", label: "Alerts", icon: AlertTriangle },
  { to: "/map", label: "Hospital Map", icon: MapPin },
  { to: "/assistant", label: "AI Assistant", icon: MessageSquare },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Droplets className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">Bed & Blood</h1>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Tracker</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors duration-150"
        >
          <LogIn className="h-4 w-4" />
          Login / Register
        </Link>
      </div>
    </aside>
  );
}
