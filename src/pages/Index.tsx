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
  );
};

export default Index;
