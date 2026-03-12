import { AppLayout } from "@/components/AppLayout";
import { StatusPill } from "@/components/StatusPill";
import { bloodInventory, getHospitalName, formatTimeAgo, BloodGroup } from "@/data/mockData";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BloodInventoryPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  const filtered = selectedGroup === "All" ? bloodInventory : bloodInventory.filter(b => b.blood_group === selectedGroup);

  // Aggregate by blood group for chart
  const chartData = bloodGroups.map((group) => {
    const items = bloodInventory.filter(b => b.blood_group === group);
    const totalUnits = items.reduce((s, i) => s + i.units_available, 0);
    const avgThreshold = items.length > 0 ? items.reduce((s, i) => s + i.minimum_threshold, 0) / items.length : 0;
    const hasCritical = items.some(i => i.status === "red");
    const hasWarning = items.some(i => i.status === "yellow");
    return { group, units: totalUnits, fill: hasCritical ? "#FECACA" : hasWarning ? "#FDE047" : "#BBF7D0", stroke: hasCritical ? "#991B1B" : hasWarning ? "#854D0E" : "#166534" };
  });

  return (
    <AppLayout title="Blood Inventory" subtitle="Stock levels by blood group across all facilities">
      {/* Chart */}
      <div className="bg-card rounded-xl shadow-card p-6 mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Aggregate Blood Stock by Group</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="group" tick={{ fontSize: 12, fontFamily: "Geist Mono" }} />
              <YAxis tick={{ fontSize: 12, fontFamily: "Geist Mono" }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "none", boxShadow: "var(--shadow-elevated)", fontSize: 13 }}
                formatter={(value: number) => [`${value} units`, "Stock"]}
              />
              <Bar dataKey="units" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.stroke} strokeWidth={1} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedGroup("All")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
            selectedGroup === "All" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground shadow-card"
          }`}
        >
          All Groups
        </button>
        {bloodGroups.map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono-data transition-colors duration-150 ${
              selectedGroup === group ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground shadow-card"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Hospital</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Group</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Units</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Threshold</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-3 text-sm text-foreground">{getHospitalName(item.hospital_id)}</td>
                  <td className="px-6 py-3 text-sm font-mono-data font-semibold text-foreground">{item.blood_group}</td>
                  <td className="px-6 py-3 text-right text-sm font-mono-data font-semibold text-foreground">{item.units_available}</td>
                  <td className="px-6 py-3 text-right text-sm font-mono-data text-muted-foreground">{item.minimum_threshold}</td>
                  <td className="px-6 py-3">
                    <StatusPill
                      status={item.status}
                      label={item.status === "green" ? "Safe" : item.status === "yellow" ? `Low: ${item.units_available}` : `Critical: ${item.units_available}`}
                    />
                  </td>
                  <td className="px-6 py-3 text-right text-xs font-mono-data text-muted-foreground">{formatTimeAgo(item.last_updated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default BloodInventoryPage;
