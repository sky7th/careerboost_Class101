import React, { FunctionComponent } from 'react';
import './App.css';
import Todo from './containers/Todo';

const App: FunctionComponent<Props> = ({ isLoggedIn, isLoading }) => (
  <BrowserRouter>
    {!isLoading &&
      (
        <Layout isLoggedIn={isLoggedIn}>
          <ProtectedRoute
            path="/"
            isAccessible={isLoggedIn}
            redirectToWhenInaccessible="/login"
            component={Dashboard}
            exact
          />
          <ProtectedRoute
            path="/add-post"
            isAccessible={isLoggedIn}
            redirectToWhenInaccessible="/login"
            component={AddPost}
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
      )
    }
  </BrowserRouter>
);

export default App;