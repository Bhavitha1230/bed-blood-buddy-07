import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bed, Droplets } from "lucide-react";
import { hospitals as initialHospitals, bloodUnits as initialBlood } from "@/data/mockData";
import { toast } from "sonner";

const Admin = () => {
  const [selectedHospital, setSelectedHospital] = useState(initialHospitals[0].id);
  const hospital = initialHospitals.find((h) => h.id === selectedHospital)!;

  const [icuBeds, setIcuBeds] = useState(hospital.icuBeds);
  const [generalBeds, setGeneralBeds] = useState(hospital.generalBeds);
  const [blood, setBlood] = useState(
    Object.fromEntries(initialBlood.map((b) => [b.group, b.units]))
  );

  const handleHospitalChange = (id: string) => {
    setSelectedHospital(id);
    const h = initialHospitals.find((h) => h.id === id)!;
    setIcuBeds(h.icuBeds);
    setGeneralBeds(h.generalBeds);
  };

  const saveBeds = () => toast.success("Bed availability updated successfully!");
  const saveBlood = () => toast.success("Blood inventory updated successfully!");

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Update hospital bed and blood availability</p>
      </div>

      {/* Hospital selector */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Select Hospital</label>
        <select
          value={selectedHospital}
          onChange={(e) => handleHospitalChange(e.target.value)}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {initialHospitals.map((h) => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>
      </div>

      {/* Beds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl p-6 shadow-card border border-border mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Bed className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold text-lg">Update Beds</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">ICU Beds</label>
            <input
              type="number"
              value={icuBeds}
              onChange={(e) => setIcuBeds(Number(e.target.value))}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">General Beds</label>
            <input
              type="number"
              value={generalBeds}
              onChange={(e) => setGeneralBeds(Number(e.target.value))}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <button
          onClick={saveBeds}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Save className="h-4 w-4" />
          Save Beds
        </button>
      </motion.div>

      {/* Blood */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-6 shadow-card border border-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold text-lg">Update Blood Units</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {Object.entries(blood).map(([group, units]) => (
            <div key={group}>
              <label className="text-sm text-muted-foreground mb-1 block">{group}</label>
              <input
                type="number"
                value={units}
                onChange={(e) => setBlood((prev) => ({ ...prev, [group]: Number(e.target.value) }))}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}
        </div>
        <button
          onClick={saveBlood}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Save className="h-4 w-4" />
          Save Blood Units
        </button>
      </motion.div>
    </div>
  );
};

export default Admin;
