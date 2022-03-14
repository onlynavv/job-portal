import React,{useState, useEffect} from 'react';
import { useGlobalContext } from './context';
import JobCard from './JobCard';
import "./JobFeed.css"
import SearchIcon from '@mui/icons-material/Search';

const JobFeed = () => {

  const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

  const [jobfeed, setJobfeed] = useState([])

  const [searchValue, setSearchValue] = useState("")

  const getJobListing = () => {
        fetch('https://job-portal-node-app.herokuapp.com/job/joblisting/getUserJobListing', {
            method:'GET',
            headers: { "Content-Type": "application/json"}})
    .then((data)=> data.json())
    .then((item)=> setJobfeed(item))
    }

  const getJobListingBySearch = async() => {
      fetch(`https://job-portal-node-app.herokuapp.com/job/joblisting/searchJobsByTitle?search=${searchValue}`, {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}})
    .then((data)=> data.json())
    .then((item)=> setJobfeed(item))
  }

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])


  useEffect(()=>{
    getJobListing()
  },[])

  useEffect(()=>{
    getJobListingBySearch()
  },[searchValue])

  console.log(jobfeed)

  console.log(searchValue)

  return (
    <section className='jobfeed-section'>
      <div className='container'>
        <h1>Let's Find Your Dream Job</h1>
        <div className='jobfeed-filterHeader'>
          <div className='jobfeed-search'>
            <SearchIcon />
            <input type='text' onChange={(e)=>{setSearchValue(e.target.value)}} placeholder='Search job title'></input>
          </div>
        </div>
        <div className='jobfeed-wrapper'>
            {jobfeed.map((item)=>{
              return <JobCard key={item._id} {...item} getJobListing={getJobListing} />
            })}
        </div>
      </div>
    </section>
  )
};

export default JobFeed;
