import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import KPIDetails from "./pages/KPIDetails";
import Forecast from "./pages/Forecast";
import Alerts from "./pages/Alerts";
import AIInsights from "./pages/AIInsights";
import Reports from "./pages/Reports";

function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <Header />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kpis" element={<KPIDetails />} />
          <Route path="/kpis/:id" element={<KPIDetails />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/insights" element={<AIInsights />} />
          <Route path="/reports" element={<Reports />} />

          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}