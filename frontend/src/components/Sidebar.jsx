import {
  BarChart3,
  BellRing,
  Brain,
  FileText,
  Gauge,
  LineChart,
  Target,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: Gauge },
  { name: "KPI Details", path: "/kpis", icon: Target },
  { name: "Forecast", path: "/forecast", icon: LineChart },
  { name: "Alerts & Risks", path: "/alerts", icon: BellRing },
  { name: "AI Insights", path: "/insights", icon: Brain },
  { name: "Reports", path: "/reports", icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <BarChart3 size={25} />
        </div>

        <div>
          <h2>Vision 2030</h2>
          <span>KPI Agent</span>
        </div>
      </div>

      <div className="sidebar-label">MONITORING</div>

      <nav>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="vision-card">
          <div className="mini-circle">
            <Target size={18} />
          </div>

          <div>
            <strong>2030 Goal</strong>
            <span>Track strategic progress</span>
          </div>
        </div>
      </div>
    </aside>
  );
}