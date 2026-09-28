export default function KPIStatusBadge({ status }) {
  const safeStatus = status || "Unknown";

  const className = safeStatus
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span className={`status-badge ${className}`}>
      <span className="status-dot" />
      {safeStatus}
    </span>
  );
}