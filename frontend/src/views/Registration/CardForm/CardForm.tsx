import React from 'react';
import FormInput from '../../../components/FormInput';
import styles from './styles.module.scss';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Formik } from 'formik';
import { observer, inject } from 'mobx-react';
import UserStore from '../../../store/UserStore';
import * as Yup from 'yup';

export interface Props {
  userStore?: UserStore;
}

@inject('userStore')
@observer
class CardForm extends React.Component<Props> {
  private userStore = (this.props.userStore as UserStore);

  public render() {
    return (
      <Card className={styles.card}>
        <CardContent>
          <Formik
            initialValues={{
              email: '',
              name: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={
              async (registrationData, { setSubmitting }) => {
                await this.userStore.registerAction(registrationData);
                setSubmitting(false);
              }
            }
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email')
                .required('Required'),
              name: Yup.string()
                .required('Required'),
              password: Yup.string()
                .required('Required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
            })}
          >
            {
              ({ values, errors, handleChange, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <FormInput
                    name="name"
                    label="이름"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    touched={touched.name}
                  />
                  <FormInput
                    name="email"
                    label="이메일"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <FormInput
                    name="password"
                    label="비밀번호"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                    touched={touched.password}
                    type="password"
                  />
                  <FormInput
                    name="confirmPassword"
                    label="비밀번호 확인"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    type="password"
                  />
                  <div className={styles.buttonWrapper}>
                    <Button color="primary" variant="contained" type="submit">
                      회원가입
              </Button>
                  </div>
                </form>
              )
            }
          </Formik>
        </CardContent>
      </Card>
    );
  }
}

export default CardForm;
