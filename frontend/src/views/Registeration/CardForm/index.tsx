import { withFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { compose, withHandlers, withProps } from 'recompose';
import * as Yup from 'yup';
import { register } from '../../../api/authorization';
import RegistrationData from '../../../interfaces/user/RegistrationData';
import UserData from '../../../interfaces/user/UserData';
import CardForm, { Props } from './CardForm';

interface RecomposeProps extends Props {
  logIn: (userData: UserData) => void;
}

const enhance = compose<Props, {}>(
  inject('UserStore'),
  withProps(
    ({ UserStore }) => {
      return {
        UserStore: UserStore
      };
    }
  ),
  withHandlers<RecomposeProps, {}>({
    logIn: ({ UserStore }) => (userData: UserData) => {
      UserStore.logInAction(userData);
    },
  }),
  withFormik<RecomposeProps, RegistrationData>({
    mapPropsToValues: () => ({
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    }),
    handleSubmit: (registrationData, { setSubmitting, props: { logIn } }) => {
      register(registrationData)
        .then((userData: UserData) => {
          logIn(userData);
        });
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
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
    }),
  }),
  observer
);

export default enhance(CardForm);
