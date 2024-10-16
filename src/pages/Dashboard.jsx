import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import verger from "../assets/verger-logo.svg";
import dashIcon from "../assets/dash-icon.svg";
import verifyIcon from "../assets/verify-icon.svg";
import assetIcon from "../assets/asset-icon.svg";
import doorIcon from "../assets/door-01.svg";

function Dashboard() {
  return (
    <main className="flex items-stretch min-h-screen">
      <aside className="flex flex-col items-start justify-start w-1/5 py-20 pl-20 bg-primary">
        <figure className="mb-24">
          <img src={verger} alt="verger logo icon" />
        </figure>

        <ul className="flex flex-col gap-8">
          <li>
            <Link className="flex items-center gap-3">
              <img src={dashIcon} alt="icon for dashboard" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3">
              <img src={verifyIcon} alt="icon for dashboard" />
              <span>Verify Item</span>
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3">
              <img src={assetIcon} alt="icon for dashboard" />
              <span>My Assets</span>
            </Link>
          </li>

          <li></li>
        </ul>
      </aside>

      <Outlet />
    </main>
  );
}

export default Dashboard;
