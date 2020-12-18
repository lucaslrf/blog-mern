import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {GuardedRoute, GuardProvider} from 'react-router-guards';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';
import CreatePost from './pages/CreatePost';
import Login from './components/Login';
import Register from './components/Register/Register';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';
import Profile from './components/Profile';


const Routes = () => {
  return (
    <Router>
      <GuardProvider>
        <GuardedRoute path="/" exact component={Home} />
        <GuardedRoute path="/new-post" exact component={CreatePost} />
        <GuardedRoute path="/edit-post/:id" exact component={EditPost} />
        <GuardedRoute path="/posts/:id" exact component={ViewPost} />
        <GuardedRoute path="/my-posts" exact component={MyPosts} />
        <GuardedRoute path="/login" exact component={Login} />
        <GuardedRoute path="/profile" exact component={Profile} />
        <GuardedRoute path="/register" exact component={Register} />
      </GuardProvider>
    </Router>
  );
};

export default Routes;
