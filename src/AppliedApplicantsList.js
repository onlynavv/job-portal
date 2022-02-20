import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import AppliedApplicants from './AppliedApplicants';
import { useGlobalContext } from './context';
import "./AppliedApplicantsList.css"

const AppliedApplicantsList = () => {
    const {id} = useParams()

    const [applicantsList, setApplicantsList] = useState([])

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const getAppliedApplicantsList = () => {
        fetch(`http://localhost:9000/job/joblisting/getApplicantsByJobId/${id}`,{
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}})
    .then((data)=> data.json())
    .then((item)=> setApplicantsList(item.applicants))
    }

    useEffect(()=>{
        getAppliedApplicantsList()
    },[])

    console.log(applicantsList)

  return (
      <section className='appliedApplicants-section'>
          <div className='container'>
                <div className='appliedApplicants-list-wrapper'>
                    <h1>Ongoing Campaign</h1>
                    <h3>Applied Candidates</h3>
                    {applicantsList.length > 0 && applicantsList.map((item)=>{
                        return <AppliedApplicants key={item.userId} {...item} getAppliedApplicantsList={getAppliedApplicantsList} />
                    })}
                </div>
          </div>
      </section>
  )
}

export default AppliedApplicantsList