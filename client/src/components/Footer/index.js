import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4 footer">
      <div className="container">
        &copy;{new Date().getFullYear()} by GamerLabs
      </div>
    </footer>
  );
};

export default Footer;
