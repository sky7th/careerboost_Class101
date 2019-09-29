import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';
import LogIn from '../../views/LogIn';
import Registration from '../../views/Registration';
import Layout from '../Layout';
import ProtectedRoute from '../ProtectedRoute';
import { observer, inject } from 'mobx-react';
import  UserStore from '../../store/UserStore';

interface AppProps {
  userStore?: UserStore;
}

@inject('userStore')
@observer
class App extends React.Component<AppProps, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    const isLoggedIn = (this.props.userStore as UserStore).isLoggedIn;
    return (<BrowserRouter>
      {
        <Layout isLoggedIn={isLoggedIn}>
          <ProtectedRoute
            path="/"
            isAccessible={isLoggedIn}
            redirectToWhenInaccessible="/login"
            component={Dashboard}
            exact
          />
          <ProtectedRoute
            path="/registration"
            isAccessible={!isLoggedIn}
            redirectToWhenInaccessible="/"
            component={Registration}
            exact
          />
          <ProtectedRoute
            path="/login"
            isAccessible={!isLoggedIn}
            redirectToWhenInaccessible="/"
            component={LogIn}
            exact
          />
        </Layout>

      }
    </BrowserRouter>
    );
  }
}

export default App;
