import React,{useEffect, useState} from 'react'
import { useGlobalContext } from './context'
import "./MyApplications.css"

const MyApplications = () => {

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const [myApplications, setMyApplications] = useState([])

    const getMyApplications = () => {
        fetch('https://job-portal-node-app.herokuapp.com/job/joblisting/getSingleUserApplications', {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}})
    .then((data)=> data.json())
    .then((item)=> setMyApplications(item.appliedJobs))
    }

    useEffect(()=>{
        getMyApplications()
    },[])

    console.log(myApplications)

    const removeApplication = async(applicationId, jobId) => {
        console.log(applicationId, jobId)
        try{
            const resp = await fetch(`https://job-portal-node-app.herokuapp.com/job/joblisting/removeApplication/${applicationId}/${jobId}`, {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}
                })
            if(resp.ok){
                console.log("job deleted")
                getMyApplications()
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

  return (
      <section className='myApplication-section'>
          <div className='container'>
              <h1>My Applications</h1>
                <h3>Welcome {userState.user.username}</h3>
                <div className='applications-wrapper'>
            {myApplications.length > 0 ? (
                        myApplications.map((item)=>{
                        const {applicationId, applicationStatus, jobId, jobTitle, recruiterLocation, recruiterName, resume, salary, skillsets, submittedAt, workexperience} = item
                        const submittedDate = new Date(submittedAt)
                        return(
                            <div key={applicationId} className='jobCard-wrapper'>
                                <div className='jobCard-left'>
                                    <p><b>Application Id:</b> {applicationId}</p>
                                    <p><b>Application Status:</b> {applicationStatus}</p>
                                    <p><b>Job Title:</b> {jobTitle}</p>
                                    <p><b>Location:</b> {recruiterLocation}</p>
                                    <p><b>Company Name:</b> {recruiterName}</p>
                                    <p><b>Salary:</b> {salary} / month</p>
                                    <p><b>Submitted At:</b> {submittedDate.toLocaleDateString()}</p>
                                    <p><b>Experience:</b> {workexperience}</p>
                                </div>

                                <div className="jobCard-right">
                                    <div>
                                        <p><b>Skillsets:</b></p>
                                        <ul>
                                            {skillsets.map((item, index)=>{
                                                return <li key={index}>{item}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <div className='cancelBtn-div'>
                                        <button className='rejectBtn' onClick={()=>removeApplication(applicationId, jobId)}>Reject</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    ) : <h3>You aren't have any applications yet</h3>}
                </div>
          </div>
      </section>
    
  )
}

export default MyApplications