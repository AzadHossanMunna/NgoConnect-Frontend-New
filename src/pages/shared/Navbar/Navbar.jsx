import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NgoconnectLogo from '../NgoconnectLogo/NgoconnectLogo';
import useAuth from '../../../hooks/useAuth';
import Notifications from './Notifications'; // Import Notifications

const Navbar = () => {
   const {user, logOut}  = useAuth();
   const handleLogOut=()=>{
      logOut()
      .then(result=>{console.log(result)})
      .catch(error=>console.log(error))
   }
    const navItems =<>
     <li>
  <NavLink
    to="/"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl transition-colors duration-300 font-medium ${
        isActive
          ? "bg-green-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`
    }
  >
    Home
  </NavLink>
</li>

{/* <li>
  <NavLink
    to="/coverage"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl transition-colors duration-300 font-medium ${
        isActive
          ? "bg-green-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`
    }
  >
    Coverage
  </NavLink>
</li> */}

<li>
  <NavLink
    to="/sendDonation"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl transition-colors duration-300 font-medium ${
        isActive
          ? "bg-green-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`
    }
  >
    Donate
  </NavLink>
</li>

<li>
  <NavLink
    to="/about"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl transition-colors duration-300 font-medium ${
        isActive
          ? "bg-green-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`
    }
  >
    About Us
  </NavLink>
</li>



<li>
  <NavLink
    to="/campaign"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl transition-colors duration-300 font-medium ${
        isActive
          ? "bg-green-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`
    }
  >
    Campaign
  </NavLink>
</li>

     {
            user && <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navItems}
      </ul>
    </div>
   <Link to="/" className="btn btn-ghost p-0">
  <NgoconnectLogo className="h-10 w-auto" />
</Link>


  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-4">
      {navItems}
    </ul>
  </div>
  <div className="navbar-end">
    {user && <Notifications />}
    {
      user?<button onClick={handleLogOut} className='btn btn-primary text-black'>Log Out</button>
      :
      
      <Link to="/login" className="btn bg-green-500 hover:bg-green-600 border-green-500 text-white">
  Login
</Link>
    }

  </div>
</div>
    );
};

export default Navbar;