
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorker } from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth/mammoth.browser";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Scan({ setResult }) {
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function extractText(selectedFile) {
    const name = selectedFile.name.toLowerCase();

    if (selectedFile.type.startsWith("image/")) {
      setStatus("Reading image with OCR...");

      const worker = await createWorker("eng");

      try {
        const { data } = await worker.recognize(selectedFile);
        return data.text;
      } finally {
        await worker.terminate();
      }
    }

    if (name.endsWith(".pdf")) {
      setStatus("Reading PDF pages...");

      const buffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
      }).promise;

      let text = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setStatus(`Reading PDF page ${pageNum} of ${pdf.numPages}...`);

        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();

        text += content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ") + "\n";
      }

      if (!text.trim()) {
        throw new Error(
          "No selectable text found in this PDF. Try uploading page screenshots instead."
        );
      }

      return text;
    }

    if (name.endsWith(".docx")) {
      setStatus("Reading Word document...");

      const buffer = await selectedFile.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value;
    }

    throw new Error("Unsupported file. Please use an image, PDF, or DOCX.");
  }

  async function analyzeOffer() {
    setError("");

    try {
      setLoading(true);
      let text = offer.trim();

      if (file) {
        text = await extractText(file);
      }

      if (!text.trim()) {
        throw new Error("Upload a file or paste a job offer first.");
      }

      setStatus("Checking for warning signs...");

      const response = await fetch(
        "http://localhost:3000/api/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("The analysis server returned an error.");
      }

      const data = await response.json();

      setResult({
        ...data,
        submittedText: text,
        sourceFile: file?.name || null,
      });

      navigate("/results");
    } catch (err) {
      setError(err.message || "Unable to scan this file.");
    } finally {
      setLoading(false);
      setStatus("");
    }
  }

  function chooseFile(selectedFile) {
    if (!selectedFile) return;

    const allowed =
      /\.(png|jpe?g|webp|pdf|docx)$/i.test(selectedFile.name);

    if (!allowed) {
      setError("Choose a PNG, JPG, WEBP, PDF, or DOCX file.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Please choose a file smaller than 10 MB.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setStatus("");
  }

  return (
    <main className="page">
      <div className="eyebrow">01 / SMART OFFER SCANNER</div>

      <h1>
        Scan it before <span>you trust it.</span>
      </h1>

      <p className="lead">
        Upload a screenshot, job offer PDF, or Word document.
        JobTrap extracts the text and checks for suspicious signs.
      </p>

      <section className="scanner-card">
        <label htmlFor="offer-file">UPLOAD A SCREENSHOT OR DOCUMENT</label>

        <label className="upload-zone" htmlFor="offer-file">
          <span className="upload-icon">↑</span>
          <strong>Choose a file to scan</strong>
          <span>PNG, JPG, WEBP, PDF or DOCX · Max 10 MB</span>
          <input
            id="offer-file"
            type="file"
            accept=".png,.jpg,.jpeg,.webp,.pdf,.docx"
            onChange={(event) => chooseFile(event.target.files?.[0])}
          />
        </label>

        {file && (
          <div className="selected-file">
            <span>▤ {file.name}</span>
            <button
              type="button"
              className="remove-file"
              onClick={() => setFile(null)}
            >
              Remove
            </button>
          </div>
        )}

        <div className="or-divider">OR PASTE TEXT</div>

        <label htmlFor="offer">JOB OFFER OR RECRUITER MESSAGE</label>

        <textarea
          id="offer"
          rows={6}
          value={offer}
          onChange={(event) => {
            setOffer(event.target.value);
            if (file) setFile(null);
          }}
          placeholder="Paste the job message here..."
        />

        <button
          type="button"
          className="primary-btn scan-button"
          onClick={analyzeOffer}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Scan for Warning Signs →"}
        </button>

        {status && <p className="scan-status">{status}</p>}
        {error && <p className="error-text">{error}</p>}
      </section>

      <p className="disclaimer">
        Text extraction can make mistakes. Review the extracted content
        when possible. A scan is not proof that an offer is genuine or fraudulent.
        Avoid uploading documents containing sensitive personal information.
      </p>
    </main>
  );
}
