import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import AppliedApplicants from './AppliedApplicants';
import { useGlobalContext } from './context';
import "./AppliedApplicantsList.css"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const AppliedApplicantsList = () => {
    const {id} = useParams()

    const [applicantsList, setApplicantsList] = useState([])

    const [tabValue, setTabValue] = useState("1")

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
  }

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

    const appliedApplicants = applicantsList.length > 0 && applicantsList.filter((item)=>{
        return item.applicationStatus === "applied"
    })

    console.log(appliedApplicants)

    const shortlistedApplicants = applicantsList.length > 0 && applicantsList.filter((item)=>{
        return item.applicationStatus === "shortlisted"
    })

    console.log(shortlistedApplicants)

    const selectedApplicants = applicantsList.length > 0 && applicantsList.filter((item)=>{
        return item.applicationStatus === "selected"
    })

  return (
      <section className='appliedApplicants-section'>
          <div className='container'>
                <div className='appliedApplicants-list-wrapper'>
                    <h1>Ongoing Campaign</h1>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tabValue}>
                            <Box>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example" centered>
                                <Tab label="Applied" value="1" />
                                <Tab label="Shortlisted" value="2" />
                                <Tab label="Selected" value="3" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <h3>Applied Candidates</h3>
                                {appliedApplicants?.length > 0 && appliedApplicants.map((item)=>{
                                    return <AppliedApplicants key={item.userId} {...item} getAppliedApplicantsList={getAppliedApplicantsList} />
                                })}
                            </TabPanel>
                            <TabPanel value="2">
                                <h3>Shortlisted Candidates</h3>
                                {shortlistedApplicants?.length > 0 && shortlistedApplicants.map((item)=>{
                                    return <AppliedApplicants key={item.userId} {...item} getAppliedApplicantsList={getAppliedApplicantsList} />
                                })}
                            </TabPanel>
                            <TabPanel value="3">
                                <h3>Selected Candidates</h3>
                                {selectedApplicants?.length > 0 && selectedApplicants.map((item)=>{
                                    return <AppliedApplicants key={item.userId} {...item} getAppliedApplicantsList={getAppliedApplicantsList} />
                                })}
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
          </div>
      </section>
  )
}

export default AppliedApplicantsList