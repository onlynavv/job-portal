import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddJobListing from './AddJobListing';
import AppliedApplicantsList from './AppliedApplicantsList';
import CompletedCampaign from './CompletedCampaign';
import EditRecruiterBio from './EditRecruiterBio';
import OngoingCampaign from './OngoingCampaign';
import RecruiterDashboard from './RecruiterDashboard';
import RecruiterNavbar from './RecruiterNavbar';

const Admin = () => {
  return (
  <div className='admin-wrapper'>
      <Router>
          <RecruiterNavbar />
          <Switch>
              <Route exact path="/">
                <RecruiterDashboard />
              </Route>
              <Route path="/addJobListing">
                  <AddJobListing />
              </Route>
              <Route path="/editRecruiterBio">
                  <EditRecruiterBio />
              </Route>
              <Route path="/ongoingCampaign/:id">
                  <AppliedApplicantsList />
              </Route>
              <Route path="/ongoingCampaign">
                  <OngoingCampaign />
              </Route>
              <Route path="/completedCampaign">
                  <CompletedCampaign />
              </Route>
          </Switch>
      </Router>
  </div>
)
};

export default Admin;
