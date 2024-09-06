import { ReactNode } from 'react';
import styles from './layout.module.css';
import Sidebar from './sidebar/sidebar';
import TopNav from './topNav/topNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* <RequiredAuth> */}
      <div className="mobileStyling">
        {/* <MobileNav /> */}
        <div className={styles.layout}>
          <Sidebar />
          <div className={styles.view}>
            <TopNav />
            {children}
          </div>
        </div>
      </div>
      {/* </RequiredAuth> */}
    </>
  );
};

export default Layout;
