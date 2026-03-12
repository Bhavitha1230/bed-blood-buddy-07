import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Phone, Star, Bed, Droplets } from "lucide-react";
import { hospitals } from "@/data/mockData";

const Hospitals = () => {
  const [query, setQuery] = useState("");
  const filtered = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl mb-2">Find a Hospital</h1>
        <p className="text-muted-foreground">Search hospitals with real-time bed and blood availability</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by hospital name or location..."
          className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-card"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-lg">{h.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {h.location} · {h.distance}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-lg">
                <Star className="h-3.5 w-3.5 text-warning" />
                <span className="text-sm font-semibold">{h.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-secondary rounded-lg p-3 text-center">
                <Bed className="h-4 w-4 mx-auto text-primary mb-1" />
                <p className="text-lg font-bold">{h.icuBeds}</p>
                <p className="text-xs text-muted-foreground">ICU</p>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-center">
                <Bed className="h-4 w-4 mx-auto text-hospital mb-1" />
                <p className="text-lg font-bold">{h.generalBeds}</p>
                <p className="text-xs text-muted-foreground">General</p>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-center">
                <Droplets className="h-4 w-4 mx-auto mb-1" style={{ color: h.bloodAvailable ? "hsl(var(--success))" : "hsl(var(--emergency))" }} />
                <p className="text-lg font-bold">{h.bloodAvailable ? "Yes" : "No"}</p>
                <p className="text-xs text-muted-foreground">Blood</p>
              </div>
            </div>

            <a
              href={`tel:${h.phone}`}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Phone className="h-4 w-4" />
              Call: {h.phone}
            </a>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No hospitals found matching "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default Hospitals;
