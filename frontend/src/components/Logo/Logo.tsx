import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import styles from './styles.module.scss';

const Logo = () => (
  <Fragment>
    <FontAwesomeIcon className={styles.logo} icon={faClipboardList} size="2x" />
    <span className={styles.topTodo}>
      Todo 101
    </span>
  </Fragment>
);

export default Logo;
