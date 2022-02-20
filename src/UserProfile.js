import React,{useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./UserProfile.css"

const UserProfile = () => {
    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const history = useHistory()
  return (
    <section className='userProfile-section'>
      <div className='container'>
        <h1>Welcome, {userState.user.username}</h1>
        <div className='userProfile-wrapper'>
          <p>Your Profile</p>
          <button className='addProfile' onClick={()=>{history.push("/addProfile")}}>Add Profile</button>
        </div>
      </div>
    </section>
    
  )
}

export default UserProfile