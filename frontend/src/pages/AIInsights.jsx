import { useState } from "react";
import { Brain, Database, Sparkles } from "lucide-react";
import { aiInsights } from "../data/demoData";
import AIInsightCard from "../components/AIInsightCard";

export default function AIInsights() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAnalyze = () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setAnswer("Please enter a KPI question first.");
      return;
    }

    const matchedInsight = aiInsights.find((item) => {
      const text = `${item.title} ${item.text}`.toLowerCase();

      return trimmedQuestion
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 3 && text.includes(word));
    });

    if (matchedInsight) {
      setAnswer(`${matchedInsight.title}: ${matchedInsight.text}`);
    } else {
      setAnswer(
        "No matching insight was found in the current demo data. The FastAPI + RAG backend can provide a detailed answer when connected."
      );
    }
  };

  return (
    <div className="page">
      <div className="ai-hero">
        <div className="ai-hero-icon">
          <Brain size={30} />
        </div>

        <div>
          <span>AI PERFORMANCE ANALYSIS</span>
          <h2>Intelligent KPI Insights</h2>
          <p>
            AI interprets verified KPI information to explain progress,
            delays and unusual changes.
          </p>
        </div>
      </div>

      <div className="ai-method-grid">
        <div>
          <Database size={21} />
          <strong>Verified Data</strong>
          <span>Uses trusted KPI information</span>
        </div>

        <div>
          <Sparkles size={21} />
          <strong>AI Analysis</strong>
          <span>Generates understandable explanations</span>
        </div>

        <div>
          <Brain size={21} />
          <strong>RAG Ready</strong>
          <span>Can retrieve supporting documents</span>
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Current Insights</h2>
            <p>Automated interpretation of monitored performance</p>
          </div>
        </div>

        <div className="insights-list">
          {aiInsights.map((item) => (
            <AIInsightCard key={item.id} insight={item} />
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Ask the KPI Agent</h2>

        <p className="muted">
          Ask a question about the currently monitored KPIs.
        </p>

        <div className="ai-question">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAnalyze();
              }
            }}
            placeholder="Example: Why is Renewable Energy at risk?"
          />

          <button type="button" onClick={handleAnalyze}>
            Analyze
          </button>
        </div>

        {answer && (
          <div className="ai-answer">
            <Brain size={19} />
            <div>
              <strong>AI Response</strong>
              <p>{answer}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}