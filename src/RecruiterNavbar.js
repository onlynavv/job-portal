import React,{useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom'
import "./RecruiterNavbar.css"
import { useGlobalContext } from './context'

const RecruiterNavbar = () => {

  const history = useHistory()

  const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  const userSignout = () => {
        localStorage.clear()
        userDispatch({type:"LOGOUT_USER"})
        history.push("/")
    }

  return (
      <nav className='navbar'>
        <div className='recruiter-navbar nav-center'>
            <h3 onClick={()=>{history.push('/')}} className='logo'>Admin Dashboard</h3>
            <div className='recruiter-navbar-container'>
                <Link to="/">Dashboard</Link>
                <Link to="/addJobListing">Add Job Listing</Link>
                <Link to="/editRecruiterBio">Edit Bio</Link>
                <Link to="/ongoingCampaign">Ongoing Campaign</Link>
                <Link to="/completedCampaign">Completed Campaign</Link>
                {userState.isUserAuthenticated && <p onClick={userSignout}>logout</p>}
            </div>
        </div>
      </nav>
)
};

export default RecruiterNavbar;
