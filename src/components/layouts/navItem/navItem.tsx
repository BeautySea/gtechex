import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navItem.module.css';
import getClassName from '../../../utils/getClassName';

interface NavItemprops {
  children: ReactNode;
  href: string;
  icon: ReactNode;
}

const NavItem = ({ children, href, icon }: NavItemprops) => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          styles.navItem + getClassName(isActive, styles.isActive)
        }
        to={href}
      >
        <span>{icon}</span>
        <span className="text-sm">{children}</span>
        {/* {children} */}
        <div className={styles.bar} />
      </NavLink>
    </>
  );
};

export default NavItem;
