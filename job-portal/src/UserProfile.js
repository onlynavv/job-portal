import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./UserProfile.css"

const UserProfile = () => {
    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    const [userProfile, setUserProfile] = useState()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const history = useHistory()

    const getUserInfo = () => {
      fetch('http://localhost:9000/job/user/getUserInfo', {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}})
    .then((data)=> data.json())
    .then((item)=> setUserProfile(item.info))
    }

    useEffect(()=>{
      getUserInfo()
    },[])

    console.log(userProfile)

  return (
    <section className='userProfile-section'>
      <div className='container'>
        <h1>Welcome, {userState.user.username}</h1>
        <p>{userState.user.location}</p>
        <div className='userProfile-wrapper'>
          <h3>Your Profile</h3>
          <div className='userBio'>
            <h3>Personal Details</h3>
            <p>{userProfile?.userBio}</p>
          </div>
          
          {userProfile && (
            <div className='user-workExperience'>
              <h3>Work Experience</h3>
              {userProfile.workExperience.map((item, index)=>{
                const {city, company, endDate, startDate, jobTitle, workDescription} = item
                const startYear = new Date(startDate)
                const endYear = new Date(endDate)
                return(
                  <div key={index}>
                    <h4>{jobTitle}</h4>
                    <p>{company}, {city}</p>
                    <p>{startYear.toLocaleDateString()} to {endYear.toLocaleDateString()}</p>
                    <p>{workDescription}</p>
                  </div>
                )
              })}
            </div>
          )}
          
          {userProfile && (
            <div className='user-education'>
              <h3>Education</h3>
              {userProfile.education.map((item, index)=>{
                const {clg, eduLevel, educationType, fieldStudy} = item
                const startedYear = new Date(item.startDate)
                const endedYear = new Date(item.endDate)
                return(
                  <div key={index}>
                    <h4>{fieldStudy} in {educationType}</h4>
                    <p>{clg.toUpperCase()}</p>
                    <p>{eduLevel}</p>
                    <p>{endedYear.toLocaleDateString()}</p>
                  </div>
                )
              })}
            </div>
          )}

          {userProfile && (
            <div className='user-skills'>
              <h3>Skills</h3>
              {userProfile.skills.map((item, index)=>{
                return(
                  <p key={index}>{item.skill}</p>
                )
              })}
            </div>
          )}

          {userProfile && (
            <div className='user-portfolio'>
              <h3>Online Portfolio</h3>
              <a href={userProfile.portfolio} target={'_blank'} rel="noreferrer">{userProfile.portfolio}</a>
            </div>
          )}

          {userProfile && (
            <div className='user-projects'>
              <h3>Projects</h3>
              {userProfile.project.map((item, index)=>{
                const {projectTitle, projectDesc, projectUrl} = item
                return(
                  <div key={index}>
                    <h4>{projectTitle}</h4>
                    <a href={projectUrl} target={'_blank'} rel="noreferrer">{projectUrl}</a>
                    <p>{projectDesc}</p>
                  </div>
                )
              })}
            </div>
          )}
          <button className='addProfile' onClick={()=>{history.push("/addProfile")}}>Edit Profile</button>
        </div>
      </div>
    </section>
    
  )
}

export default UserProfile