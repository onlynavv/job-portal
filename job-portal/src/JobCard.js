import React,{useState, useEffect} from 'react'
import { useGlobalContext } from './context'
import {nanoid} from "nanoid"
import { useHistory } from 'react-router-dom'

const JobCard = ({_id, applicants, deadline, jobtitle, jobtype, noofapplicants, positions, postedOn, recruiterEmail, recruiterLocation, recruiterName, salary, skillsets, workexperience, requirementList, jobdesc}) => {

    const jobLastDate = new Date(deadline)
    const jobPostedDate = new Date(postedOn)

    const {userState, isUserLoggedIn, userDispatch, getJobListing} = useGlobalContext()
    const {user} = userState

    const history = useHistory()
    
    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  console.log(user)

    const handleJobApply = async() => {
        console.log({applicationId:nanoid(6), userId: user._id, jobId: _id, jobTitle: jobtitle, resume: user.info.resume, recruiterLocation, recruiterName, salary, skillsets, workexperience})

        try{
            const resp = await fetch('http://localhost:9000/job/joblisting/apply', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":user.token},
            body: JSON.stringify({applicationId:nanoid(6), userId: user._id,applicantName:user.username,applicantEmail:user.email, jobId: _id, jobTitle: jobtitle, resume: user.info.resume, recruiterLocation, recruiterName, salary, skillsets, workexperience, jobdesc})
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
    const isUserGotRejected = user.appliedJobs && user.appliedJobs.find((item)=>{
        if(item.jobId === _id){
            if(item.applicationStatus === "rejected"){
                return item
            }
        }
    })

    console.log(isUserGotRejected)

    const descTruncate = (string, n) => {
        return string?.length > n ? string.substr(0,n-1) + '...' : string
    }

  return (
    <div className='jobCard-wrapper'>
        <div className='jobCard-left'>
            <div className='jobRecruiter-info'>
                <h3>{jobtitle}</h3>
                <p>{recruiterName} . {recruiterEmail}</p>
                <p>{recruiterLocation}</p>
            </div>
            <p><b className='job-salary'>₹ {salary} / month</b></p>
            <ul className='jobInfo-list'>
                <li>{jobtype}</li>
                <li>work experience of {workexperience}</li>
            </ul>
            <ul className='jobInfo-list'>
                {descTruncate(jobdesc, 100)} <span className='view-more' onClick={()=>{history.push(`/singleJob/${_id}`)}}>view more..</span>
            </ul>
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