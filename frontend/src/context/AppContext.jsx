import { createContext, useContext, useEffect, useState } from "react";

import {
  getKPIs,
  getDashboard,
  getAlerts,
  updateKPI as updateKPIAPI,
} from "../services/api";

const AppContext = createContext();

const emptyProfile = {
  name: "",
  email: "",
};

const emptyDashboard = {
  total: 0,
  on_track: 0,
  at_risk: 0,
  below_target: 0,
  average_progress: 0,
  kpis: [],
};

export function AppProvider({ children }) {
  // =========================================================
  // LOGIN STATE
  // =========================================================

  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("vision2030_logged_in") === "true";
  });

  // =========================================================
  // PROFILE
  // =========================================================

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("vision2030_profile");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Profile parsing error:", error);
        return emptyProfile;
      }
    }

    return emptyProfile;
  });

  // =========================================================
  // KPI DATA
  // =========================================================

  const [kpis, setKpis] = useState([]);

  // =========================================================
  // DASHBOARD DATA
  // =========================================================

  const [dashboard, setDashboard] = useState(emptyDashboard);

  // =========================================================
  // ALERTS / RISKS
  // =========================================================

  const [alerts, setAlerts] = useState([]);

  // =========================================================
  // SELECTED KPI
  // =========================================================

  const [selectedKPI, setSelectedKPI] = useState(null);

  // =========================================================
  // LOADING / ERROR
  // =========================================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const saveProfile = (newProfile) => {
    setProfile(newProfile);

    localStorage.setItem(
      "vision2030_profile",
      JSON.stringify(newProfile)
    );
  };

  // =========================================================
  // CALCULATE DASHBOARD FROM KPI DATA
  // =========================================================
  //
  // This is a fallback.
  // If /api/dashboard has a problem but /api/kpis works,
  // dashboard cards will still show real KPI values.
  // =========================================================

  const calculateDashboardFromKPIs = (kpiData) => {
    if (!Array.isArray(kpiData) || kpiData.length === 0) {
      return emptyDashboard;
    }

    const total = kpiData.length;

    const onTrack = kpiData.filter(
      (kpi) => kpi.status === "On Track"
    ).length;

    const atRisk = kpiData.filter(
      (kpi) => kpi.status === "At Risk"
    ).length;

    const belowTarget = kpiData.filter(
      (kpi) => kpi.status === "Below Target"
    ).length;

    const progressValues = kpiData.map((kpi) => {
      if (typeof kpi.progress === "number") {
        return kpi.progress;
      }

      if (Number(kpi.target) > 0) {
        return (Number(kpi.actual) / Number(kpi.target)) * 100;
      }

      return 0;
    });

    const averageProgress =
      progressValues.length > 0
        ? progressValues.reduce(
            (sum, value) => sum + Number(value || 0),
            0
          ) / progressValues.length
        : 0;

    return {
      total,
      on_track: onTrack,
      at_risk: atRisk,
      below_target: belowTarget,
      average_progress: Number(averageProgress.toFixed(2)),
      kpis: kpiData,
    };
  };

  // =========================================================
  // LOAD DATA FROM BACKEND
  // =========================================================

  const loadBackendData = async () => {
    try {
      setLoading(true);
      setError("");

      console.log(
        "=============================================="
      );

      console.log(
        "VISION 2030: Loading data from FastAPI..."
      );

      console.log(
        "Expected backend: http://127.0.0.1:8001"
      );

      // -----------------------------------------------------
      // CALL BACKEND APIs
      // -----------------------------------------------------

      const [kpiData, dashboardData, alertData] =
        await Promise.all([
          getKPIs(),
          getDashboard(),
          getAlerts(),
        ]);

      // -----------------------------------------------------
      // DEBUG OUTPUT
      // -----------------------------------------------------

      console.log(
        "BACKEND KPIs:",
        kpiData
      );

      console.log(
        "BACKEND DASHBOARD:",
        dashboardData
      );

      console.log(
        "BACKEND ALERTS:",
        alertData
      );

      console.log(
        "=============================================="
      );

      // -----------------------------------------------------
      // VALIDATE KPI DATA
      // -----------------------------------------------------

      const validKpis = Array.isArray(kpiData)
        ? kpiData
        : [];

      // -----------------------------------------------------
      // SET KPI DATA
      // -----------------------------------------------------

      setKpis(validKpis);

      // -----------------------------------------------------
      // DASHBOARD DATA
      // -----------------------------------------------------

      let finalDashboard;

      if (
        dashboardData &&
        typeof dashboardData === "object" &&
        typeof dashboardData.total === "number"
      ) {
        // Use actual backend dashboard calculation
        finalDashboard = {
          ...emptyDashboard,
          ...dashboardData,
          kpis: Array.isArray(dashboardData.kpis)
            ? dashboardData.kpis
            : validKpis,
        };

        console.log(
          "Using dashboard data directly from backend."
        );
      } else {
        // Fallback calculation
        finalDashboard =
          calculateDashboardFromKPIs(validKpis);

        console.log(
          "Dashboard endpoint data invalid. Using KPI fallback calculation."
        );
      }

      setDashboard(finalDashboard);

      // -----------------------------------------------------
      // ALERT DATA
      // -----------------------------------------------------

      setAlerts(
        Array.isArray(alertData)
          ? alertData
          : []
      );

      // -----------------------------------------------------
      // SELECT FIRST KPI
      // -----------------------------------------------------

      if (validKpis.length > 0) {
        setSelectedKPI(validKpis[0]);
      } else {
        setSelectedKPI(null);
      }

      // -----------------------------------------------------
      // FINAL DEBUG
      // -----------------------------------------------------

      console.log(
        "FINAL FRONTEND KPI DATA:",
        validKpis
      );

      console.log(
        "FINAL FRONTEND DASHBOARD DATA:",
        finalDashboard
      );

      console.log(
        "FINAL FRONTEND ALERT DATA:",
        alertData
      );

      console.log(
        "VISION 2030: Backend data loaded successfully."
      );
    } catch (err) {
      console.error(
        "=============================================="
      );

      console.error(
        "VISION 2030 BACKEND ERROR"
      );

      console.error(
        "Full error:",
        err
      );

      console.error(
        "Error message:",
        err?.message
      );

      console.error(
        "Error response:",
        err?.response?.data
      );

      console.error(
        "HTTP status:",
        err?.response?.status
      );

      console.error(
        "Request URL:",
        err?.config?.baseURL,
        err?.config?.url
      );

      console.error(
        "=============================================="
      );

      setError(
        "Backend se data load nahi ho saka. Check karein ke FastAPI server port 8001 par running hai."
      );

      // Do not destroy existing data if a refresh fails.
      // If this is the first load, values remain empty.
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const login = async (name, email) => {
    const newProfile = {
      name:
        name?.trim() ||
        "Vision Executive",

      email:
        email?.trim() ||
        "executive@vision2030.com",
    };

    // -------------------------------------------------------
    // SAVE LOGIN
    // -------------------------------------------------------

    localStorage.setItem(
      "vision2030_logged_in",
      "true"
    );

    localStorage.setItem(
      "vision2030_profile",
      JSON.stringify(newProfile)
    );

    setProfile(newProfile);
    setLoggedIn(true);

    // -------------------------------------------------------
    // RESET FRONTEND SESSION
    // -------------------------------------------------------

    setSelectedKPI(null);
    setKpis([]);
    setAlerts([]);
    setDashboard(emptyDashboard);
    setError("");

    // -------------------------------------------------------
    // LOAD REAL BACKEND DATA
    // -------------------------------------------------------


    return true;
  };

  // =========================================================
  // UPDATE KPI
  // =========================================================

  const updateKPI = async (id, actual) => {
    try {
      setLoading(true);
      setError("");

      console.log(
        "Updating KPI:",
        id,
        "New actual:",
        actual
      );

      // -----------------------------------------------------
      // UPDATE DATABASE THROUGH FASTAPI
      // -----------------------------------------------------

      const updatedKPI = await updateKPIAPI(
        id,
        Number(actual)
      );

      console.log(
        "Updated KPI response:",
        updatedKPI
      );

      // -----------------------------------------------------
      // UPDATE CURRENT KPI STATE
      // -----------------------------------------------------

      setKpis((current) =>
        current.map((kpi) =>
          kpi.id === id
            ? updatedKPI
            : kpi
        )
      );

      // -----------------------------------------------------
      // REFRESH ALL BACKEND DATA
      // -----------------------------------------------------

      const [
        newKpis,
        newDashboard,
        newAlerts,
      ] = await Promise.all([
        getKPIs(),
        getDashboard(),
        getAlerts(),
      ]);

      console.log(
        "Refreshed KPIs:",
        newKpis
      );

      console.log(
        "Refreshed Dashboard:",
        newDashboard
      );

      console.log(
        "Refreshed Alerts:",
        newAlerts
      );

      // -----------------------------------------------------
      // UPDATE STATE
      // -----------------------------------------------------

      setKpis(
        Array.isArray(newKpis)
          ? newKpis
          : []
      );

      const finalDashboard =
        newDashboard &&
        typeof newDashboard.total === "number"
          ? newDashboard
          : calculateDashboardFromKPIs(
              Array.isArray(newKpis)
                ? newKpis
                : []
            );

      setDashboard(finalDashboard);

      setAlerts(
        Array.isArray(newAlerts)
          ? newAlerts
          : []
      );

      // -----------------------------------------------------
      // KEEP SELECTED KPI UPDATED
      // -----------------------------------------------------

      const updatedSelected =
        Array.isArray(newKpis)
          ? newKpis.find(
              (kpi) => kpi.id === id
            )
          : null;

      if (updatedSelected) {
        setSelectedKPI(
          updatedSelected
        );
      }

      return updatedKPI;
    } catch (err) {
      console.error(
        "KPI update error:",
        err
      );

      console.error(
        "KPI update response:",
        err?.response?.data
      );

      setError(
        "KPI update nahi ho saka. Backend check karein."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    // -------------------------------------------------------
    // CLEAR LOCAL STORAGE
    // -------------------------------------------------------

    localStorage.removeItem(
      "vision2030_logged_in"
    );

    localStorage.removeItem(
      "vision2030_profile"
    );

    // -------------------------------------------------------
    // CLEAR REACT STATE
    // -------------------------------------------------------

    setLoggedIn(false);
    setProfile(emptyProfile);

    setKpis([]);
    setAlerts([]);

    setDashboard(emptyDashboard);

    setSelectedKPI(null);

    setError("");
  };

  // =========================================================
  // LOAD DATA WHEN USER IS ALREADY LOGGED IN
  // =========================================================

  useEffect(() => {
  console.log(
    "VISION 2030: AppContext mounted. Loading backend data..."
  );

  loadBackendData();
}, []);
  // =========================================================
  // CONTEXT
  // =========================================================

  return (
    <AppContext.Provider
      value={{
        // ---------------------------------------------------
        // LOGIN
        // ---------------------------------------------------

        loggedIn,
        login,
        logout,

        // ---------------------------------------------------
        // PROFILE
        // ---------------------------------------------------

        profile,
        saveProfile,

        // ---------------------------------------------------
        // KPI
        // ---------------------------------------------------

        kpis,
        setKpis,

        selectedKPI,
        setSelectedKPI,

        updateKPI,

        // ---------------------------------------------------
        // DASHBOARD
        // ---------------------------------------------------

        dashboard,

        // ---------------------------------------------------
        // ALERTS
        // ---------------------------------------------------

        alerts,

        // ---------------------------------------------------
        // STATUS
        // ---------------------------------------------------

        loading,
        error,

        // ---------------------------------------------------
        // BACKEND RELOAD
        // ---------------------------------------------------

        loadBackendData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// =========================================================
// CUSTOM HOOK
// =========================================================

export function useApp() {
  return useContext(AppContext);
}