import React, { FunctionComponent } from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';
import { observer, inject } from 'mobx-react';
import  UserStore from '../../../store/UserStore';

export interface Props {
  name: string;
  className?: string;
  userStore?: UserStore;
}

interface States {
  anchorEl: HTMLElement | null;
}

@inject('userStore')
@observer
class ProfileMenu extends React.Component<Props, States> {
  public state: States = {
    anchorEl: null,
  };

  public handleClick = (event: any) => (
    this.setState({
      anchorEl: event.target,
    })
  )
  public handleClose = () => (
    this.setState({
      anchorEl: null,
    })
  )
  public onLogOut = () => {
    const userStore = (this.props.userStore as UserStore);
    userStore.logOutAction()
      .then(() => {
        this.handleClose();
      });
  }
  public render() {
    const { className, name } = this.props;
    const  { anchorEl } = this.state;
    return (
      <div className={className}>
        <Button
          aria-owns={anchorEl ? 'profile-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <FontAwesomeIcon icon={faUserCircle} className={styles.icon} size="2x" />
          <p className={styles.name}>{name}</p>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={styles.menu}
        >
          <MenuItem onClick={this.onLogOut}>Log out</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default ProfileMenu;
