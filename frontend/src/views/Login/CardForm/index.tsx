import { withFormik } from 'formik';
import { inject, observer } from 'mobx-react;
import { compose, withHandlers } from 'recompose';
import * as Yup from 'yup';
import { logIn } from '../../../api/authorization';
import LoginData from '../../../interfaces/user/LoginData';
import UserData from '../../../interfaces/user/UserData';
import { logInAction } from '../../../store/actions/user';
import CardForm, { Props } from './CardForm';

interface RecomposeProps extends Props {
  logInDispatcher: (userData: UserData) => void;
}

const enhance = compose<Props, {}>(
  inject('UserStore'),
  withHandlers<RecomposeProps, {}>({
    logInDispatcher: () => (userData: UserData) => {
      logInAction(userData);
    },
  }),
  withFormik<RecomposeProps, LoginData>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),
    handleSubmit: (loginData, { setSubmitting, props: { logInDispatcher } }) => {
      logIn(loginData)
        .then((userData: UserData) => {
          logInDispatcher(userData);
        });
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
  }),
  observer
);

export default enhance(CardForm);
