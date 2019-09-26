import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { logOut } from '../../../api/authorization';
import { logOutAction } from '../../../store/actions/user';
import ProfileMenu, { Props } from './ProfileMenu';

interface OuterProps {
  name: string;
  className?: string;
}

const enhance = compose<Props, OuterProps>(
  inject('UserStore'),
  withProps(
    ({ TodoStore }) => {
      return {
        TodoStore: TodoStore
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
          TodoStore.logOutAction();
          handleClose();
        });
    },
  }),
);

export default enhance(ProfileMenu);
