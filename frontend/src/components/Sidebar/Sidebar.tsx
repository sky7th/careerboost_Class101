import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import React, { Fragment, FunctionComponent } from 'react';
import Content from './Content';
import styles from './styles.module.scss';

export interface Props {
  location: Location;
  onToggleDrawer: () => void;
}

const Sidebar: FunctionComponent<Props> = ({ location, onToggleDrawer }) => (
  <Fragment>
    <Hidden smUp implementation="css">
      <Drawer
        variant="temporary"
        anchor="top"
        classes={{
          paper: styles.paper,
        }}
        className={styles.containerMobile}
      >
        <Content currentPath={location.pathname} onLinkClick={onToggleDrawer}/>
      </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css">
      <Drawer
        classes={{
          paper: styles.paper,
        }}
        variant="permanent"
        className={styles.wrapper}
      >
        <Content currentPath={location.pathname} />
      </Drawer>
    </Hidden>
  </Fragment>
);

export default Sidebar;
