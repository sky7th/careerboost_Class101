import { inject, observer } from 'mobx-react';
import { compose, withHandlers, withProps } from 'recompose';
import { logOut } from '../../api/authorization';
import Header, { Props } from './Header';

const enhance = compose<Props, {}>(
  inject('UserStore'),
  withProps(
    ({ UserStore }) => {
      return {
        UserStore: UserStore
      }
    } 
  ),
  withHandlers<RecomposeProps, {}>({
    onLogOut: ({ UserStore }) => () => {
      logOut()
        .then(() => {
          UserStore.logOutAction();
        });
    },
  }),
  observer
);

export default enhance(Header);
