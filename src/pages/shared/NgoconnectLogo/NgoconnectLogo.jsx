import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';

const NgoconnectLogo = () => {
  return (
    <Link to="/">
      <div className='flex items-center'>
        <img src={logo} alt="NGOCONNECT" className="h-10 w-auto" />
        <p className='text-3xl ml-2 font-extrabold'>NGOCONNECT</p>
      </div>
    </Link>
  );
};

export default NgoconnectLogo;
