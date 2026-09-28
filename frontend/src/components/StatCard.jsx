import { ArrowDown, ArrowUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  type = "",
}) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={20} />
        </div>

        {trend && (
          <span className="trend-pill">
            {trend > 0 ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );
}