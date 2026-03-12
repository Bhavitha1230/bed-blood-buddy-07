import { AppLayout } from "@/components/AppLayout";
import { StatusPill } from "@/components/StatusPill";
import { bedAvailability, getHospitalName, hospitals } from "@/data/mockData";
import { useState } from "react";

const wardTypes = ["All", "ICU", "General", "Emergency", "Maternity"] as const;

const BedAvailabilityPage = () => {
  const [selectedWard, setSelectedWard] = useState<string>("All");

  const filtered = selectedWard === "All" ? bedAvailability : bedAvailability.filter(b => b.ward_type === selectedWard);

  return (
    <AppLayout title="Bed Availability" subtitle="Real-time hospital bed occupancy data">
      <div className="flex items-center gap-2 mb-6">
        {wardTypes.map((ward) => (
          <button
            key={ward}
            onClick={() => setSelectedWard(ward)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
              selectedWard === ward
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground shadow-card"
            }`}
          >
            {ward}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {hospitals.map((hospital) => {
          const beds = filtered.filter(b => b.hospital_id === hospital.id);
          if (beds.length === 0) return null;
          const totalAvailable = beds.reduce((s, b) => s + b.available_beds, 0);
          const totalBeds = beds.reduce((s, b) => s + b.total_beds, 0);

          return (
            <div key={hospital.id} className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">{hospital.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{hospital.address}</p>
              </div>
              <div className="divide-y divide-border">
                {beds.map((bed) => {
                  const occupancy = Math.round(((bed.total_beds - bed.available_beds) / bed.total_beds) * 100);
                  return (
                    <div key={bed.id} className="px-6 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{bed.ward_type}</p>
                        <p className="text-xs text-muted-foreground font-mono-data">{bed.available_beds}/{bed.total_beds} beds</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              bed.status === "green" ? "bg-status-green-ring" : bed.status === "yellow" ? "bg-status-yellow-ring" : "bg-status-red-ring"
                            }`}
                            style={{ width: `${occupancy}%` }}
                          />
                        </div>
                        <StatusPill
                          status={bed.status}
                          label={bed.status === "green" ? "Available" : bed.status === "yellow" ? "Low" : "Critical"}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-6 py-3 bg-accent/30">
                <p className="text-xs font-medium text-muted-foreground">
                  Total: <span className="font-mono-data font-semibold text-foreground">{totalAvailable}</span> / {totalBeds} available
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default BedAvailabilityPage;
