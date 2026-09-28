import Plot from "react-plotly.js";

export default function TargetActualChart({ kpis = [] }) {
  return (
    <Plot
      data={[
        {
          x: kpis.map((k) => k.name),
          y: kpis.map((k) => k.target),
          name: "Target",
          type: "bar",
          hovertemplate:
            "<b>%{x}</b><br>Target: %{y}%<extra></extra>",
        },
        {
          x: kpis.map((k) => k.name),
          y: kpis.map((k) => k.actual),
          name: "Actual",
          type: "bar",
          hovertemplate:
            "<b>%{x}</b><br>Actual: %{y}%<extra></extra>",
        },
      ]}
      layout={{
        autosize: true,
        height: 340,

        margin: {
          l: 45,
          r: 20,
          t: 20,
          b: 100,
        },

        barmode: "group",

        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",

        font: {
          family: "Inter, Arial",
          color: "#5f4d59",
        },

        legend: {
          orientation: "h",
          y: 1.12,
        },

        xaxis: {
          tickangle: -25,
          automargin: true,
        },

        yaxis: {
          title: "Performance (%)",
          rangemode: "tozero",
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