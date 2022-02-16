import React,{useState, useEffect} from 'react'
import { useGlobalContext } from './context'
import {nanoid} from "nanoid"

const JobCard = ({_id, applicants, deadline, jobtitle, jobtype, noofapplicants, positions, postedOn, recruiterEmail, recruiterLocation, recruiterName, salary, skillsets, workexperience}) => {

    const jobLastDate = new Date(deadline)
    const jobPostedDate = new Date(postedOn)

    const {userState, isUserLoggedIn, userDispatch, getJobListing} = useGlobalContext()
    const {user} = userState

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const handleJobApply = async() => {
        console.log({applicationId:nanoid(6), userId: user._id, jobId: _id, jobTitle: jobtitle, resume: user.info.resume, recruiterLocation, recruiterName, salary, skillsets, workexperience})

        try{
            const resp = await fetch('http://localhost:9000/job/joblisting/apply', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":user.token},
            body: JSON.stringify({applicationId:nanoid(6), userId: user._id,applicantName:user.username,applicantEmail:user.email, jobId: _id, jobTitle: jobtitle, resume: user.info.resume, recruiterLocation, recruiterName, salary, skillsets, workexperience})
                })
            if(resp.ok){
                console.log("job applied")
                getJobListing()
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

    console.log(applicants.length, "29")

    const isUserApplied = applicants.find((item)=>{
        if(item.userId === user._id){
            return item
        }
    })

    console.log(user.appliedJobs)
    const isUserGotRejected = user?.appliedJobs.find((item)=>{
        if(item.jobId === _id){
            if(item.applicationStatus === "rejected"){
                return item
            }
        }
    })

    console.log(isUserGotRejected)

  return (
    <div className='jobCard-wrapper'>
        <div className='jobCard-left'>
            <h3>{jobtitle}</h3>
            <p><b>Posted on:</b> {jobPostedDate.toLocaleDateString()}</p>
            <p><b>Company Name:</b> {recruiterName}</p>
            <p><b>by:</b> {recruiterEmail}</p>
            <p><b>location: </b>{recruiterLocation}</p>
            <p><b>No of positions opened:</b> {positions}</p>
            <p><b>Salary:</b> {salary} / month</p>
            <p><b>Work Experience:</b> {workexperience}</p>
            <p><b>Job Type:</b> {jobtype}</p>
            <p><b>last day to apply:</b> {jobLastDate.toLocaleDateString()}</p>
        </div>

        <div className="jobCard-right">
            <div className='skillsets-div'>
                <p><b>Skillsets:</b></p>
                <ul>
                    {skillsets.map((item, index)=>{
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </div>
            <div className='applyBtn-div'>
                {((applicants.length === noofapplicants || isUserGotRejected) && <button className='applyFullBtn' disabled>Full</button> )|| 
                    (isUserApplied && <button className='jobApplied' disabled>Applied</button> )|| <button className='applyBtn' onClick={handleJobApply}>Apply</button>
                    }
            </div>
        </div>
    </div>
  )
}

export default JobCard