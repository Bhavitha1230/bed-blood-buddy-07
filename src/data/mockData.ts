// Mock data for the application
export const hospitals = [
  { id: "1", name: "City General Hospital", address: "123 Main St, Downtown", lat: 28.6139, lng: 77.209, contact_phone: "+91-11-2345-6789", last_updated: new Date(Date.now() - 120000).toISOString() },
  { id: "2", name: "St. Mary's Medical Center", address: "456 Oak Ave, Westside", lat: 28.6329, lng: 77.2195, contact_phone: "+91-11-3456-7890", last_updated: new Date(Date.now() - 300000).toISOString() },
  { id: "3", name: "Metro Emergency Hospital", address: "789 Pine Rd, Eastside", lat: 28.5921, lng: 77.2307, contact_phone: "+91-11-4567-8901", last_updated: new Date(Date.now() - 60000).toISOString() },
  { id: "4", name: "National Heart Institute", address: "321 Elm St, Northside", lat: 28.6448, lng: 77.1934, contact_phone: "+91-11-5678-9012", last_updated: new Date(Date.now() - 500000).toISOString() },
  { id: "5", name: "Apollo Care Hospital", address: "654 Cedar Ln, Southside", lat: 28.5672, lng: 77.2149, contact_phone: "+91-11-6789-0123", last_updated: new Date(Date.now() - 180000).toISOString() },
];

export type WardType = "ICU" | "General" | "Emergency" | "Maternity";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Status = "green" | "yellow" | "red";
export type Severity = "warning" | "critical";

export interface BedAvailability {
  id: string;
  hospital_id: string;
  ward_type: WardType;
  total_beds: number;
  available_beds: number;
  status: Status;
}

export interface BloodInventoryItem {
  id: string;
  hospital_id: string;
  blood_group: BloodGroup;
  units_available: number;
  minimum_threshold: number;
  last_updated: string;
  status: Status;
}

export interface Alert {
  id: string;
  hospital_id: string;
  hospital_name: string;
  resource_type: "bed" | "blood";
  severity: Severity;
  message: string;
  resolved: boolean;
  created_at: string;
}

function getStatus(available: number, total: number): Status {
  const ratio = available / total;
  if (ratio > 0.3) return "green";
  if (ratio > 0.1) return "yellow";
  return "red";
}

function getBloodStatus(units: number, threshold: number): Status {
  if (units > threshold * 2) return "green";
  if (units > threshold) return "yellow";
  return "red";
}

export const bedAvailability: BedAvailability[] = [
  { id: "b1", hospital_id: "1", ward_type: "ICU", total_beds: 20, available_beds: 3, status: "yellow" },
  { id: "b2", hospital_id: "1", ward_type: "General", total_beds: 100, available_beds: 42, status: "green" },
  { id: "b3", hospital_id: "1", ward_type: "Emergency", total_beds: 15, available_beds: 1, status: "red" },
  { id: "b4", hospital_id: "1", ward_type: "Maternity", total_beds: 25, available_beds: 12, status: "green" },
  { id: "b5", hospital_id: "2", ward_type: "ICU", total_beds: 15, available_beds: 0, status: "red" },
  { id: "b6", hospital_id: "2", ward_type: "General", total_beds: 80, available_beds: 28, status: "green" },
  { id: "b7", hospital_id: "2", ward_type: "Emergency", total_beds: 10, available_beds: 4, status: "green" },
  { id: "b8", hospital_id: "2", ward_type: "Maternity", total_beds: 20, available_beds: 2, status: "yellow" },
  { id: "b9", hospital_id: "3", ward_type: "ICU", total_beds: 25, available_beds: 8, status: "green" },
  { id: "b10", hospital_id: "3", ward_type: "General", total_beds: 120, available_beds: 5, status: "red" },
  { id: "b11", hospital_id: "3", ward_type: "Emergency", total_beds: 20, available_beds: 7, status: "green" },
  { id: "b12", hospital_id: "3", ward_type: "Maternity", total_beds: 15, available_beds: 1, status: "red" },
  { id: "b13", hospital_id: "4", ward_type: "ICU", total_beds: 30, available_beds: 15, status: "green" },
  { id: "b14", hospital_id: "4", ward_type: "General", total_beds: 90, available_beds: 35, status: "green" },
  { id: "b15", hospital_id: "4", ward_type: "Emergency", total_beds: 12, available_beds: 2, status: "yellow" },
  { id: "b16", hospital_id: "5", ward_type: "ICU", total_beds: 18, available_beds: 0, status: "red" },
  { id: "b17", hospital_id: "5", ward_type: "General", total_beds: 70, available_beds: 22, status: "green" },
  { id: "b18", hospital_id: "5", ward_type: "Emergency", total_beds: 8, available_beds: 3, status: "green" },
];

export const bloodInventory: BloodInventoryItem[] = [
  { id: "bl1", hospital_id: "1", blood_group: "O+", units_available: 45, minimum_threshold: 10, last_updated: new Date(Date.now() - 3600000).toISOString(), status: "green" },
  { id: "bl2", hospital_id: "1", blood_group: "O-", units_available: 3, minimum_threshold: 8, last_updated: new Date(Date.now() - 7200000).toISOString(), status: "red" },
  { id: "bl3", hospital_id: "1", blood_group: "A+", units_available: 22, minimum_threshold: 10, last_updated: new Date(Date.now() - 1800000).toISOString(), status: "green" },
  { id: "bl4", hospital_id: "1", blood_group: "A-", units_available: 8, minimum_threshold: 5, last_updated: new Date(Date.now() - 5400000).toISOString(), status: "yellow" },
  { id: "bl5", hospital_id: "1", blood_group: "B+", units_available: 30, minimum_threshold: 10, last_updated: new Date(Date.now() - 900000).toISOString(), status: "green" },
  { id: "bl6", hospital_id: "1", blood_group: "B-", units_available: 2, minimum_threshold: 5, last_updated: new Date(Date.now() - 10800000).toISOString(), status: "red" },
  { id: "bl7", hospital_id: "1", blood_group: "AB+", units_available: 15, minimum_threshold: 5, last_updated: new Date(Date.now() - 4200000).toISOString(), status: "green" },
  { id: "bl8", hospital_id: "1", blood_group: "AB-", units_available: 4, minimum_threshold: 3, last_updated: new Date(Date.now() - 6000000).toISOString(), status: "yellow" },
  { id: "bl9", hospital_id: "2", blood_group: "O+", units_available: 18, minimum_threshold: 10, last_updated: new Date(Date.now() - 2400000).toISOString(), status: "yellow" },
  { id: "bl10", hospital_id: "2", blood_group: "O-", units_available: 12, minimum_threshold: 8, last_updated: new Date(Date.now() - 3000000).toISOString(), status: "yellow" },
  { id: "bl11", hospital_id: "2", blood_group: "A+", units_available: 35, minimum_threshold: 10, last_updated: new Date(Date.now() - 1200000).toISOString(), status: "green" },
  { id: "bl12", hospital_id: "2", blood_group: "B-", units_available: 1, minimum_threshold: 5, last_updated: new Date(Date.now() - 14400000).toISOString(), status: "red" },
  { id: "bl13", hospital_id: "3", blood_group: "O+", units_available: 50, minimum_threshold: 10, last_updated: new Date(Date.now() - 600000).toISOString(), status: "green" },
  { id: "bl14", hospital_id: "3", blood_group: "O-", units_available: 0, minimum_threshold: 8, last_updated: new Date(Date.now() - 1800000).toISOString(), status: "red" },
  { id: "bl15", hospital_id: "3", blood_group: "AB+", units_available: 7, minimum_threshold: 5, last_updated: new Date(Date.now() - 7800000).toISOString(), status: "yellow" },
  { id: "bl16", hospital_id: "4", blood_group: "O+", units_available: 60, minimum_threshold: 10, last_updated: new Date(Date.now() - 300000).toISOString(), status: "green" },
  { id: "bl17", hospital_id: "4", blood_group: "A-", units_available: 0, minimum_threshold: 5, last_updated: new Date(Date.now() - 9000000).toISOString(), status: "red" },
  { id: "bl18", hospital_id: "5", blood_group: "O-", units_available: 5, minimum_threshold: 8, last_updated: new Date(Date.now() - 4800000).toISOString(), status: "red" },
  { id: "bl19", hospital_id: "5", blood_group: "B+", units_available: 25, minimum_threshold: 10, last_updated: new Date(Date.now() - 2100000).toISOString(), status: "green" },
];

export const alerts: Alert[] = [
  { id: "a1", hospital_id: "1", hospital_name: "City General Hospital", resource_type: "blood", severity: "critical", message: "O- Negative stock critically low: 3 units remaining", resolved: false, created_at: new Date(Date.now() - 300000).toISOString() },
  { id: "a2", hospital_id: "2", hospital_name: "St. Mary's Medical Center", resource_type: "bed", severity: "critical", message: "ICU beds fully occupied: 0 available", resolved: false, created_at: new Date(Date.now() - 600000).toISOString() },
  { id: "a3", hospital_id: "3", hospital_name: "Metro Emergency Hospital", resource_type: "blood", severity: "critical", message: "O- Negative depleted: 0 units", resolved: false, created_at: new Date(Date.now() - 900000).toISOString() },
  { id: "a4", hospital_id: "1", hospital_name: "City General Hospital", resource_type: "blood", severity: "warning", message: "A- stock approaching threshold: 8 units", resolved: false, created_at: new Date(Date.now() - 1200000).toISOString() },
  { id: "a5", hospital_id: "5", hospital_name: "Apollo Care Hospital", resource_type: "bed", severity: "critical", message: "ICU beds fully occupied: 0 available", resolved: false, created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: "a6", hospital_id: "2", hospital_name: "St. Mary's Medical Center", resource_type: "blood", severity: "critical", message: "B- stock critically low: 1 unit remaining", resolved: false, created_at: new Date(Date.now() - 2400000).toISOString() },
  { id: "a7", hospital_id: "4", hospital_name: "National Heart Institute", resource_type: "blood", severity: "critical", message: "A- Negative depleted: 0 units", resolved: true, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "a8", hospital_id: "1", hospital_name: "City General Hospital", resource_type: "bed", severity: "warning", message: "Emergency ward low: 1 bed remaining", resolved: false, created_at: new Date(Date.now() - 3600000).toISOString() },
];

export function getHospitalName(id: string): string {
  return hospitals.find(h => h.id === id)?.name ?? "Unknown Hospital";
}

export function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
