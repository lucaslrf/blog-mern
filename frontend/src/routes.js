import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {GuardedRoute, GuardProvider} from 'react-router-guards';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';
import CreatePost from './pages/CreatePost';
import Login from './components/Login';
import Register from './components/Register/Register';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';
import Profile from './components/Profile';
import Report from './components/Report';
import auth from "./services/auth";

const roleValidation = async (to, from, next) => {
  try {
    const logged = auth.loggedIn();
    if(logged){
      next();
    }else{
      next.redirect('/login');
    }
  } catch (e) {
    next.redirect('/login');
  }
};

const Routes = () => {
  return (
    <Router>
      <GuardProvider>
        <Switch>
          <GuardedRoute path="/register" exact component={Register} />
          <GuardedRoute path="/login" exact component={Login} />
          <GuardedRoute path="/" exact component={Home} />
          <GuardedRoute path="/posts/:id" exact component={ViewPost} />
          <GuardProvider  guards={[roleValidation]}>
            <Switch>
              <GuardedRoute path="/new-post" exact component={CreatePost} />
              <GuardedRoute path="/edit-post/:id" exact component={EditPost} />
              <GuardedRoute path="/my-posts" exact component={MyPosts} />
              <GuardedRoute path="/reports" exact component={Report} />
              <GuardedRoute path="/profile" exact component={Profile} />
            </Switch>
          </GuardProvider>
        </Switch>
      </GuardProvider>
    </Router>
  );
};

export default Routes;
