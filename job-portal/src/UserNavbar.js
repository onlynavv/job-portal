import React,{useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./UserNavbar.css"

const UserNavbar = () => {

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
      <div className='userNavbar-wrapper nav-center'>
        <h3 onClick={()=>{history.push('/')}} className='logo'>Job Portal</h3>
          <div className='userNavbar-container'>
              <Link to="/">Jobfeeds</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/myApplications">My Applications</Link>
              {userState.isUserAuthenticated && <p onClick={userSignout}>logout</p>}
          </div>
      </div>
    </nav>
  )
}

export default UserNavbar