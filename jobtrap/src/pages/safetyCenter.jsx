
const tips = [
  {
    title: "Upfront Payment",
    text: "Be cautious if a recruiter asks for registration fees, security deposits, or payment to guarantee a job."
  },
  {
    title: "Unrealistic Salaries",
    text: "Promises of extremely high salaries for little work or guaranteed jobs without interviews deserve extra scrutiny."
  },
  {
    title: "Urgent Pressure",
    text: "Be careful if someone pressures you to accept an offer or pay immediately. Take time to verify it."
  },
  {
    title: "Personal Information",
    text: "Never share OTPs, passwords, UPI PINs, or banking credentials with a recruiter."
  },
  {
    title: "Verify the Recruiter",
    text: "Check the company's official careers page, recruiter email domain, and independently verified contact details."
  },
  {
    title: "Suspicious Links",
    text: "Check website addresses carefully. Avoid unexpected downloads or installing unknown apps sent by recruiters."
  }
];

export default function Safety() {
  return (
    <main className="page">
      <div className="eyebrow">SAFETY CENTER / FIELD GUIDE</div>

      <h1>
        Stay sharp.<br />
        <span>Stay protected.</span>
      </h1>

      <p className="lead">
        Learn to recognize warning signs before accepting a job
        or internship offer.
      </p>

      <div className="safety-grid">
        {tips.map((tip, index) => (
          <article className="safety-card" key={tip.title}>
            <span className="safety-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </article>
        ))}
      </div>

      <section className="result-card">
        <h2>Already paid or shared information?</h2>
        <p>
          Contact your bank or payment provider promptly if money
          was transferred. In India, suspected cybercrime can be
          reported at cybercrime.gov.in. For financial cyber fraud,
          call 1930 as soon as possible.
        </p>
      </section>

      <p className="disclaimer">
        These tips support safer decisions but cannot guarantee
        that a job offer is genuine.
      </p>
    </main>
  );
}
