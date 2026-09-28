import Plot from "react-plotly.js";

export default function ForecastChart({ kpi }) {
  if (!kpi || !Array.isArray(kpi.history)) return null;

  const last = Number(kpi.actual) || 0;
  const target = Number(kpi.target) || 0;

  const forecast = [
    { year: "2028", value: Math.min(last + 3, 100) },
    { year: "2029", value: Math.min(last + 6, 100) },
    { year: "2030", value: Math.min(last + 9, 100) },
  ];

  return (
    <Plot
      data={[
        {
          x: kpi.history.map((item) => item.year),
          y: kpi.history.map((item) => item.value),
          mode: "lines+markers",
          type: "scatter",
          name: "Historical",
          line: {
            width: 3,
          },
          marker: {
            size: 7,
          },
        },
        {
          x: forecast.map((item) => item.year),
          y: forecast.map((item) => item.value),
          mode: "lines+markers",
          type: "scatter",
          name: "Forecast",
          line: {
            dash: "dot",
            width: 3,
          },
          marker: {
            size: 7,
          },
        },
        {
          x: forecast.map((item) => item.year),
          y: forecast.map(() => target),
          mode: "lines",
          type: "scatter",
          name: "Target",
          line: {
            dash: "dash",
            width: 2,
          },
        },
      ]}
      layout={{
        autosize: true,
        height: 420,
        margin: {
          l: 55,
          r: 20,
          t: 25,
          b: 50,
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        font: {
          family: "Inter, Arial",
          color: "#5f4d59",
        },
        xaxis: {
          title: "Year",
          gridcolor: "rgba(95, 77, 89, 0.08)",
        },
        yaxis: {
          title: kpi.unit || "Value",
          gridcolor: "rgba(95, 77, 89, 0.08)",
        },
        legend: {
          orientation: "h",
          y: -0.2,
        },
      }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
      style={{
        width: "100%",
      }}
      useResizeHandler
    />
  );
}