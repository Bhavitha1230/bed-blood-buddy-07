import { Status } from "@/data/mockData";

interface StatusPillProps {
  status: Status;
  label: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  const statusClass = status === "green" ? "status-green" : status === "yellow" ? "status-yellow" : "status-red";
  const dotColor = status === "green" ? "fill-status-green-ring" : status === "yellow" ? "fill-status-yellow-ring" : "fill-status-red-ring";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${statusClass}`}>
      <svg className={`h-1.5 w-1.5 ${dotColor}`} viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" /></svg>
      {label}
    </span>
  );
}
