import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import verger from "../assets/verger-logo.svg";
import dashIcon from "../assets/dash-icon.svg";
import verifyIcon from "../assets/verify-icon.svg";
import assetIcon from "../assets/asset-icon.svg";
import doorIcon from "../assets/door-01.svg";

function Dashboard() {
  return (
    <main className="relative flex h-screen overflow-hidden">
      <aside className="flex flex-col justify-start w-1/5 py-20 pl-20 pr-4 bg-primary">
        <figure className="mb-24">
          <img src={verger} alt="verger logo icon" />
        </figure>

        <ul className="flex flex-col gap-10 text-16">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center w-full gap-3 px-4 py-6 transition-colors duration-500 rounded-xl hover:bg-secondary"
            >
              <img src={dashIcon} alt="icon for dashboard" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/verify-item"
              className="flex items-center w-full gap-3 px-4 py-6 transition-colors duration-500 rounded-xl hover:bg-secondary"
            >
              <img src={verifyIcon} alt="icon for dashboard" />
              <span>Verify Item</span>
            </Link>
          </li>

          <li>
            <Link
              to="/my-assets"
              className="flex items-center w-full gap-3 px-4 py-6 transition-colors duration-500 rounded-xl hover:bg-secondary"
            >
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
