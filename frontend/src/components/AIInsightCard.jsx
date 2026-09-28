import { Brain } from "lucide-react";

export default function AIInsightCard({ insight }) {
  return (
    <div className="ai-card">
      <div className="ai-card-icon">
        <Brain size={21} />
      </div>

      <div>
        <h3>{insight.title}</h3>
        <p>{insight.text}</p>
      </div>
    </div>
  );
}