import React, { FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import ProtectedRoute from '../ProtectedRoute';
import LogIn from '../../views/LogIn';
import Registration from '../../views/Registeration';

export interface Props {
  isLoggedIn: boolean;
  isLoading: boolean;
}

const App: FunctionComponent<Props> = ({ isLoggedIn, isLoading }) => (
  <BrowserRouter>
    {!isLoading &&
      (
        <Layout isLoggedIn={isLoggedIn}>
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
      )
    }
  </BrowserRouter>
);

export default App;