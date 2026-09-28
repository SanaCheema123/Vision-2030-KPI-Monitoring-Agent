import { AlertTriangle, ArrowRight } from "lucide-react";

export default function RiskCard({ alert, onClick }) {
  if (!alert) return null;

  const level = alert.level || "Unknown";
  const levelClass = level.toLowerCase().replaceAll(" ", "-");

  return (
    <div className={`risk-card risk-${levelClass}`}>
      <div className="risk-icon">
        <AlertTriangle size={20} />
      </div>

      <div className="risk-info">
        <div className="risk-heading">
          <strong>{alert.title || "Risk Alert"}</strong>
          <span>{level} Risk</span>
        </div>

        <p>{alert.message || "No additional information available."}</p>
      </div>

      <button
        onClick={onClick}
        aria-label={`View ${level} risk`}
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}