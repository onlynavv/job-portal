import React,{useState} from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import "./CampaignCard.css"

const CampaignCard = ({_id, deadline, jobStatus, jobtitle, jobtype, applicants, postedOn, salary, skillsets, workexperience,getOngoingCampaignList}) => {
    const jobLastDate = new Date(deadline)
    const jobPostedDate = new Date(postedOn)

    const [jobStatusValue, setJobStatusValue] = useState("")

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    const history = useHistory()

    const handleJobStatusChange = async(e) => {
        console.log(e.target.value)
        setJobStatusValue(e.target.value)

        try{
            const resp = await fetch('http://localhost:9000/job/joblisting/setToCompleteCampaign', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token},
            body: JSON.stringify({jobStatusValue:e.target.value, jobId:_id})
                })
            if(resp.ok){
                getOngoingCampaignList()
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

    console.log(jobStatusValue)

  return (
    <div className='campaignCard-wrapper'>
        <div className='campaignCard-left'>
            <p><b>Job Title:</b> {jobtitle}</p>
            <p><b>job Type:</b> {jobtype}</p>
            <p><b>Posted On:</b> {jobPostedDate.toLocaleDateString()}</p>
            <p><b>Deadline Alloted:</b> {jobLastDate.toLocaleDateString()}</p>
            <p><b>No of Applicants Applied:</b> {applicants.length}</p>
            <p><b>Salary Posted:</b> {salary} / month</p>
            <p><b>workexperience:</b> {workexperience}</p>
            <p><b>Job Status:</b> {jobStatus}</p>
        </div>
        <div className='campaignCard-right'>
            <div className='skillsets-div'>
                <p><b>Skillsets:</b></p>
                <ul>
                    {skillsets.map((item, index)=>{
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </div>
            <div className='change-jobStatus'>
                <InputLabel id="demo-simple-select-standard-label" className="userInput">Change the Job Status</InputLabel>
                <Select
                        labelId="demo-simple-select-standard-label"
                        id="jobStatus"
                        name="jobStatus"
                        label="jobStatus"
                        value={jobStatusValue}
                        onChange={handleJobStatusChange}>
                                
                        <MenuItem value="none">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="completed">
                            Completed
                        </MenuItem>   
                </Select>
            </div>
            <button className='viewApplicants-btn' onClick={()=>history.push(`/ongoingCampaign/${_id}`)}>View Applicants</button>
        </div>
    </div>
  )
}

export default CampaignCard