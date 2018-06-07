import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

export const browserHistory = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPages = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/links');
    } else if (isAuthenticatedPages && !isAuthenticated) {
        browserHistory.replace('/');
    }
}

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" component={Login} exact={true} />    
      <Route path="/signup" component={Signup} />
      <Route path="/links" component={Link}  />
      <Route path="*" component={NotFound} />    
    </Switch>
  </Router>
);