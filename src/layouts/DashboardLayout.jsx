import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHandsHelping, FaDonate, FaUser, FaBullhorn, FaUsers, FaHandHoldingHeart, FaClock, FaTasks, FaClipboardList, FaCalendarDay, FaCalendarCheck } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition
   ${isActive
     ? "bg-green-600 text-white"
     : "text-gray-700 hover:bg-green-100 hover:text-green-700"
   }`;

const DashboardLayout = () => {
  const { user } = useAuth();
  const isAdminOrManager = user?.role === 'admin' || user?.role === 'manager';
  const isAdmin = user?.role === 'admin';
  const isVolunteer = user?.role === 'volunteer';
  const isGeneralUser = user?.role === 'general_user';

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      {/* Toggle checkbox */}
      <input id="ngo-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= Main Content ================= */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-green-600 text-white px-4 shadow">
          {/* Mobile toggle only */}
          <label
            htmlFor="ngo-drawer"
            className="btn btn-square btn-ghost lg:hidden"
          >
            ☰
          </label>

          <h1 className="text-lg sm:text-xl font-bold ml-2">
            NGOConnect Dashboard
          </h1>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side z-40">
        <label htmlFor="ngo-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-200 flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-green-700">
              🤝 NGOConnect
            </h2>
            <p className="text-sm text-gray-500">
              Donation Management
            </p>
          </div>

          {/* Menu */}
          <ul className="menu p-4 space-y-1 flex-1">
            <li>
              <NavLink to="/dashboard" end className={navLinkClass}>
                <MdDashboard />
                Dashboard
              </NavLink>
            </li>

            {/* Admin / Manager Only Links */}
            {isAdminOrManager && (
              <li>
                <NavLink to="/dashboard/campaigns" className={navLinkClass}>
                  <FaBullhorn />
                  Manage Campaigns
                </NavLink>
              </li>
            )}

            {isAdminOrManager && (
              <li>
                <NavLink to="/dashboard/tasks" className={navLinkClass}>
                  <FaTasks />
                  Manage Tasks
                </NavLink>
              </li>
            )}

            {isAdminOrManager && (
              <li>
                <NavLink to="/dashboard/events/manage" className={navLinkClass}>
                  <FaCalendarDay />
                  Manage Events
                </NavLink>
              </li>
            )}

            {isAdmin && (
              <li>
                <NavLink to="/dashboard/users" className={navLinkClass}>
                  <FaUsers />
                  Manage Users
                </NavLink>
              </li>
            )}
            
            {isAdmin && (
              <li>
                <NavLink to="/dashboard/volunteers" className={navLinkClass}>
                  <FaHandHoldingHeart />
                  Manage Volunteers
                </NavLink>
              </li>
            )}

            {isVolunteer && (
              <>
                <li>
                  <NavLink to="/dashboard/events" className={navLinkClass}>
                    <FaCalendarCheck />
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/volunteer/checklist" className={navLinkClass}>
                    <FaClipboardList />
                    My Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/volunteer/logs" className={navLinkClass}>
                    <FaClock />
                    My Time Logs
                  </NavLink>
                </li>
              </>
            )}

            {isGeneralUser && (
              <li>
                <NavLink to="/dashboard/volunteer/apply" className={navLinkClass}>
                  <FaHandHoldingHeart />
                  Become a Volunteer
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/dashboard/myDonations" className={navLinkClass}>
                <FaDonate />
                My Donations
              </NavLink>
            </li>

            {isAdminOrManager && (
              <li>
                <NavLink
                  to="/dashboard/donation-requests"
                  className={navLinkClass}
                >
                  <FaHandsHelping />
                  Donation Requests
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/dashboard/profile" className={navLinkClass}>
                <FaUser />
                Profile
              </NavLink>
            </li>
          </ul>

          {/* Footer */}
          <div className="p-4 border-t">
            <Link
              to="/"
              className="text-green-700 font-semibold hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
