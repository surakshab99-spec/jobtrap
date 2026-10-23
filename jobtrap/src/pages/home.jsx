
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="page home">
      <div className="eyebrow">● YOUR PERSONAL JOB SAFETY TOOL</div>

      <h1>
        Your dream job.<br />
        <span>Not a trap.</span>
      </h1>

      <p className="lead">
        Spot suspicious job offers before you trust them.
        Check recruiter messages, discover warning signs,
        and learn how to verify opportunities safely.
      </p>

      <div className="hero-actions">
        <Link to="/scan" className="primary-btn">
          Scan an Offer →
        </Link>
        <Link to="/safety" className="secondary-btn">
          Learn to Stay Safe
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>01</span>
          <h3>Paste</h3>
          <p>Share a job message or offer.</p>
        </div>
        <div className="stat-card">
          <span>02</span>
          <h3>Analyze</h3>
          <p>Check for suspicious wording.</p>
        </div>
        <div className="stat-card">
          <span>03</span>
          <h3>Verify</h3>
          <p>Get practical safety steps.</p>
        </div>
      </div>

      <p className="disclaimer">
        JobTrap provides preliminary checks, not proof that a job is
        genuine or fraudulent.
      </p>
    </main>
  );
}
