import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import React, { FunctionComponent } from 'react';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

interface Props {
  name: string;
}

const Author: FunctionComponent<Props> = ({ name }) => (
  <Chip
    className={styles.chip}
    classes={{
      label: styles.label,
    }}
    avatar={
      <Avatar className={styles.avatar}>
        <FontAwesomeIcon icon={faUserCircle} className={styles.icon} />
      </Avatar>
    }
    label={name}
  />
);

export default Author;
