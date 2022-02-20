import React,{useState, useEffect} from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGlobalContext } from './context';
import InputLabel from '@mui/material/InputLabel';
import { useHistory } from 'react-router-dom';
import "./AppliedApplicants.css"

const AppliedApplicants = ({applicationId, applicationStatus, jobId, jobTitle, userId, submittedAt, resume, applicantName, applicantEmail, getAppliedApplicantsList}) => {

  const submittedDate = new Date(submittedAt)

  const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

  const history = useHistory()

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  const [candidateStatus, setCandidateStatus] = useState("")

  const handleCandidateStatusChange = async(e) => {
    console.log(e.target.value)
    setCandidateStatus(e.target.value)
    if(e.target.value === "shortlisted" || "selected"){
      try{
            const resp = await fetch('http://localhost:9000/job/joblisting/updateCandidateStatus', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token},
            body: JSON.stringify({candidateId:userId, jobId:jobId, jobTitle:jobTitle, applicationId:applicationId, applicantEmail:applicantEmail, submittedAt:submittedAt, applicationStatus:e.target.value})
                })
            if(resp.ok){
                getAppliedApplicantsList()
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

    if(e.target.value === "rejected"){
      try{
            const resp = await fetch('http://localhost:9000/job/joblisting/removeCandidateFromApplicants', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token},
            body: JSON.stringify({candidateId:userId, jobId:jobId, applicationId:applicationId, applicantEmail:applicantEmail, applicationStatus:e.target.value})
                })
            if(resp.ok){
                getAppliedApplicantsList()
            }
        }catch(error){
            console.warn(error.toString())
        }
    }
  }

  console.log(candidateStatus)

  return (
    <div className='appliedApplicant-wrapper'>
        <div>
            <p><b>Application Id:</b> {applicationId}</p>
            <p><b>Applicant Name:</b> {applicantName}</p>
            <p><b>Applicant Email:</b> {applicantEmail}</p>
            <p><b>Applicant Id:</b> {userId}</p>
            <button className='view-profile' onClick={()=>{history.push(`/applicants/${userId}`)}}>View Profile</button>
        </div>
        <div>
            <p><b>Submitted at:</b> {submittedDate.toLocaleDateString()}</p>
            <p><b>Job Id:</b> {jobId}</p>
            <p><b>Applied For:</b> {jobTitle}</p>
            <div className='change-Appstatus'>
                <InputLabel id="demo-simple-select-standard-label" className="userInput">Change the Candidate's Application Status</InputLabel>
                    <Select
                            labelId="demo-simple-select-standard-label"
                            id="jobStatus"
                            name="jobStatus"
                            label="jobStatus"
                            value={candidateStatus}
                            defaultValue={applicationStatus}
                            onChange={handleCandidateStatusChange}>
                            <MenuItem value="applied" disabled>
                                <em>{applicationStatus}</em>
                            </MenuItem>
                            <MenuItem value="shortlisted">
                                Shortlisted
                            </MenuItem>
                            <MenuItem value="selected">
                                Selected
                            </MenuItem>
                            <MenuItem value="rejected">
                                Rejected
                            </MenuItem>   
                    </Select>
            </div>
        </div>
    </div>
  )
}

export default AppliedApplicants