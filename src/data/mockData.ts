export interface Hospital {
  id: string;
  name: string;
  location: string;
  distance: string;
  bedsAvailable: number;
  icuBeds: number;
  generalBeds: number;
  bloodAvailable: boolean;
  rating: number;
  phone: string;
}

export interface BloodUnit {
  group: string;
  units: number;
  status: "available" | "low" | "critical";
}

export const hospitals: Hospital[] = [
  { id: "1", name: "Apollo Hospital", location: "Jubilee Hills, Hyderabad", distance: "3 km", bedsAvailable: 24, icuBeds: 8, generalBeds: 16, bloodAvailable: true, rating: 4.8, phone: "+91 40 2355 0000" },
  { id: "2", name: "City General Hospital", location: "Secunderabad", distance: "5 km", bedsAvailable: 15, icuBeds: 4, generalBeds: 11, bloodAvailable: true, rating: 4.3, phone: "+91 40 2784 1234" },
  { id: "3", name: "Red Cross Medical Center", location: "Banjara Hills", distance: "7 km", bedsAvailable: 32, icuBeds: 10, generalBeds: 22, bloodAvailable: true, rating: 4.6, phone: "+91 40 2335 6789" },
  { id: "4", name: "Care Hospitals", location: "Hi-Tech City", distance: "4 km", bedsAvailable: 18, icuBeds: 6, generalBeds: 12, bloodAvailable: false, rating: 4.5, phone: "+91 40 3045 0000" },
  { id: "5", name: "KIMS Hospital", location: "Kondapur", distance: "6 km", bedsAvailable: 20, icuBeds: 7, generalBeds: 13, bloodAvailable: true, rating: 4.7, phone: "+91 40 4488 5000" },
  { id: "6", name: "Yashoda Hospital", location: "Malakpet", distance: "9 km", bedsAvailable: 28, icuBeds: 9, generalBeds: 19, bloodAvailable: true, rating: 4.4, phone: "+91 40 4567 8900" },
];

export const bloodUnits: BloodUnit[] = [
  { group: "A+", units: 18, status: "available" },
  { group: "A-", units: 5, status: "low" },
  { group: "B+", units: 22, status: "available" },
  { group: "B-", units: 3, status: "critical" },
  { group: "O+", units: 30, status: "available" },
  { group: "O-", units: 2, status: "critical" },
  { group: "AB+", units: 8, status: "low" },
  { group: "AB-", units: 1, status: "critical" },
];

export const totalBeds = hospitals.reduce((sum, h) => sum + h.bedsAvailable, 0);
export const totalBlood = bloodUnits.reduce((sum, b) => sum + b.units, 0);
