import { useState } from "react";
import { ArrowRight, BarChart3, Brain, CheckCircle2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="brand">
          <div className="brand-icon">
            <BarChart3 size={25} />
          </div>
          <div>
            <h2>Vision 2030</h2>
            <span>KPI Agent</span>
          </div>
        </div>

        <div className="landing-links">
          <button onClick={() => setModal("about")}>About</button>
          <button onClick={() => setModal("how")}>How It Works</button>
          <button onClick={() => setModal("features")}>Features</button>
        </div>
      </header>

      <main className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            <Brain size={16} />
            AI-POWERED STRATEGIC MONITORING
          </span>

          <h1>
            Monitor Vision 2030.
            <br />
            <span>Understand Progress.</span>
          </h1>

          <p>
            An intelligent KPI monitoring platform that transforms verified
            performance data into clear insights, risk alerts and forecasts.
          </p>

          <button
            className="hero-button"
            onClick={() => navigate("/dashboard")}
          >
            Get Started
            <ArrowRight size={19} />
          </button>
        </div>

        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="preview-top">
              <strong>Performance Overview</strong>
              <span>2027</span>
            </div>

            <div className="preview-number">78%</div>
            <div className="preview-label">Overall Progress</div>

            <div className="preview-bars">
              {[72, 84, 61, 91, 76].map((value, index) => (
                <div className="preview-bar-row" key={index}>
                  <span>{value}%</span>
                  <div>
                    <i style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="landing-features">
        {[
          "KPI Monitoring",
          "Target vs Actual",
          "AI Explanations",
          "Forecasting",
        ].map((item) => (
          <div key={item}>
            <CheckCircle2 size={18} />
            {item}
          </div>
        ))}
      </div>

      {modal && (
        <div className="landing-modal" onClick={() => setModal(null)}>
          <div
            className="landing-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setModal(null)}
            >
              <X size={21} />
            </button>

            {modal === "about" && (
              <>
                <h2>About Vision 2030 KPI Agent</h2>
                <p>
                  This platform monitors strategic performance indicators and
                  presents their progress in a simple executive dashboard.
                </p>
              </>
            )}

            {modal === "how" && (
              <>
                <h2>How It Works</h2>
                <p>
                  Data is collected, cleaned and analyzed. KPIs are compared
                  against targets, trends and unusual changes are identified,
                  and AI generates understandable explanations.
                </p>
              </>
            )}

            {modal === "features" && (
              <>
                <h2>Key Features</h2>
                <ul className="feature-list">
                  <li>KPI monitoring</li>
                  <li>Target-versus-actual comparison</li>
                  <li>Trend and anomaly detection</li>
                  <li>AI-generated explanations</li>
                  <li>Risk alerts</li>
                  <li>Future forecasting</li>
                  <li>Executive reports</li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}