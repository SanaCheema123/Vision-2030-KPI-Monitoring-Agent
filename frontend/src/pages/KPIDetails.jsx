import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Target, Activity } from "lucide-react";

import KPIStatusBadge from "../components/KPIStatusBadge";
import TrendChart from "../charts/TrendChart";
import { useApp } from "../context/AppContext";

export default function KPIDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    kpis,
    updateKPI,
    loading,
    error,
  } = useApp();

  // ---------------------------------------
  // FIND KPI FROM BACKEND DATA
  // ---------------------------------------

  const kpi = kpis.find(
    (item) => item.id === Number(id)
  );

  // ---------------------------------------
  // KPI NOT FOUND
  // ---------------------------------------

  if (!kpi) {
    return (
      <div className="page">

        <button
          className="back-link"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <section className="panel">
          <h2>KPI Not Found</h2>

          <p>
            Is KPI ki information available nahi hai.
          </p>
        </section>

      </div>
    );
  }

  // ---------------------------------------
  // CALCULATIONS
  // ---------------------------------------

  const gap = Number(kpi.actual) - Number(kpi.target);

  const progress =
    Number(kpi.target) > 0
      ? Math.round(
          (Number(kpi.actual) / Number(kpi.target)) * 100
        )
      : 0;

  // ---------------------------------------
  // UPDATE KPI
  // ---------------------------------------

  const handleUpdate = async () => {
    const value = window.prompt(
      `Enter new actual value for ${kpi.name}`,
      kpi.actual
    );

    if (value === null) return;

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      window.alert("Please enter a valid number.");
      return;
    }

    if (numericValue < 0) {
      window.alert("Actual value cannot be negative.");
      return;
    }

    try {
      await updateKPI(kpi.id, numericValue);

      window.alert(
        "KPI performance successfully updated."
      );
    } catch {
      // Error is already handled by AppContext
    }
  };

  // ---------------------------------------
  // PAGE
  // ---------------------------------------

  return (
    <div className="page">

      {/* BACK */}

      <button
        className="back-link"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={17} />
        Dashboard
      </button>

      {/* TITLE */}

      <div className="detail-title">

        <div>

          <span className="category-label">
            Strategic KPI
          </span>

          <h2>{kpi.name}</h2>

          <p>
            Detailed performance analysis
          </p>

        </div>

        <KPIStatusBadge
          status={kpi.status}
        />

      </div>

      {/* STATS */}

      <div className="detail-stats">

        <div className="detail-card">

          <Target size={22} />

          <span>Target</span>

          <strong>
            {kpi.target}
            {kpi.unit}
          </strong>

        </div>

        <div className="detail-card">

          <Activity size={22} />

          <span>Actual</span>

          <strong>
            {kpi.actual}
            {kpi.unit}
          </strong>

        </div>

        <div className="detail-card">

          <TrendingUp size={22} />

          <span>Gap</span>

          <strong>
            {gap > 0 ? "+" : ""}
            {gap}
            {kpi.unit}
          </strong>

        </div>

        <div className="detail-card">

          <Target size={22} />

          <span>Progress</span>

          <strong>
            {progress}%
          </strong>

        </div>

      </div>

      {/* UPDATE BUTTON */}

      <section className="panel">

        <div className="panel-heading">

          <div>

            <h2>Update Performance</h2>

            <p>
              Update the latest actual KPI value.
            </p>

          </div>

          <button
            className="outline-button"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Actual"}
          </button>

        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

      </section>

      {/* HISTORICAL TREND */}

      <section className="panel">

        <div className="panel-heading">

          <div>

            <h2>Historical Trend</h2>

            <p>
              Actual performance versus target
            </p>

          </div>

        </div>

        <TrendChart kpi={kpi} />

      </section>

      {/* PERFORMANCE EXPLANATION */}

      <section className="analysis-box">

        <div className="analysis-icon">
          <Activity size={22} />
        </div>

        <div>

          <h3>
            Performance Explanation
          </h3>

          <p>
            {kpi.name} currently stands at{" "}
            {kpi.actual}
            {kpi.unit}, compared with the
            target of{" "}
            {kpi.target}
            {kpi.unit}.
            The current progress is{" "}
            {progress}% of the target.
          </p>

          <p>
            Current status:{" "}
            <strong>{kpi.status}</strong>.
          </p>

        </div>

      </section>

    </div>
  );
}