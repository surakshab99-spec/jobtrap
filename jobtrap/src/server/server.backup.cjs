
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.post("/api/analyze", (req, res) => {
  const text = req.body?.text;

  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({
      status: "Insufficient information",
      message: "No readable job offer text received.",
      findings: [],
    });
  }

  const offer = text.toLowerCase();
  const findings = [];

  if (/registration fee|pay upfront|upfront fee|security deposit|processing fee/.test(offer)) {
    findings.push({
      type: "Possible upfront payment",
      description: "The offer mentions a payment that may be required to secure a job.",
    });
  }

  if (/guaranteed job|guaranteed placement|earn \d+ lakhs per month|no experience.*high salary/.test(offer)) {
    findings.push({
      type: "Unrealistic promise",
      description: "The offer may contain an unusually strong salary or placement promise.",
    });
  }

  if (/act now|immediate payment|limited time|offer expires today|urgent payment/.test(offer)) {
    findings.push({
      type: "Urgency pressure",
      description: "The message may be pressuring the applicant to act quickly.",
    });
  }

  if (/send your otp|share your password|bank pin|upi pin/.test(offer)) {
    findings.push({
      type: "Sensitive information request",
      description: "Never share OTPs, passwords, or banking PINs with a recruiter.",
    });
  }

  res.json({
    status: findings.length
      ? "Potential warning signs detected"
      : "No listed warning signs detected",
    message: findings.length
      ? "Review these warning signs and independently verify the employer."
      : "No configured warning patterns were found. This does not prove the offer is genuine.",
    findings,
  });
});

app.listen(3000, () => {
  console.log("JobTrap backend running at http://localhost:3000");
});
