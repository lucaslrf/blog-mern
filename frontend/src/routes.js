import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {GuardedRoute, GuardProvider} from 'react-router-guards';
import Posts from './components/Posts';

const Routes = () => {
  return (
    <Router>
      <GuardProvider>
        <GuardedRoute path="/" exact component={Posts} />
      </GuardProvider>
    </Router>
  );
};

export default Routes;
