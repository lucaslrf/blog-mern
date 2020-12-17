import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {GuardedRoute, GuardProvider} from 'react-router-guards';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';


const Routes = () => {
  return (
    <Router>
      <GuardProvider>
        <GuardedRoute path="/" exact component={Home} />
        <GuardedRoute path="/posts/:id" exact component={ViewPost} />
      </GuardProvider>
    </Router>
  );
};

export default Routes;
