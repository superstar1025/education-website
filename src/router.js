import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthorizationHandler from 'components/AuthorizationHandler';
import App from 'components/App';
import Login from 'routes/Login';
import Register from 'routes/Register';
import Page404 from 'routes/Page404';
import Dashboard from 'routes/Dashboard';
import Admin from 'routes/Admin';
import Students from 'routes/Students';
import Staff from 'routes/Staff';

const AuthorizedRoutes = props => (
  <AuthorizationHandler {...props}>
    <App {...props} >
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={Admin} />
        <Route path="/students" component={Students} />
        <Route path="/staff" component={Staff} />
        <Redirect exact path="/" to="/dashboard" />
        <Route path="*" component={Page404} />
      </Switch>
    </App>
  </AuthorizationHandler>
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={AuthorizedRoutes} />
    </Switch>
  </BrowserRouter>
);

export default Router;
