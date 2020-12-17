import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {GuardedRoute, GuardProvider} from 'react-router-guards';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';
import Login from './components/Login';
import Register from './components/Register/Register';


const Routes = () => {
  return (
    <Router>
      <GuardProvider>
        <GuardedRoute path="/" exact component={Home} />
        <GuardedRoute path="/posts/:id" exact component={ViewPost} />
        <GuardedRoute path="/login" exact component={Login} />
        <GuardedRoute path="/register" exact component={Register} />
      </GuardProvider>
    </Router>
  );
};

export default Routes;
