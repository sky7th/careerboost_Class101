import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

export interface Props {
  component: Function;
  isAccessible: boolean;
  redirectToWhenInaccessible: string;
  exact: boolean;
  path: string;
}

// the render function moved from the component to improve performance
const render = (
  isAccessible: boolean,
  Component: Function,
  redirectToWhenInaccessible: string,
) =>
  (props: RouteComponentProps) =>
    (
      isAccessible
        ? <Component {...props} />
        : <Redirect to={{ pathname: redirectToWhenInaccessible }} />
    );

const ProtectedRoute: FunctionComponent<Props> = ({
  component, isAccessible, redirectToWhenInaccessible, exact, path,
}) => (
    <Route
      path={path}
      exact={exact}
      render={render(isAccessible, component, redirectToWhenInaccessible)}
    />
  );

export default ProtectedRoute;
