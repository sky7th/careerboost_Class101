import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers, withProps } from 'recompose';
import { logOut } from '../../../api/authorization';
import ProfileMenu, { Props } from './ProfileMenu';

interface OuterProps {
  name: string;
  className?: string;
}

const enhance = compose<Props, OuterProps>(
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
      anchorEl: null,
    },
    {
      handleClick : () => event => ({
        anchorEl: event.target,
      }),
      handleClose : () => () => ({
        anchorEl: null,
      }),
    },
  ),
  withHandlers<RecomposeProps, {}>({
    onLogOut: ({ handleClose }) => () => {
      logOut()
        .then(() => {
          UserStore.logOutAction();
          handleClose();
        });
    },
  }),
);

export default enhance(ProfileMenu);
