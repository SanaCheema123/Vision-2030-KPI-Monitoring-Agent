import { ChevronLeft, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import ProfilePopup from "./ProfilePopup";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);

  const showBack = location.pathname !== "/dashboard";

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "Executive Dashboard";
    if (location.pathname === "/kpis") return "KPI Details";
    if (location.pathname === "/forecast") return "Performance Forecast";
    if (location.pathname === "/alerts") return "Alerts & Risks";
    if (location.pathname === "/insights") return "AI Insights";
    if (location.pathname === "/reports") return "Executive Reports";

    return "Vision 2030";
  };

  return (
    <>
      <header className="top-header">
        <div className="header-left">
          {showBack && (
            <button
              className="back-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ChevronLeft size={21} />
            </button>
          )}

          <div>
            <span className="header-small">VISION 2030</span>
            <h1>{getPageTitle()}</h1>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="header-profile"
            onClick={() => setProfileOpen(true)}
            aria-label="Open profile"
          >
            <div className="small-avatar">
              <User size={18} />
            </div>

            <div className="profile-name">
              <strong>{profile?.name || "Profile"}</strong>
              <small>Executive</small>
            </div>
          </button>
        </div>
      </header>

      {profileOpen && (
        <ProfilePopup
          onClose={() => setProfileOpen(false)}
        />
      )}
    </>
  );
}