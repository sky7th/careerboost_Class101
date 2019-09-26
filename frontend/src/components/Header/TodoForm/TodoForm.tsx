import React, { FunctionComponent } from 'react';
import FormInput from '../../../components/FormInput';
import styles from '../../../styles/common/form-card.module.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface FormKeys<type> {
  content: type;
  title: type;
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
    <div className={styles.formCard}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formInputTitle}>
          <FormInput
            name="title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            touched={touched.title}
          />
        </div>
        <div className={styles.formInputContent}>
          <FormInput
            name="content"
            value={values.content}
            onChange={handleChange}
            error={errors.content}
            touched={touched.content}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button color="primary" type="submit" variant="contained" >
            Add
          </Button>
        </div>
      </form>
    </div>
  );

export default CardForm;
