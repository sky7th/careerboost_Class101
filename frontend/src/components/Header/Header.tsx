import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FunctionComponent } from 'react';
import UserData from '../../interfaces/user/UserData';
import Logo from '../Logo';
import ProfileMenu from './ProfileMenu';
import styles from './styles.module.scss';
import TodoForm from './TodoForm';

export interface Props {
  userData: UserData;
  onLogOut: () => void;
}

const Header: FunctionComponent<Props> = ({ userData }) => (
  <AppBar
    position="static"
    color="default"
    className={styles.container}
  >
    <Toolbar className={styles.toolbar}>
      <Logo/>
      <TodoForm/>
      <ProfileMenu name={userData.name} className={styles.profileMenu}/>
    </Toolbar>
  </AppBar>
);

export default Header;
