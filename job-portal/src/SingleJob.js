import React,{useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./SingleJob.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SingleJob = () => {
    const {id} = useParams()

    const [jobInfo, setJobInfo] = useState()

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    const history = useHistory()

    useEffect(()=>{
        fetch(`http://localhost:9000/job/joblisting/getJobDetailById/${id}`)
    .then((data)=> data.json())
    .then((item)=> setJobInfo(item))
    },[id])

    console.log(jobInfo)

    const lastdate = jobInfo  && new Date(jobInfo.deadline)

    const isUserApplied = jobInfo && jobInfo.applicants.find((item)=>{
        if(item.userId === userState.user._id){
            return item
        }
    })

    const isUserGotRejected = userState.user.appliedJobs && userState.user.appliedJobs.find((item)=>{
        if(item.jobId === id){
            if(item.applicationStatus === "rejected"){
                return item
            }
        }
    })

  return (
    <section className='singleJob-section'>
        <div className='container'>
            <div className='job-header'>
                <h1>Job Detail</h1>
                <button className='back-btn' onClick={()=>{history.goBack()}}><ArrowBackIcon /> Back</button>
            </div>
            {jobInfo ? (
                <div className='singleJob-wrapper'>
                    <div className='singleJob-headInfo'>
                        <div className='headInfo-left'>
                            <h3>{jobInfo.jobtitle}</h3>
                            <p>{jobInfo.recruiterName} . {jobInfo.recruiterEmail}</p>
                            <p>{jobInfo.recruiterLocation}</p>
                            <p>{jobInfo.jobtype}</p>
                            <p><b className='job-salary'>₹ {jobInfo.salary} / month</b></p>
                        </div>
                        <div className='headInfo-right'>
                            <div className='applyBtn-div'>
                                {((jobInfo.applicants.length === jobInfo.noofapplicants || isUserGotRejected) && <button className='applyFullBtn' disabled>Full</button> )|| 
                                    (isUserApplied && <button className='jobApplied' disabled>Applied</button> )|| <button className='applyBtn'>Apply</button>
                                    }
                            </div>
                        </div>
                    </div>
                    <div className='singleJob-bottomInfo'>
                        <div className='job-description'>
                            <h3>Job Description</h3>
                            <p>{jobInfo.jobdesc}</p>
                        </div>
                        <div className='job-requirements'>
                            <h3>Requirements</h3>
                            <ul className='singleJobInfo-list'>
                                {jobInfo.requirementList.map((item, index)=>{
                                    return <li key={index}>{item.requirement}</li>
                                })}
                            </ul>
                        </div>
                        <div className='job-responsibility-list'>
                            <h3>Responsibilities</h3>
                            <ul className='singleJobInfo-list'>
                                {jobInfo.responsibilityList.map((item, index)=>{
                                    return <li key={index}>{item.responsibility}</li>
                                })}
                            </ul>
                        </div>
                        <div className='job-skillsets'>
                            <h3>Skillsets Required</h3>
                            <ul className='singleJobInfo-list'>
                                {jobInfo.skillsets.map((item, index)=>{
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>
                        </div>
                        <div className='job-benefits'>
                            <h3>Benefits</h3>
                            <ul className='singleJobInfo-list'>
                                {jobInfo.benefitList.map((item, index)=>{
                                    return <li key={index}>{item.benefit}</li>
                                })}
                            </ul>
                        </div>
                        <div className='job-experience'>
                            <h3>Work Experience</h3>
                            <p>{jobInfo.workexperience} (preferred)</p>
                        </div>
                        <div className='job-applications'>
                            <h3>No of Positions opened</h3>
                            <p>{jobInfo.noofapplicants}</p>
                        </div>
                        <div className='job-lastDate'>
                            <h3>Last date to Apply</h3>
                            <p>{lastdate.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            ) : <p>loading....</p>}
        </div>
    </section>
  )
}

export default SingleJob