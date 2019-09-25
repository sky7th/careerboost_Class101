import React, { FunctionComponent, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../Header';
import Sidebar from '../Sidebar';
import styles from './styles.module.scss';

export interface Props {
  children: ReactNode;
  isLoggedIn: boolean;
}

const Layout: FunctionComponent<Props> = ({ children, isLoggedIn }) => (
  <div className={styles.container}>
    { isLoggedIn
      && <Header />
    }
    <div className={styles.wrapper}>
      { isLoggedIn
        && <Sidebar />
      }
      <div className={styles.content}>
        { children }
      </div>
    </div>
    <ToastContainer toastClassName={styles.toast}/>
  </div>
);

export default Layout;
