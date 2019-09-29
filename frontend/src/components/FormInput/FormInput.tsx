import React, { FunctionComponent } from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import styles from './styles.module.scss';

export interface Props {
  name: string;
  label?: string;
  value: string;
  onChange: any;
  error: any;
  touched: any;
  type?: string;
}

const FormInput: FunctionComponent<Props> = ({
 name, label, value, onChange, error, touched, type,
}) => (
  <FormControl error={Boolean(error) && touched}>
    <InputLabel htmlFor={name}>{label || name}</InputLabel>
    <Input
      type={type}
      id={name}
      value={value}
      onChange={onChange}
      aria-describedby={`component-error-${name}`}
    />
    <FormHelperText
      id={`component-error-${name}`}
      className={Boolean(error) && touched ? '' :  styles.helperWithoutError}
    >
      {error}
    </FormHelperText>
  </FormControl>
);

export default FormInput;
