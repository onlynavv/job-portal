import React,{useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./ViewApplicants.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewApplicants = () => {

    const {id} = useParams()

    const [applicant, setApplicant] = useState()

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    const history = useHistory()

    useEffect(()=>{
        fetch(`http://localhost:9000/job/user/getUserInfoById/${id}`, {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}})
    .then((data)=> data.json())
    .then((item)=> setApplicant(item))
    },[id])

    console.log(applicant)

  return (
    <section className='view-application-section'>
        <div className='container'>
            <div className='viewAppl-header'>
                <div>
                    <h1>{applicant?.username}</h1>
                    <p>{applicant?.location}</p>
                </div>
                <div>
                    <button className='back-btn' onClick={()=>{history.goBack()}}><ArrowBackIcon /> Back</button>
                </div>
            </div>
            <div className='view-application-wrapper'>
                <div className='userBio viewAppl-userBio'>
                    <div>
                        <h3>Personal Details</h3>
                        <p>{applicant?.info.userBio}</p>
                    </div>
                    <button className='view-resume'>View Resume</button>
                </div>

                {applicant && (
                    <div className='user-workExperience'>
                    <h3>Work Experience</h3>
                    {applicant.info.workExperience.map((item, index)=>{
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

                {applicant && (
                    <div className='user-education'>
                    <h3>Education</h3>
                    {applicant.info.education.map((item, index)=>{
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

                {applicant && (
                    <div className='user-skills'>
                    <h3>Skills</h3>
                    {applicant.info.skills.map((item, index)=>{
                        return(
                        <p key={index}>{item.skill}</p>
                        )
                    })}
                    </div>
                )}

                {applicant && (
                    <div className='user-portfolio'>
                    <h3>Online Portfolio</h3>
                    <a href={applicant.info.portfolio} target={'_blank'} rel="noreferrer">{applicant.info.portfolio}</a>
                    </div>
                )}

                {applicant && (
                    <div className='user-projects'>
                    <h3>Projects</h3>
                    {applicant.info.project.map((item, index)=>{
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

            </div>
        </div>
    </section>
  )
}

export default ViewApplicants