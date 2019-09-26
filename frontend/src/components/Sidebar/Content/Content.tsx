import React, { Fragment, FunctionComponent } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link  } from 'react-router-dom';
import styles from './styles.module.scss';

export interface Element {
  text: string;
  icon: IconProp;
  path: string;
}
export interface Props {
  elements: Element[][];
  currentPath: string;
  onLinkClick: () => void;
}

const Content: FunctionComponent<Props> = ({ elements, currentPath, onLinkClick }) => (
  <div>
    <div />
    <Divider />
    <List className={styles.list}>
      {
        elements.map((section, index) => (
          <Fragment key={`${section[0] && section[0].text}-${index}`}>
            {
              section.map(
                ({ text, icon, path }) => (
                  <Link key={path} to={path} className={styles.link}>
                    <ListItem
                      button
                      key={text}
                      className={styles.item}
                      selected={currentPath === path}
                      onClick={onLinkClick}
                    >
                      <ListItemIcon className={styles.icon}>
                        <FontAwesomeIcon icon={icon} />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
               ),
              )
            }
            {index !== elements.length - 1 && <Divider />}
          </Fragment>
      ))}
    </List>
  </div>
);

export default Content;
