import React from 'react';
import { Link } from 'react-router-dom';
import stringShortener from '../util/stringShortener';

interface NavbarProps {
  displayName: string;
}

const Navbar: React.FC<NavbarProps> = ({ displayName }) => {
  const loginString = displayName ? stringShortener(displayName, 10) : 'Login';
  return (
    <div className='navbar'>
      <div className='navbar__items'>
        <Link className='navbar__title' to={displayName ? '/rooms' : '/login'}>
          <h1>Chatrooms</h1>
        </Link>

        <div className='navbar__links'>
          {displayName && (
            <Link className='navbar__link' to='/rooms'>
              Rooms
            </Link>
          )}
          <Link className='navbar__link' to='/login'>
            {loginString}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
