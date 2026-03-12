import { AppLayout } from "@/components/AppLayout";
import { StatusPill } from "@/components/StatusPill";
import { hospitals, bedAvailability, bloodInventory } from "@/data/mockData";
import { MapPin, Phone, BedDouble, Droplets } from "lucide-react";

const HospitalMapPage = () => {
  return (
    <AppLayout title="Hospital Map" subtitle="Locate nearest hospitals with available resources">
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        {/* Map placeholder */}
        <div className="h-80 bg-accent flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }} />
          <div className="text-center z-10">
            <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">Google Maps Integration</p>
            <p className="text-xs text-muted-foreground mt-1">Enable Lovable Cloud and add your Google Maps API key to activate the map view</p>
          </div>
        </div>
      </div>

      {/* Hospital List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {hospitals.map((hospital) => {
          const beds = bedAvailability.filter(b => b.hospital_id === hospital.id);
          const blood = bloodInventory.filter(b => b.hospital_id === hospital.id);
          const availBeds = beds.reduce((s, b) => s + b.available_beds, 0);
          const totalBeds = beds.reduce((s, b) => s + b.total_beds, 0);
          const bloodUnits = blood.reduce((s, b) => s + b.units_available, 0);
          const hasCritical = beds.some(b => b.status === "red") || blood.some(b => b.status === "red");

          return (
            <div key={hospital.id} className="bg-card rounded-xl shadow-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{hospital.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {hospital.address}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {hospital.contact_phone}
                  </p>
                </div>
                {hasCritical && <StatusPill status="red" label="Has Critical" />}
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BedDouble className="h-3.5 w-3.5" />
                  <span className="font-mono-data font-semibold text-foreground">{availBeds}</span>/{totalBeds} beds
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Droplets className="h-3.5 w-3.5" />
                  <span className="font-mono-data font-semibold text-foreground">{bloodUnits}</span> blood units
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-mono-data text-muted-foreground">
                <span>{hospital.lat.toFixed(4)}, {hospital.lng.toFixed(4)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default HospitalMapPage;
