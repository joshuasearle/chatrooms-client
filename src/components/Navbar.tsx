import React from 'react';
import { Link } from 'react-router-dom';
import stringShortener from '../util/stringShortener';

interface NavbarProps {
  displayName: string;
}

const Navbar: React.FC<NavbarProps> = ({ displayName }) => {
  const loginString = displayName ? stringShortener(displayName, 10) : 'Login';
  return (
    <div>
      <h1>Chatrooms</h1>
      <div>
        <Link to='/rooms'>Rooms</Link>
        <Link to='/login'>{loginString}</Link>
      </div>
    </div>
  );
};

export default Navbar;
