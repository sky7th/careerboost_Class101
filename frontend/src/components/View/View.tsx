import React, { FunctionComponent, ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
}

const View: FunctionComponent<Props> = ({ children }) => (
  <div className={styles.wrapper}>
    { children }
  </div>
);

export default View;
