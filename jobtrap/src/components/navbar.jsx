
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">⌘</span>
        <span>JobTrap<span className="brand-dot">.</span></span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/scan">Scan Offer</NavLink>
        <NavLink to="/safety">Safety Center</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Link to="/scan" className="nav-cta">
        Scan an Offer ↗
      </Link>
    </header>
  );
}
