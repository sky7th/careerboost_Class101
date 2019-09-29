import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface Props {
  id: string;
  gradient: Array<{
    color: string;
    offset: string;
  }>;
}

const SvgGradient: FunctionComponent<Props> = ({ id, gradient }) => (
  <svg className={styles.wrapper}>
    <linearGradient id={id} x2="1" y2="1">
      {
        gradient.map(({ color, offset }, index) => (
          <stop
            key={`${color}-${index}`}
            offset={offset}
            stopColor={color}
          />
        ))
      }
    </linearGradient>
  </svg>
);

export default SvgGradient;
