import { useState } from "react";
import { kpis } from "../data/demoData";
import ForecastChart from "../charts/ForecastChart";
import KPIStatusBadge from "../components/KPIStatusBadge";

export default function Forecast() {
  const [selected, setSelected] = useState(kpis[0].id);

  const kpi = kpis.find((item) => item.id === Number(selected));

  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <h2>Future Performance Forecast</h2>
          <p>
            Estimated future KPI movement based on historical performance.
          </p>
        </div>

        <select
          className="select-input"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {kpis.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="forecast-summary">
        <div>
          <span>Current</span>
          <strong>
            {kpi.actual}
            {kpi.unit}
          </strong>
        </div>

        <div>
          <span>2030 Target</span>
          <strong>
            {kpi.target}
            {kpi.unit}
          </strong>
        </div>

        <div>
          <span>Status</span>
          <KPIStatusBadge status={kpi.status} />
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>{kpi.name} Forecast</h2>
            <p>Historical values and projected future performance</p>
          </div>
        </div>

        <ForecastChart kpi={kpi} />
      </section>

      <div className="forecast-note">
        <strong>Forecast note</strong>
        <p>
          Forecast values shown here are demonstration estimates. The
          production backend will use the configured time-series forecasting
          model once historical database data is connected.
        </p>
      </div>
    </div>
  );
}