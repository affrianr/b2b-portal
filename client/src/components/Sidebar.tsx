import { useNavigate } from "react-router-dom";
import bLogo from "../assets/logo.jpg";

export default function Sidebar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <aside>
      <header>
        <div className="image-text">
          <span className="image">
            <img src={bLogo} alt="logo" />
          </span>
          <div className="text header-text">
            <span className="name">B2b Portal</span>
          </div>
        </div>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <li className="nav-link" onClick={() => navigate("/")}>
            <i className="bx bxs-category icon"></i>
            <span className="text nav-text">Dashboard</span>
          </li>
          <ul className="menu-link">
            <li className="nav-link" onClick={() => navigate("/")}>
              <i className="bx bxs-institution icon"></i>
              <span className="text nav-text">Vendor/Suplier</span>
            </li>
            <li className="nav-link" onClick={() => navigate("/")}>
              <i className="bx bxs-store-alt icon"></i>
              <span className="text nav-text">Customer</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
