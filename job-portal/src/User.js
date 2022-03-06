import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProfile from './AddProfile';
import JobFeed from './JobFeed';
import MyApplications from './MyApplications';
import UserNavbar from './UserNavbar';
import UserProfile from './UserProfile';

const User = () => {
  return (
  <div className='user-wrapper'>
      <Router>
          <UserNavbar />
          <Switch>
              <Route exact path="/">
                <JobFeed />
              </Route>
              <Route path="/profile">
                <UserProfile />
              </Route>
              <Route path="/addProfile">
                <AddProfile />
              </Route>
              <Route path="/myApplications">
                <MyApplications />
              </Route>
          </Switch>
      </Router>
  </div>
)
};

export default User;
