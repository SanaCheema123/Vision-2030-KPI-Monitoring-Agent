import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import KPIStatusBadge from "../components/KPIStatusBadge";
import RiskCard from "../components/RiskCard";
import AIInsightCard from "../components/AIInsightCard";
import TargetActualChart from "../charts/TargetActualChart";

import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const navigate = useNavigate();

  const {
    kpis,
    dashboard,
    alerts,
    loading,
    error,
  } = useApp();

  // ---------------------------------------
  // BACKEND DASHBOARD VALUES
  // ---------------------------------------

  const total = dashboard?.total ?? kpis.length;

  const onTrack =
    dashboard?.on_track ??
    kpis.filter((k) => k.status === "On Track").length;

  const atRisk =
    dashboard?.at_risk ??
    kpis.filter((k) => k.status === "At Risk").length;

  const below =
    dashboard?.below_target ??
    kpis.filter((k) => k.status === "Below Target").length;

  const overall = Math.round(
    dashboard?.average_progress ??
      (kpis.length
        ? kpis.reduce(
            (sum, k) => sum + (k.actual / k.target) * 100,
            0
          ) / kpis.length
        : 0)
  );

  // ---------------------------------------
  // DYNAMIC AI INSIGHT
  // ---------------------------------------

  const weakestKPI =
    kpis.length > 0
      ? [...kpis].sort(
          (a, b) =>
            a.actual / a.target - b.actual / b.target
        )[0]
      : null;

  const strongestKPI =
    kpis.length > 0
      ? [...kpis].sort(
          (a, b) =>
            b.actual / b.target - a.actual / a.target
        )[0]
      : null;

  const dynamicInsights = [];

  if (weakestKPI) {
    const progress = Math.round(
      (weakestKPI.actual / weakestKPI.target) * 100
    );

    dynamicInsights.push({
      id: 1,
      title: "Area Requiring Attention",
      description: `${weakestKPI.name} is currently at ${progress}% of its target.`,
      type:
        weakestKPI.status === "Below Target"
          ? "danger"
          : "warning",
    });
  }

  if (strongestKPI) {
    const progress = Math.round(
      (strongestKPI.actual / strongestKPI.target) * 100
    );

    dynamicInsights.push({
      id: 2,
      title: "Strongest Performance",
      description: `${strongestKPI.name} is currently at ${progress}% of its target.`,
      type: "success",
    });
  }

  dynamicInsights.push({
    id: 3,
    title: "Overall Performance",
    description: `The current average KPI progress is ${overall}%.`,
    type: overall >= 95 ? "success" : "warning",
  });

  // ---------------------------------------
  // LOADING
  // ---------------------------------------

  if (loading && kpis.length === 0) {
    return (
      <div className="page">
        <div className="panel">
          <h2>Loading KPI Performance...</h2>
          <p>
            Dashboard backend se latest performance data load kar
            raha hai.
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------
  // DASHBOARD
  // ---------------------------------------

  return (
    <div className="page">

      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <div className="welcome-row">
        <div>
          <h2>Strategic Performance</h2>

          <p>
            Monitor the latest Vision 2030 KPI performance.
          </p>
        </div>

        <div className="period-badge">
          Current Performance
        </div>
      </div>

      {/* -------------------------------- */}
      {/* ERROR */}
      {/* -------------------------------- */}

      {error && (
        <div className="panel">
          <p className="error-message">{error}</p>
        </div>
      )}

      {/* -------------------------------- */}
      {/* STAT CARDS */}
      {/* -------------------------------- */}

      <div className="stats-grid">

        <StatCard
          title="Total KPIs"
          value={total}
          subtitle="Being monitored"
          icon={Target}
        />

        <StatCard
          title="On Track"
          value={onTrack}
          subtitle="Meeting target"
          icon={CheckCircle2}
          type="success"
        />

        <StatCard
          title="At Risk"
          value={atRisk}
          subtitle="Needs attention"
          icon={AlertTriangle}
          type="warning"
        />

        <StatCard
          title="Below Target"
          value={below}
          subtitle="Requires action"
          icon={Activity}
          type="danger"
        />

      </div>

      {/* -------------------------------- */}
      {/* CHART + OVERALL PROGRESS */}
      {/* -------------------------------- */}

      <div className="dashboard-grid">

        <section className="panel chart-panel">

          <div className="panel-heading">

            <div>
              <h2>Target vs Actual</h2>

              <p>
                Current KPI performance against strategic targets
              </p>
            </div>

            <span className="chart-tag">
              {overall}% average
            </span>

          </div>

          {/* Backend KPI data */}
          <TargetActualChart kpis={kpis} />

        </section>

        {/* OVERALL PROGRESS */}

        <section className="panel progress-panel">

          <div className="panel-heading">

            <div>
              <h2>Overall Progress</h2>

              <p>
                Average performance across monitored KPIs
              </p>
            </div>

          </div>

          <div
            className="progress-ring"
            style={{
              background: `conic-gradient(
                #A9004F ${Math.min(overall, 100) * 3.6}deg,
                #f4dce6 0deg
              )`,
            }}
          >
            <div>
              <strong>{overall}%</strong>
              <span>Progress</span>
            </div>
          </div>

          <div className="progress-caption">
            Performance is calculated from the latest actual
            KPI values against their respective targets.
          </div>

        </section>

      </div>

      {/* -------------------------------- */}
      {/* KPI PERFORMANCE */}
      {/* -------------------------------- */}

      <div className="content-grid">

        <section className="panel">

          <div className="panel-heading">

            <div>
              <h2>KPI Performance</h2>

              <p>
                Latest performance received from the backend
              </p>
            </div>

          </div>

          <div className="kpi-table">

            {kpis.length === 0 ? (
              <p>No KPI data available.</p>
            ) : (
              kpis.map((kpi) => {

                const progress =
                  kpi.target > 0
                    ? Math.round(
                        (kpi.actual / kpi.target) * 100
                      )
                    : 0;

                return (
                  <div
                    className="kpi-row"
                    key={kpi.id}
                  >

                    <div className="kpi-main">

                      <strong>
                        {kpi.name}
                      </strong>

                      <span>
                        Strategic KPI
                      </span>

                    </div>

                    <div className="kpi-number">
                      {kpi.actual}
                      {kpi.unit}
                    </div>

                    <div className="kpi-target">
                      Target: {kpi.target}
                      {kpi.unit}
                    </div>

                    <div className="kpi-target">
                      {progress}%
                    </div>

                    <KPIStatusBadge
                      status={kpi.status}
                    />

                    <button
                      className="text-button"
                      onClick={() =>
                        navigate(`/kpis/${kpi.id}`)
                      }
                    >
                      View
                    </button>

                  </div>
                );
              })
            )}

          </div>

        </section>

        {/* -------------------------------- */}
        {/* RISK OVERVIEW */}
        {/* -------------------------------- */}

        <section className="panel">

          <div className="panel-heading">

            <div>
              <h2>Risk Overview</h2>

              <p>
                Indicators requiring attention
              </p>
            </div>

          </div>

          <div className="risk-list">

            {alerts.length === 0 ? (
              <p>No active risks.</p>
            ) : (
              alerts.map((alert) => (

                <RiskCard
                  key={alert.kpi_id}
                  alert={alert}
                  onClick={() =>
                    navigate("/alerts")
                  }
                />

              ))
            )}

          </div>

        </section>

      </div>

      {/* -------------------------------- */}
      {/* AI INSIGHTS */}
      {/* -------------------------------- */}

      <section className="panel">

        <div className="panel-heading">

          <div>
            <h2>AI Executive Insights</h2>

            <p>
              Automated interpretation of current KPI performance
            </p>
          </div>

          <button
            className="outline-button"
            onClick={() =>
              navigate("/insights")
            }
          >
            View All Insights
          </button>

        </div>

        <div className="insights-grid">

          {dynamicInsights.map((insight) => (

            <AIInsightCard
              key={insight.id}
              insight={insight}
            />

          ))}

        </div>

      </section>

    </div>
  );
}