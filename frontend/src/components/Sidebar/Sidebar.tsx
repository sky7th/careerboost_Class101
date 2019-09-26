import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import React, { Fragment, FunctionComponent } from 'react';
import Content from './Content';
import styles from './styles.module.scss';

export interface Props {
  isDrawerOpened: boolean;
  location: Location;
  onToggleDrawer: () => void;
}

const Sidebar: FunctionComponent<Props> = ({ isDrawerOpened, location, onToggleDrawer }) => (
  <Fragment>
    <Hidden smUp implementation="css">
      <Drawer
        variant="temporary"
        anchor="top"
        open={isDrawerOpened}
        classes={{
          paper: styles.paper,
        }}
        className={styles.containerMobile}
      >
        <Content currentPath={location.pathname} onLinkClick={onToggleDrawer}/>
      </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css" className={styles.container}>
      <Drawer
        classes={{
          paper: styles.paper,
        }}
        variant="permanent"
        open
        className={styles.wrapper}
      >
        <Content currentPath={location.pathname} />
      </Drawer>
    </Hidden>
  </Fragment>
);

export default Sidebar;
