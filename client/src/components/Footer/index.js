import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      {/* <hr class="solid"></hr> */}
      <div className="container">
        &copy;{new Date().getFullYear()} by GamerLabs
      </div>
    </footer>
  );
};

export default Footer;
