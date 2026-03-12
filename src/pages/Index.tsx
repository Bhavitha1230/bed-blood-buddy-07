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
  );
};

export default Index;
