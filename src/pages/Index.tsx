<<<<<<< HEAD
import { motion } from "framer-motion";
import { Bed, Droplets, Phone, Search, Building2, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";
import { totalBeds, totalBlood, hospitals, bloodUnits } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const criticalBlood = bloodUnits.filter((b) => b.status === "critical").length;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-dark opacity-90" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-primary/30">
              <Activity className="h-3.5 w-3.5" />
              Live Tracking
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-4">
              <span className="text-primary-foreground">Bed & Blood</span>
              <br />
              <span className="text-gradient-hero">Tracker</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg md:text-xl mb-8 max-w-lg">
              Find hospital beds and blood units in real-time. Powered by AI to help you in emergencies.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/hospitals"
                className="bg-gradient-hero px-6 py-3 rounded-xl font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Find Hospital
              </Link>
              <Link
                to="/blood-bank"
                className="bg-primary-foreground/10 backdrop-blur px-6 py-3 rounded-xl font-semibold text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors flex items-center gap-2"
              >
                <Droplets className="h-4 w-4" />
                Find Blood
              </Link>
              <a
                href="tel:108"
                className="bg-emergency px-6 py-3 rounded-xl font-semibold text-emergency-foreground hover:opacity-90 transition-opacity flex items-center gap-2 animate-pulse-glow"
              >
                <Phone className="h-4 w-4" />
                Emergency: 108
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Bed} label="Beds Available" value={totalBeds} subtitle="Across all hospitals" variant="primary" />
          <StatCard icon={Droplets} label="Blood Units" value={totalBlood} subtitle="Total inventory" variant="default" />
          <StatCard icon={Building2} label="Hospitals" value={hospitals.length} subtitle="Active facilities" variant="success" />
          <StatCard icon={Activity} label="Critical Blood" value={criticalBlood} subtitle="Groups running low" variant="warning" />
        </div>
      </section>

      {/* Quick overview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display font-bold text-2xl mb-6">Nearby Hospitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.slice(0, 3).map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold">{h.name}</h3>
                  <p className="text-sm text-muted-foreground">{h.location}</p>
                </div>
                <span className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-lg text-xs font-medium">
                  {h.distance}
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">ICU:</span>{" "}
                  <span className="font-semibold">{h.icuBeds}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">General:</span>{" "}
                  <span className="font-semibold">{h.generalBeds}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Blood:</span>{" "}
                  <span className={`font-semibold ${h.bloodAvailable ? "text-success" : "text-emergency"}`}>
                    {h.bloodAvailable ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/hospitals"
            className="text-primary font-semibold hover:underline"
          >
            View all hospitals →
          </Link>
        </div>
      </section>
    </div>
=======
import { AppLayout } from "@/components/AppLayout";
import { MetricCard } from "@/components/MetricCard";
import { StatusPill } from "@/components/StatusPill";
import { hospitals, bedAvailability, bloodInventory, alerts, formatTimeAgo, getHospitalName } from "@/data/mockData";
import { BedDouble, Droplets, AlertTriangle, Building2 } from "lucide-react";

const Index = () => {
  const totalBeds = bedAvailability.reduce((s, b) => s + b.total_beds, 0);
  const availableBeds = bedAvailability.reduce((s, b) => s + b.available_beds, 0);
  const totalBloodUnits = bloodInventory.reduce((s, b) => s + b.units_available, 0);
  const criticalAlerts = alerts.filter(a => a.severity === "critical" && !a.resolved).length;

  return (
    <AppLayout title="Hospital Overview" subtitle={`Last synced: ${formatTimeAgo(hospitals[0].last_updated)}`}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Hospitals"
          value={hospitals.length}
          subtitle="Active facilities"
          icon={<Building2 className="h-5 w-5" />}
        />
        <MetricCard
          title="Available Beds"
          value={availableBeds}
          subtitle={`of ${totalBeds} total`}
          icon={<BedDouble className="h-5 w-5" />}
          trend={{ value: `${Math.round((availableBeds / totalBeds) * 100)}% occupancy capacity`, positive: availableBeds / totalBeds > 0.2 }}
        />
        <MetricCard
          title="Blood Units"
          value={totalBloodUnits}
          subtitle="Across all groups"
          icon={<Droplets className="h-5 w-5" />}
        />
        <MetricCard
          title="Critical Alerts"
          value={criticalAlerts}
          subtitle="Require attention"
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={criticalAlerts > 0 ? { value: `${criticalAlerts} unresolved`, positive: false } : undefined}
        />
      </div>

      {/* Blood Inventory + Alerts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Blood Inventory Table */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <h3 className="text-sm font-semibold text-foreground">Blood Inventory Overview</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Stock levels across all facilities</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Hospital</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Blood Group</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Units</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bloodInventory.slice(0, 8).map((item) => (
                  <tr key={item.id} className="hover:bg-accent/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-foreground">{getHospitalName(item.hospital_id)}</td>
                    <td className="px-6 py-3 text-sm font-mono-data font-semibold text-foreground">{item.blood_group}</td>
                    <td className="px-6 py-3 text-right text-sm font-mono-data font-semibold text-foreground">{item.units_available}</td>
                    <td className="px-6 py-3">
                      <StatusPill
                        status={item.status}
                        label={item.status === "green" ? "Safe" : item.status === "yellow" ? "Low" : `Critical: ${item.units_available}`}
                      />
                    </td>
                    <td className="px-6 py-3 text-right text-xs font-mono-data text-muted-foreground">{formatTimeAgo(item.last_updated)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <h3 className="text-sm font-semibold text-foreground">Recent Alerts</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{alerts.filter(a => !a.resolved).length} unresolved</p>
          </div>
          <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
            {alerts.filter(a => !a.resolved).map((alert) => (
              <div key={alert.id} className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-1 ${alert.severity === "critical" ? "bg-status-red-bg" : "bg-status-yellow-bg"}`}>
                    <AlertTriangle className={`h-3 w-3 ${alert.severity === "critical" ? "text-status-red-text" : "text-status-yellow-text"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{alert.hospital_name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{alert.message}</p>
                    <p className="mt-1 text-[10px] font-mono-data text-muted-foreground">{formatTimeAgo(alert.created_at)}</p>
                  </div>
                  <StatusPill
                    status={alert.severity === "critical" ? "red" : "yellow"}
                    label={alert.severity === "critical" ? "Critical" : "Warning"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bed Availability by Hospital */}
      <div className="mt-6 bg-card rounded-xl shadow-card overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">Bed Availability by Hospital</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time ward occupancy</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Hospital</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Ward</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Available</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Occupancy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bedAvailability.map((bed) => {
                const occupancy = Math.round(((bed.total_beds - bed.available_beds) / bed.total_beds) * 100);
                return (
                  <tr key={bed.id} className="hover:bg-accent/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-foreground">{getHospitalName(bed.hospital_id)}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{bed.ward_type}</td>
                    <td className="px-6 py-3 text-right text-sm font-mono-data font-semibold text-foreground">{bed.available_beds}</td>
                    <td className="px-6 py-3 text-right text-sm font-mono-data text-muted-foreground">{bed.total_beds}</td>
                    <td className="px-6 py-3">
                      <StatusPill
                        status={bed.status}
                        label={bed.status === "green" ? "Available" : bed.status === "yellow" ? "Low" : "Critical"}
                      />
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              bed.status === "green" ? "bg-status-green-ring" : bed.status === "yellow" ? "bg-status-yellow-ring" : "bg-status-red-ring"
                            }`}
                            style={{ width: `${occupancy}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono-data text-muted-foreground">{occupancy}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
>>>>>>> madhavi/main
  );
};

export default Index;
