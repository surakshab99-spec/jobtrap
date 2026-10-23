
import { Link } from "react-router-dom";

export default function Results({ result }) {
  if (!result) {
    return (
      <main className="page">
        <h1>No analysis yet.</h1>
        <p className="lead">Scan an offer first to see the results.</p>
        <Link to="/scan" className="primary-btn">Scan an Offer →</Link>
      </main>
    );
  }

  const findings = Array.isArray(result.findings)
    ? result.findings
    : [];

  return (
    <main className="page">
      <div className="eyebrow">02 / ANALYSIS REPORT</div>
      <h1>Your offer <span>report.</span></h1>

      <section className="result-card">
        <h2>{result.status || "Analysis completed"}</h2>
        <p>
          {result.message ||
            "Review the findings below and verify the opportunity independently."}
        </p>
      </section>

      <h2 className="section-title">Warning signs</h2>

      {findings.length > 0 ? (
        <div className="findings-list">
          {findings.map((finding, index) => (
            <article className="finding-card" key={index}>
              <span className="finding-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>
                {typeof finding === "string"
                  ? finding
                  : finding.description ||
                    finding.message ||
                    finding.type ||
                    JSON.stringify(finding)}
              </p>
              {finding.evidence && (
                <blockquote>{finding.evidence}</blockquote>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="lead">
          No findings were returned. This does not guarantee that the
          offer is safe.
        </p>
      )}

      <section className="result-card">
        <h2>What to do next</h2>
        <ul>
          <li>Check the company's official website and careers page.</li>
          <li>Contact the company using independently verified details.</li>
          <li>Never pay fees to secure a job or share OTPs or passwords.</li>
          <li>Be cautious of pressure to act immediately.</li>
        </ul>
      </section>

      <Link to="/scan" className="primary-btn">Scan Another Offer →</Link>

      <p className="disclaimer">
        This automated text check is preliminary. It cannot confirm whether
        an employer or offer is genuine.
      </p>
    </main>
  );
}
