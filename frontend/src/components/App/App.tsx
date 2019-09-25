import React, { FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../Layout';

export interface Props {
  isLoggedIn: boolean;
  isLoading: boolean;
}

const App: FunctionComponent<Props> = ({ isLoggedIn, isLoading }) => (
  <BrowserRouter>
    {!isLoading &&
      (
        <Layout isLoggedIn={isLoggedIn}>
        </Layout>
      )
    }
  </BrowserRouter>
);

export default App;