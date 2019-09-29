import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import Logo from '../Logo';
import ProfileMenu from './ProfileMenu';
import styles from './styles.module.scss';
import TodoForm from './TodoForm';
import { observer, inject } from 'mobx-react';
import  UserStore from '../../store/UserStore';

export interface Props {
  userStore?: UserStore;
}

@inject('userStore')
@observer
class Header extends React.Component<Props, {}> {
  public render() {
    const userStore = (this.props.userStore as UserStore);
    return (
      <AppBar
        position="static"
        color="default"
        className={styles.container}
      >
        <Toolbar className={styles.toolbar}>
          <Logo />
          <TodoForm />
          <ProfileMenu name={userStore.loginUser.name} className={styles.profileMenu} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
