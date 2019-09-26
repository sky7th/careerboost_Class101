import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import SvgGradient from '../SvgGradient';
import styles from './styles.module.scss';

const Logo = () => (
  <Fragment>
    <SvgGradient
      id="logo-gradient"
      gradient={[
        {
          color: '#62aeff',
          offset: '35%',
        },
        {
          color: '#117a8b',
          offset: '100%',
        },
      ]}
    />
    <FontAwesomeIcon className={styles.logo} icon={faClipboardList} size="2x" />
    <span className={styles.topTodo}>
      Todo 101
    </span>
  </Fragment>
);

export default Logo;
