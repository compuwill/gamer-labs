import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4 footer">
      <div className="container">
        &copy;{new Date().getFullYear()} by <FontAwesomeIcon icon={faFlask} className='footerlogo'/>GamerLabs
      </div>
    </footer>
  );
};

export default Footer;
