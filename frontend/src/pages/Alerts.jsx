import { AlertTriangle, ShieldAlert } from "lucide-react";
import { alerts } from "../data/demoData";

export default function Alerts() {
  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <h2>Alerts & Risks</h2>
          <p>Monitor KPIs that may require strategic attention.</p>
        </div>
      </div>

      <div className="risk-summary">
        <div>
          <ShieldAlert size={22} />
          <strong>{alerts.length}</strong>
          <span>Active Risks</span>
        </div>

        <div>
          <AlertTriangle size={22} />
          <strong>
            {alerts.filter((a) => a.level === "High").length}
          </strong>
          <span>High Risk</span>
        </div>
      </div>

      <div className="alerts-grid">
        {alerts.map((alert) => (
          <div
            className={`large-risk-card risk-${alert.level.toLowerCase()}`}
            key={alert.id}
          >
            <div className="large-risk-icon">
              <AlertTriangle size={25} />
            </div>

            <span className="risk-level">{alert.level} Risk</span>

            <h2>{alert.title}</h2>

            <p>{alert.message}</p>

            <div className="risk-action">
              Recommended action: review current performance and identify
              corrective measures.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}