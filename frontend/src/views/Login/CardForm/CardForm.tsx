import React, { FunctionComponent } from 'react';
import FormInput from '../../../components/FormInput';
import styles from './styles.module.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface FormKeys<type> {
  email: type;
  password: type;
}

export interface Props {
  values: FormKeys<string>;
  errors: FormKeys<string>;
  touched: FormKeys<boolean>;
  handleChange: () => Event;
  handleSubmit: () => Event;
}

const CardForm: FunctionComponent<Props> = ({
  values, errors, handleChange, touched, handleSubmit,
}) => (
  <Card className={styles.card}>
    <CardContent>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInput
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
        />
        <FormInput
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          touched={touched.password}
          type="password"
        />
        <div className={styles.buttonWrapper}>
          <Button color="primary" type="submit" variant="contained" >
            Log in
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
);

export default CardForm;
