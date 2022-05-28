import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Auth from '../../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-3 py-1 flex-row align-center header">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1 className='pixel text-outline'><FontAwesomeIcon icon={faFlask} className='logo text-outline fa-xl'/>GamerLabs</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">My Lab</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
