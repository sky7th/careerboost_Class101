import { inject, observer } from 'mobx-react';
import { compose, lifecycle, withHandlers, withStateHandlers } from 'recompose';
import { auth } from '../../api/authorization';
import UserData from '../../interfaces/user/UserData';
import App, { Props } from './App';

interface RecomposeProps extends Props {
  logIn: (userData: UserData) => void;
  toggleIsLoading: () => void;
}

const enhance = compose<Props, {}>(
  inject('UserStore'),
  withProps(
    ({ UserStore }) => {
      return {
        UserStore: UserStore
      }
    } 
  ),
  withStateHandlers(
    {
      isLoading: true,
    },
    {
      toggleIsLoading: ({ isLoading }) => () => ({
        isLoading: !isLoading,
      }),
    },
  ),
  withHandlers<RecomposeProps, {}>({
    logIn: ({ UserStore }) => (userData: UserData) => {
      UserStore.logInAction(userData);
    },
  }),
  lifecycle<RecomposeProps, {}>({
    componentDidMount() {
      const { logIn, toggleIsLoading } = this.props;
      auth()
        .then((userData: UserData) => {
          logIn(userData);
        })
        .finally(() => {
          toggleIsLoading();
        });
    },
  }),
  observer
);

export default enhance(App);