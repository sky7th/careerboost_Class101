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

interface Props {
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
              password: '',
            }}
            onSubmit={
              async (loginData, { setSubmitting }) => {
                await this.userStore.logInAction(loginData);
                setSubmitting(false);
              }
            }
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email')
                .required('Required'),
              password: Yup.string()
                .required('Required'),
            })}
          >
          {({ values, errors, handleChange, touched, handleSubmit }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
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
                <div className={styles.buttonWrapper}>
                  <Button color="primary" type="submit" variant="contained" >
                    로그인
              </Button>
                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    );
  }
}

export default CardForm;
