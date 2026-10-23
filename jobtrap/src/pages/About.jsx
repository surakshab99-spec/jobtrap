
export default function About() {
  return (
    <main className="page">
      <div className="eyebrow">ABOUT / OUR MISSION</div>
      <h1>Opportunity without <span>the risk.</span></h1>

      <p className="lead">
        JobTrap is a cybersecurity awareness project designed to help
        students and jobseekers think critically about suspicious job
        and internship offers.
      </p>

      <section className="result-card">
        <h2>How it works</h2>
        <p>
          Users submit offer text. The analysis service checks for selected
          warning patterns and returns preliminary findings. Users can
          then review those findings and verify the opportunity independently.
        </p>
      </section>

      <section className="result-card">
        <h2>Privacy by design</h2>
        <p>
          This MVP does not require an account. Avoid submitting personal
          or confidential information. Review your backend configuration
          before deploying and do not log sensitive submitted content.
        </p>
      </section>

      <section className="result-card">
        <h2>Honest limitations</h2>
        <p>
          A warning sign is not proof of fraud, and a clean text scan is
          not proof of legitimacy. JobTrap supports safer decisions; it
          does not replace independent verification.
        </p>
      </section>
    </main>
  );
}
