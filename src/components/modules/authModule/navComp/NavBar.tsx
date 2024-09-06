import React from 'react';
import style from './nav.module.css';

const NavBar = () => {
  return (
    <nav className={`${style.trapeziumNavbar} hidden lg:block`}>
      <ul className="flex items-center justify-center gap-[20px]">
        <li>
          <a href="/home" className={style.subnavbtn}>
            Home
          </a>
        </li>
        <li>
          <a href="/pricing" className={style.subnavbtn}>
            Pricing
          </a>
        </li>
        <li>
          <a href="#" className={style.subnavbtn}>
            FAQ
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
