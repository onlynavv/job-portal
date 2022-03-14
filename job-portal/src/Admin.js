import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddJobListing from './AddJobListing';
import AppliedApplicantsList from './AppliedApplicantsList';
import CompletedCampaign from './CompletedCampaign';
import EditRecruiterBio from './EditRecruiterBio';
import OngoingCampaign from './OngoingCampaign';
import RecruiterNavbar from './RecruiterNavbar';
import ViewApplicants from './ViewApplicants';

const Admin = () => {
  return (
  <div className='admin-wrapper'>
      <Router>
          <RecruiterNavbar />
          <Switch>
              <Route exact path="/">
                  <EditRecruiterBio />
              </Route>
              <Route path="/addJobListing">
                  <AddJobListing />
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
              <Route path="/applicants/:id">
                  <ViewApplicants />
              </Route>
          </Switch>
      </Router>
  </div>
)
};

export default Admin;
