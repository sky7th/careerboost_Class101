import React, { FunctionComponent } from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

export interface Props {
  anchorEl: HTMLElement;
  handleClick: () => void;
  handleClose: () => void;
  onLogOut: () => void;
  name: string;
  className?: string;
}

const ProfileMenu: FunctionComponent<Props> = ({ className, anchorEl, handleClick, handleClose, onLogOut, name }) => (
  <div className={className}>
    <Button
      aria-owns={anchorEl ? 'profile-menu' : undefined}
      aria-haspopup="true"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faUserCircle} className={styles.icon} size="2x" />
      <p className={styles.name}>{name}</p>
    </Button>
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      className={styles.menu}
    >
      <MenuItem onClick={onLogOut}>Log out</MenuItem>
    </Menu>
  </div>
);

export default ProfileMenu;
