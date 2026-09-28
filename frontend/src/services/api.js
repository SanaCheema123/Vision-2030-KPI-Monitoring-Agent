import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8001",
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getKPIs = async () => {
  const response = await api.get("/api/kpis");
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get("/api/dashboard");
  return response.data;
};

export const getAlerts = async () => {
  const response = await api.get("/api/alerts");
  return response.data;
};

export const getKPI = async (kpiId) => {
  const response = await api.get(`/api/kpis/${kpiId}`);
  return response.data;
};

export const updateKPI = async (kpiId, actual) => {
  const response = await api.patch(`/api/kpis/${kpiId}`, {
    actual: Number(actual),
  });

  return response.data;
};

export const getForecast = async (kpiId) => {
  const response = await api.get(`/api/forecast/${kpiId}`);
  return response.data;
};

export default api;