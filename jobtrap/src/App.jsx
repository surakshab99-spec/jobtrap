
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Scan from "./pages/scan";
import Results from "./pages/results";
import Safety from "./pages/safetyCenter";
import About from "./pages/About";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/scan"
            element={<Scan setResult={setResult} />}
          />
          <Route
            path="/results"
            element={<Results result={result} />}
          />
          <Route path="/safety" element={<Safety />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <footer className="site-footer">
          <span>JobTrap © 2026</span>
          <span>Think before you trust.</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
