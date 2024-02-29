// material-ui
import React from 'react';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

import logo from '../assets/images/sltc-logo.png'; // Import your JPG logo file

const Logo = () => {
  return (
    // if you want to use image instead of svg uncomment following, and comment out <svg> element.
    <img src={logo} alt="Your Company Name" width="130" /> // Replace 'logo' with your own image source
  );
};

export default Logo;
