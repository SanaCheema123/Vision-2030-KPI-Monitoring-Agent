import Plot from "react-plotly.js";

export default function TrendChart({ kpi }) {
  if (!kpi || !Array.isArray(kpi.history) || kpi.history.length === 0) {
    return (
      <div className="empty-state">
        No historical data available for this KPI.
      </div>
    );
  }

  const years = kpi.history.map((item) => item.year);
  const values = kpi.history.map((item) => item.value);

  return (
    <Plot
      data={[
        {
          x: years,
          y: values,
          type: "scatter",
          mode: "lines+markers",
          name: kpi.name,
          line: {
            width: 3,
          },
          marker: {
            size: 8,
          },
          hovertemplate:
            `<b>${kpi.name}</b><br>` +
            "Year: %{x}<br>" +
            "Actual: %{y}<extra></extra>",
        },
        {
          x: years,
          y: years.map(() => kpi.target),
          type: "scatter",
          mode: "lines",
          name: "Target",
          line: {
            dash: "dash",
            width: 2,
          },
          hovertemplate:
            "<b>Target</b><br>" +
            "Year: %{x}<br>" +
            "Target: %{y}<extra></extra>",
        },
      ]}
      layout={{
        autosize: true,
        height: 350,
        margin: {
          l: 55,
          r: 20,
          t: 25,
          b: 55,
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        font: {
          family: "Inter, Arial",
          color: "#5f4d59",
        },
        hovermode: "x unified",

        xaxis: {
          title: "Year",
          gridcolor: "rgba(95, 77, 89, 0.08)",
        },

        yaxis: {
          title: kpi.unit || "Performance (%)",
          rangemode: "tozero",
          gridcolor: "rgba(95, 77, 89, 0.08)",
        },

        legend: {
          orientation: "h",
          y: 1.12,
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