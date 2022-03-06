import React,{useEffect} from 'react';
import { useGlobalContext } from './context';
import JobCard from './JobCard';
import "./JobFeed.css"

const JobFeed = () => {

  const {userState, isUserLoggedIn, userDispatch, getJobListing, jobfeed} = useGlobalContext()

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])


  useEffect(()=>{
    getJobListing()
  },[])

  console.log(jobfeed)

  return (
    <section className='jobfeed-section'>
      <div className='container'>
        <h1>Let's Find Your Dream Job</h1>
        <div className='jobfeed-wrapper'>
            {jobfeed.map((item)=>{
              return <JobCard key={item._id} {...item} />
            })}
        </div>
      </div>
    </section>
  )
};

export default JobFeed;
