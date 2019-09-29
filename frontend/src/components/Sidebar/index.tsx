import { withRouter } from 'react-router';
import { compose } from 'recompose';

import Sidebar, { Props } from './Sidebar';

const enhance = compose<Props, {}>(
  withRouter,
);

export default enhance(Sidebar);
